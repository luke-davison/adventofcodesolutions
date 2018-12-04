const fs = require('fs')
const moment = require('moment')

const fileName = 'day-4-1-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
    if (err) throw err
    let lines = result.split('\n')
    let data = lines.map(line => {
        let dateStr = line.slice(1, line.indexOf("]"))
        let time = moment(dateStr, "YYYY-MM-DD hh:mm")
        let str = line.slice(line.indexOf("]") + 2)
        let arr = str.split(" ")
        let guard
        let text
        if (arr[0] === "Guard") {
            guard = Number(arr[1].slice(1))
            text = arr[2] + " " + arr[3]
        } else  {
            text = str;
        }
        return {time, guard, text}
    })
    data.sort((a, b) => a.time > b.time ? 1 : -1)
    console.log(data)
}