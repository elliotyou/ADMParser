// require module as reader
const { raw } = require('express')
const reader = require('xlsx')

//read xlsx file as file
const file = reader.readFile('./test.xlsx', { sheetRows: 3 })

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

// Printing data
console.log(data)

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