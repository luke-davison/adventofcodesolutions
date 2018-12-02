const fs = require('fs')

const fileName = 'day-2-1-input.txt'

fs.readFile(fileName, 'utf-8', calculateFile)

function calculateFile (err, result) {
  if (err) throw err
  const lines = result.split('\n')
  let total2 = 0
  let total3 = 0
  lines.forEach(line => {
    let found2 = false
    let found3 = false
    const characters = line.split('')
    let runningTotal = 0
    characters.sort((a, b) => {
        if (a > b) {
            return -1
        }
        return 1
    })
    characters.forEach((character, position) => {
        runningTotal++;
        if (position !== characters.length - 1 && characters[position + 1] !== character) {
            if (runningTotal === 2 && !found2) {
                total2++
                found2 = true
            }
            if (runningTotal === 3 && !found3) {
                total3++
                found3 = true
            }
            runningTotal = 0
        }
    })
  })
  console.log("two:", total2, "three:", total3, "sum:", total2 * total3)
}
