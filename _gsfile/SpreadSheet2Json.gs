function SpreadSheet2Json(sheet) {
  // first line(title)
  var colStartIndex = 1;
  var rowNum = 1;
  var firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var firstRowValues = firstRange.getValues();
  var titleColumns = firstRowValues[0];

  // after the second line(data)
  var lastRow = sheet.getLastRow();
  var rowValues = [];
  for(var rowIndex=2; rowIndex<=lastRow; rowIndex++) {
    var colStartIndex = 1;
    var rowNum = 1;
    var range = sheet.getRange(rowIndex, colStartIndex, rowNum, sheet.getLastColumn());
    var values = range.getValues();
    rowValues.push(values[0]);
  }

  // create json
  var json = new Object;
  for(var j=1; j<titleColumns.length; j++) {
    json[titleColumns[j]] = new Object();
    for(var i=0; i<rowValues.length; i++) {
      var line = rowValues[i];
      if ( line[0].indexOf('/') != -1) {
        var subline = line[0].split('/');
        if(!json[titleColumns[j]][subline[0]]) json[titleColumns[j]][subline[0]] = new Object;
        json[titleColumns[j]][subline[0]][subline[1]] = line[j];
      } else {
        json[titleColumns[j]][line[0]] = line[j];
      }
    }
  }
  return json;
}

var URL_BOOK = 'スプレッドシートのURL';
var SHEET_NAME = 'スプレッドシートのシート名';

function doGet(e) {
  var url = URL_BOOK;
  var sheetName = SHEET_NAME;

  var book = SpreadsheetApp.openByUrl(url);
  var sheet = book.getSheetByName(sheetName);

  var json = SpreadSheet2Json(sheet);
  return ContentService.createTextOutput(JSON.stringify(json, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}