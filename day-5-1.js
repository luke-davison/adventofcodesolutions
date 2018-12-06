const fs = require('fs')
const moment = require('moment')

const fileName = 'day-5-1-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
    if (err) throw err

    let reducedStr = reactString(result.split(''))   
    console.log(reducedStr.length)
    
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm'.split('')
    
    const possibleLengths = alphabet.map(letter => {
        const filteredStr = reducedStr.filter(letter2 => letter2.toLowerCase() !== letter)
        return reactString(filteredStr).length
    })

    const min = possibleLengths.reduce((min, next) =>  !min || next < min ? next : min, 0)
    console.log(min)

}

function reactString(characters) {
    for (let i = 0; i < characters.length - 1; i++) {
        if (characters[i].toLowerCase() === characters[i + 1].toLowerCase() && characters[i] !== characters[i + 1]) {
            characters.splice(i, 2)
            if (i > 0) {
                i--
            }
            i--
        }
    }
    return characters
}