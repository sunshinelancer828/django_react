from rest_framework import serializers

from apps.analytics.models import Analytics
from .models import Testing
from apps.master.models import Master
import pandas as pd
import numpy as np

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testing
        fields = ['id', 'file', 'timestamp', 'status']

    def create(self, validated_data):
        test = Testing.objects.create(**validated_data)
        master = Master.objects.get(active=True)
        check = self.valid('http://localhost:8000/media/' + str(master.file), 'http://localhost:8000/media/' + str(test.file))
        if check == 'Valid':       
            test.status = True
            test.save()
        analytics = Analytics.objects.create(testing=test, master=master)
        analytics.save()
        return test

    def valid(self, masterpath, testpath):
        print(testpath)
        masterdata = pd.read_excel(masterpath)
        masterdf=pd.DataFrame(masterdata)
        testdata = pd.read_excel(testpath)
        testdf=pd.DataFrame(testdata)
        mfeature=masterdf.iloc[:,1]
        tfeature=testdf.iloc[:,1]
        msubfeature=masterdf.iloc[:,2]
        tsubfeature=testdf.iloc[:,2]
        if masterdf.shape[0]==testdf.shape[0]-1:
            for i in range(0, masterdf.shape[0], 1):
                if mfeature[i] is np.nan:
                    if tfeature[i+1] is np.nan:
                        continue
                    else:
                        break
                else:
                    if tfeature[i+1] is np.nan:
                        break
                    else:
                        if str(mfeature[i]).rstrip()!=str(tfeature[i+1]).rstrip():
                            break
            if i==masterdf.shape[0]-1:
                for i in range(0, masterdf.shape[0], 1):
                    if msubfeature[i] is np.nan:
                        if tsubfeature[i+1] is np.nan:
                            continue
                        else:
                            break
                    else:
                        if tsubfeature[i+1] is np.nan:
                            break
                        else:
                            if str(msubfeature[i]).rstrip()!=str(tsubfeature[i+1]).rstrip():
                                break
                if i==masterdf.shape[0]-1:
                    return 'Valid'
                else:
                    return 'Invalid'
            else:
                return 'Invalid'

