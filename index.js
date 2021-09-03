// require module as reader
const reader = require('xlsx')
const file = reader.readFile('./test.xlsx', { bookSheets: false })

function get_header_row(sheet) {
  var headers = [];
  var range = reader.utils.decode_range(sheet['!ref']);
  console.log('range', range)
  var i, j = range.s.r; /* start in the first row */
  /* walk every column in the range */
  for (i = range.s.c; i <= range.e.c; ++i) {   //s: start, e: end, c: column, r: row
    /* find the cell in the first row */
    var cell = sheet[reader.utils.encode_cell({ c: i, r: j })]    //{c:i, r:j} 是坐標，例如{c:1, r:3} 就是第 2 欄第 4 列
    console.log(`cell-${i}`)
    console.log(cell)
    var header = "UNKNOWN " + i;      //設定 column name 的預設值
    //cell 的 property 可參考: https://docs.sheetjs.com/
    //cell.t 是 type，就是那1格是數字、文字、日期…。
    if (cell && cell.t) {    //當所爬到的那格是有意義的時候
      header = reader.utils.format_cell(cell);   //format_cell: generates the text value for a cell(using number formats).
    }
    headers.push(header);
  }
  return headers;
}

console.log(get_header_row(file.Sheets[file.SheetNames[0]]))
//================================================

//read xlsx file as file
//for parsing options, check https://github.com/SheetJS/sheetjs#parsing-options
const file = reader.readFile('./test.xlsx', { bookSheets: false })

let data = []

//read sheets as sheets
const sheets = file.SheetNames

for (let i = 0; i < sheets.length; i++) {
  //in each sheet
  //select the corresponding sheet, and convert that sheet object to json , as temp
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
  //data array append "each rows of temp" 
  temp.forEach((res) => { data.push(res) })
}

//================================================

// Printing data
// console.log(data)
console.log(get_header_row(file.Sheets[file.SheetNames[0]]))


// // Sample data set
// let student_data = [{
//   Student: 'Nikhil',
//   Age: 22,
//   Branch: 'ISE',
//   Marks: 70
// },
// {
//   Name: 'Amitha',
//   Age: 21,
//   Branch: 'EC',
//   Marks: 80
// }]

// const ws = reader.utils.json_to_sheet(student_data)

// reader.utils.book_append_sheet(file, ws, "Sheet3")

// reader.writeFile(file, './test.xlsx')



