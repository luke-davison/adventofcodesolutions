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
        let id
        let text
        if (arr[0] === "Guard") {
            id = Number(arr[1].slice(1))
            text = arr[2] + " " + arr[3]
        } else  {
            text = str;
        }
        return {time, id, text}
    })
    data.sort((a, b) => a.time > b.time ? 1 : -1)
    data.forEach((line, i) => {
        if (!line.id) {
            if (i > 0) {
                line.id = data[i - 1].id
            }
        }
    })
    findSleepiestGuard(data)
}

function findSleepiestGuard(data) {
    let start;
    for (let i = 0; i < data.length; i++) {
        const line = data[i]
        if (line.text === 'falls asleep\r') {
            start = line.time
        }
        if (line.text === 'wakes up\r') {
            line.minutes = moment.duration(line.time.diff(start)).asMinutes()
        }
    }
    const guards = data.reduce((arr, line) => {
        let guard = arr.find(guard => guard.id === line.id)
        if (!guard) {
            arr.push({id: line.id, lines: []})
        } else {
            guard.lines.push(line)
        }
        return arr
    }, [])
    guards.forEach((guard) => {
        guard.timeAsleep = guard.lines.reduce((time, line) => {
            if (line.minutes) {
                time += line.minutes;
            }
            return time
        }, 0)
    })

    guards.forEach(guard => {
        console.log(guard.id, guard.timeAsleep)
    })
}