// require module as reader
const reader = require('xlsx')
const file = reader.readFile('./test.xlsx', { bookSheets: false })
const parse = require('./parse')
const cell = require('./cell')

// Getting sheet object
parse.SHEET = file.Sheets[file.SheetNames[0]]

// Getting logical range. e.g. { s: { c: 0, r: 0 }, e: { c: 1, r: 7 } }
parse.RANGE = reader.utils.decode_range(parse.SHEET['!ref']);
// Getting arranged coordinates [{ c: 0, r: 0 },{ c: 0, r: 1 },{ c: 0, r: 2 },....{ c: 1, r: 7 }]
parse.Coordinates = parse.getCoordinates(parse.RANGE)
// 
cell.currentCoordinate = parse.Coordinates[0]
// 
cell.self = parse.SHEET[reader.utils.encode_cell(cell.currentCoordinate)]
// 
console.log(parse.Coordinates)

