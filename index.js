// require module as reader
const reader = require('xlsx')
//read xlsx as file
const file = reader.readFile('./test.xlsx', { bookSheets: false })

function IterateAllCells(sheet) {
  var headers = [];    //leave a empty variable for the output later
  //Getting logical range automatically, e.g. range = 'A1-M12'
  var range = reader.utils.decode_range(sheet['!ref']);
  /* start in the first row */
  //s: start, e: end, c: column, r: row
  /* walk every column in the range */
  for (var i = range.s.c; i <= range.e.c; i++) {  //iterate all columns
    for (var j = range.s.r; j <= range.e.r; j++) { //iterate all rows
      // find the cell at coordinate i,j. {c:i, r:j} 是坐標，例如{c:1, r:3} 就是第 2 欄第 4 列
      var cell = sheet[reader.utils.encode_cell({ c: i, r: j })]
      var header = "UNKNOWN " + i;      //設定 column name 的預設值
      //cell 的 property 可參考: https://docs.sheetjs.com/
      //cell.t 是 type，例如此格是日期，cell.t 的結果就會是日期
      if (cell && cell.t) {    //當所爬到的那格是有意義的時候
        //format_cell: generates the text value for a cell(using number formats).
        header = reader.utils.format_cell(cell);
      }
      headers.push(header);
    }
  }
  return headers;
}

console.log(IterateAllCells(file.Sheets[file.SheetNames[0]]))
//================================================

