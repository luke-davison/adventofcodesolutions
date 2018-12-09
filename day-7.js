const fs = require('fs')
const moment = require('moment')

const fileName = 'day-7-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
    if (err) throw err
    const positions = result.split('\r\n').map(line => {
        const second = line.splice(36, 1)[0]
        const first = line.splice(5, 1)[0]
        return {first, second}
    })
    const steps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(char => {return {char, prereqs: []}})

    steps.forEach(step => {
        positions.forEach(position => {
            if (step.char === position.second) {
                prereqs.push(position.first)
            }
        })
    })
}