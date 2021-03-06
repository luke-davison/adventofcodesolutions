const fs = require('fs')

const fileName = 'day-1-1-input.txt'

fs.readFile(fileName, 'utf-8', calculateFile)

function calculateFile (err, result) {
  if (err) throw err
  const lines = result.split('\n')
  let totals = [0]
  const getTotal = () => totals[totals.length - 1]
  while (totals.indexOf(getTotal()) === totals.length - 1) {
    const line = lines.shift()
    totals.push(totals[totals.length - 1] + Number(line))
    lines.push(line)
  }
  console.log(getTotal())
}
