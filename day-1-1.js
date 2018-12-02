const fs = require('fs')

const fileName = 'day-1-1-input.txt'

fs.readFile(fileName, 'utf-8', calculateFile)

function calculateFile (err, result) {
  if (err) throw err
  const lines = result.split('\n')
  let total = 0
  lines.forEach(line => {
    total += Number(line)
  })
  console.log(total)
}
