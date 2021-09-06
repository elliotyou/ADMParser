module.exports = {
  STATUS: {
    init: 'init',
    modelNameSet: 'modelNameSet',
    modelDetailSet: 'modelDetailSet',
    modelComplete: 'modelComplete',
    IMEIAdded: 'IMEIAdded',
  },
  SHEET: '',
  RANGE: '',
  Coordinates: '', // [{ c:0,r:0 },{ c:0,r:1 },{ c:0,r:2 },{ c:0,r:3 },{ c:0,r:4 },...,{ c:1,r:7 }]
  //given { s: { c: 0, r: 0 }, e: { c: 1, r: 7 } }
  //return [{ c:0,r:0 },{ c:0,r:1 },{ c:0,r:2 },{ c:0,r:3 },{ c:0,r:4 },...,{ c:1,r:7 }]
  getCoordinates(range) {
    let output = []
    for (let col = range.s.c; col <= range.e.c; col++) {
      for (let row = range.s.r; row <= range.e.r; row++) {
        output.push({ c: col, r: row })
      }
    }
    return output
  },
}
