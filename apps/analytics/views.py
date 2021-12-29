from .models import Analytics
from rest_framework.decorators import api_view
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from .serializers import AnalyticsSerializer

import pandas as pd
import numpy as np

@api_view(['GET', 'POST'])
def analytics(request):
    if request.method == 'POST':
      file_serializer = AnalyticsSerializer(data=request.data)
      if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        analytics = Analytics.objects.all()
        serializer = AnalyticsSerializer(analytics, many=True)
        return Response(serializer.data)

@api_view(['DELETE', 'PUT', 'GET'])
def analytics_detail(request, pk):
  try:
    analytics = Analytics.objects.get(pk=pk)
  except Analytics.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'PUT':
    master_path = settings.SERVER_URL+ settings.MEDIA_URL + str(analytics.master.file)
    testing_path = settings.SERVER_URL+ settings.MEDIA_URL + str(analytics.testing.file)
    if request.data['format'] == 1:
      topdata = analyzepagetopdata(master_path, testing_path)
    elif request.data['format'] == 2:
      topdata = analyzepagedata(master_path, testing_path)
    return Response(topdata, status=status.HTTP_200_OK)


def calculatetotal(masterdf, codenumber):
    codedata=masterdf.iloc[:,codenumber+2]
    featuredata=masterdf.iloc[:,1]
    i=0
    count=0
    while i<masterdf.shape[0]:
        if featuredata[i] is not np.nan:
            if codedata[i] is not np.nan:
                count+=1
                i+=1
            else:
                i+=1
                while i<masterdf.shape[0] and featuredata[i] is np.nan:
                    if codedata[i] is not np.nan:
                        count+=1
                        i+=1
                        break
                    i+=1        
        else:
            i+=1
    return count*100
def calculatemathcing(masterdf,testdf,masternumber,testnumber):
    masterdata=masterdf.iloc[:,masternumber+2]
    testdata=testdf.iloc[:,testnumber+2]
    featuredata=testdf.iloc[:,1]
    count=0.0
    i=1
    while i<testdf.shape[0]:
        if testdata[i] is not np.nan and masterdata[i-1] is not np.nan:
            templist=str(masterdata[i-1]).split(', ', 1)
            if str(testdata[i]).rstrip() == templist[0]:
                tcount=int(templist[1])
                tnum=1
                i+=1
                while i<testdf.shape[0] and featuredata[i] is np.nan:
                    if testdata[i] is not np.nan and masterdata[i-1] is not np.nan:
                        templist=str(masterdata[i-1]).split(', ', 1)
                        if testdata[i].rstrip() == templist[0]:
                            tcount+=int(templist[1])
                            tnum+=1
                    i+=1
                count+=float(tcount/tnum)
            else:
                i+=1
        else: i+=1
    return count

def analyze(masterdf, testdf):
    result=[]
    for i in range(1, testdf.shape[1]-2, 1):
        templist={}
        for j in range(1, masterdf.shape[1]-2, 1):
            temp=float(calculatemathcing(masterdf,testdf,j,i)/calculatetotal(masterdf,j))*100
            if(temp>=100.0):
                temp=99.9
            templist.append(str(temp)[0:4]+'%')
        result.append(templist)
    return result

def analyzepagedata(masterpath, testpath):
    masterdata = pd.read_excel(masterpath)
    masterdf=pd.DataFrame(masterdata)
    testdata = pd.read_excel(testpath)
    testdf=pd.DataFrame(testdata)
    newcolumns=[]
    list_dictionary=[]
    newindex=[]
    newcolumns.append('Sl No')
    for i in range(0, testdf.shape[1]-3,1):
        newindex.append(testdf.columns[3:][i])
    for i in range(0, masterdf.shape[1]-3,1):
        newcolumns.append(masterdf.columns[3:][i])
    for i in range(1, testdf.shape[1]-2, 1):
        templist=[]
        templist.append(newindex[i-1])
        for j in range(1, masterdf.shape[1]-2, 1):
            temp=float(calculatemathcing(masterdf,testdf,j,i)/calculatetotal(masterdf,j))*100
            if(temp>=100.0):
                temp=99.9
            templist.append(str(temp)[0:4]+'%')
        templist_dictionary=dict(zip(newcolumns, templist))
        list_dictionary.append(templist_dictionary)
    return list_dictionary
# analyze(masterdf, testdf)
# analyzepagedata(masterpath, testpath)
def getanalyzedata(masterpath, testpath):
    masterdata = pd.read_excel(masterpath)
    masterdf=pd.DataFrame(masterdata)
    testdata = pd.read_excel(testpath)
    testdf=pd.DataFrame(testdata)
    newindex=[]
    newcolumns=[]
    for i in range(0, testdf.shape[1]-3,1):
        newindex.append(testdf.columns[3:][i])
    for i in range(0, masterdf.shape[1]-3,1):
        newcolumns.append(masterdf.columns[3:][i])
    analyzedata=analyze(masterdf, testdf)
    excelanalyzedata=pd.DataFrame(analyzedata, columns=newcolumns, index=newindex)
    excelanalyzedata.to_excel(r'E:\PythonDjango\NewOutput2.xlsx', sheet_name='Sheet1')

#getanalyzedata(masterpath, testpath)                         // this is the second result output

def analyzetop(masterdf, testdf):
    topresult=[]
    toprank=[]
    result=[]
    finalresult=[]
    for i in range(1, testdf.shape[1]-2, 1):
        templist=[]
        toptemplist=[]
        tempranklist=[]
        topranklist=[]
        finaltemplist=[]
        for j in range(1, masterdf.shape[1]-2,1):
            temp=float(calculatemathcing(masterdf,testdf,j,i)/calculatetotal(masterdf,j))*100
            if(temp>=100.0):
                temp=99.9
            templist.append(temp)
            tempranklist.append(j)
        result.append(templist)
        for j in range(0, masterdf.shape[1]-4,1):
            for k in range(j+1,masterdf.shape[1]-3,1):
                if templist[j]<templist[k]:
                    temp=templist[j]
                    templist[j]=templist[k]
                    templist[k]=temp
                    temp=tempranklist[j]
                    tempranklist[j]=tempranklist[k]
                    tempranklist[k]=temp
        for j in range(0,5):
            toptemplist.append(templist[j])
            topranklist.append(tempranklist[j])
            finaltemplist.append('Code '+str(tempranklist[j]))
            finaltemplist.append(str(templist[j])[0:4]+'%')
        finaltemplist.extend(testdf.iloc[:,i+2][1:])
        topresult.append(toptemplist)
        toprank.append(topranklist)
        finalresult.append(finaltemplist)
    return finalresult

def analyzepagetopdata(masterpath, testpath):
    masterdata = pd.read_excel(masterpath)
    masterdf=pd.DataFrame(masterdata)
    testdata = pd.read_excel(testpath)
    testdf=pd.DataFrame(testdata)
    list_dictionary=[]
    newcolumns=[]
    for i in range(0, testdf.shape[1],1):
        newcolumns.append(testdf.columns[i])
    analyzetopdata=analyzetop(masterdf, testdf)
    newfirst=['','','','','','','','','','']
    newthird=['','','','','','','','','','']
    newsecond=['Code match-1', 'Code match-1%', 'Code match-2', 'Code match-2%', 'Code match-3', 'Code match-3%', 'Code match-4', 'Code match-4%', 'Code match-5', 'Code match-5%']
    newfirst.extend(testdf.iloc[:,0][1:])
    newsecond.extend(testdf.iloc[:,1][1:])
    newthird.extend(testdf.iloc[:,2][1:])
    newtopdata=[newfirst, newsecond, newthird]
    newtopdata.extend(analyzetopdata)
    for i in range(0, testdf.shape[0]+9,1):
        templist=[]
        for j in range(0, testdf.shape[1], 1):
            if(newtopdata[j][i] is not np.nan):
                templist.append(newtopdata[j][i])
            else:
                templist.append('')
        templist_dictionary=dict(zip(newcolumns, templist))
        list_dictionary.append(templist_dictionary)
    return list_dictionary      
