const fs = require('fs')

const fileName = 'day-3-1-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
    if (err) throw err
    let lines = result.split('\n').map(line => line.split(' '))
    lines = lines.map(line => {
        const id = Number(line[0].slice(1))
        const left = Number(line[2].slice(0, line[2].indexOf(',')))
        const top = Number(line[2].slice(line[2].indexOf(',') + 1, line[2].indexOf(':')))
        const width = Number(line[3].slice(0, line[3].indexOf('x')))
        const height = Number(line[3].slice(line[3].indexOf('x') + 1))
        return {id, left, top, width, height}
  })
  countDuplicates(lines)
}

function countDuplicates(lines) {
    const maxWidth = lines.reduce((max, line) => {
        if (line.left + line.width - 1 > max) {
            return line.left + line.width - 1
        }
        return max
    }, 1000)
    let cells = []
    lines.forEach(line => {
        for (let x = line.left; x < line.left + line.width; x++) {
            for (let y = line.top; y < line.top + line.height; y++) {
                cells.push(x + y * maxWidth);
            }
        }
    })
    cells.sort()

    const duplicates = cells.filter((cell, i) => {
        return (i !== cells.length -1 && cells[i + 1] === cell && (i === 0 || cells[i - 1] !== cell))
    })
    console.log(duplicates.length)

    lines.forEach(line => {
        for (let x = line.left; x < line.left + line.width; x++) {
            for (let y = line.top; y < line.top + line.height; y++) {
                let value = x + y * maxWidth;
                if (duplicates.indexOf(value) !== -1) {
                    return
                }
            }
        }
        console.log("#" + line.id)
    })
}