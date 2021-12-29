import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";

  const getSheetData = (data) => {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(fields);
    return sheetData;
  }

  export const saveAsExcel = async (data) => {

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(data);
      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      sheet1.row(1).style("bold", true);
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "file.xlsx");
      });
    });
  }
