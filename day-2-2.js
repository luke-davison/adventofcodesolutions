const fs = require('fs')

const fileName = 'day-2-1-input.txt'

fs.readFile(fileName, 'utf-8', calculateFile)

function calculateFile (err, result) {
  if (err) throw err
  const lines = result.split('\n').map(line => line.split(''))
  let solution = ''
  lines.forEach((line, i) => {
      const otherLines = lines.filter((line2, i2) => i2 > i)
      otherLines.forEach(line2 => {
        let count = 0
        line.forEach((character, j) => {
            const character2 = line2[j]
            if (character !== character2) {
                count++
            }
        })
        if (count === 1) {
            console.log(line.join(''))
            console.log(line2.join(''))
        }
      })
  })
}
