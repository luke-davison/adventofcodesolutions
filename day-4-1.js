const fs = require('fs')
const moment = require('moment')

const fileName = 'day-4-1-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
  if (err) throw err
  let lines = result.split('\n')
  let data = lines.map(line => {
    let dateStr = line.slice(1, line.indexOf(']'))
    let time = moment(dateStr, 'YYYY-MM-DD HH:mm')
    let str = line.slice(line.indexOf(']') + 2)
    let arr = str.split(' ')
    let id
    let text
    if (arr[0] === 'Guard') {
      id = Number(arr[1].slice(1))
      text = arr[2] + ' ' + arr[3]
    } else {
      text = str
    }
    return { time, id, text }
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

function findSleepiestGuard (data) {
  let start
  for (let i = 0; i < data.length; i++) {
    const line = data[i]
    if (line.text === 'falls asleep\r') {
      start = line.time
    }
    if (line.text === 'wakes up\r') {
      line.minutes = moment.duration(line.time.diff(start)).asMinutes()
      line.timesAsleep = []
      for (let i = 0; i < line.minutes; i++) {
        line.timesAsleep.push(start.format('mm'))
        start.add(1, 'minutes')
      }
    }
  }
  const guards = data.reduce((arr, line) => {
    let guard = arr.find(guard => guard.id === line.id)
    if (!guard) {
      arr.push({ id: line.id, lines: [], timesAsleep: [] })
    } else {
      guard.lines.push(line)
      if (line.timesAsleep) {
        line.timesAsleep.forEach(time => guard.timesAsleep.push(time))
      }
    }
    return arr
  }, [])
  guards.forEach((guard) => {
    guard.timeAsleep = guard.lines.reduce((time, line) => {
      if (line.minutes) {
        time += line.minutes
      }
      return time
    }, 0)
  })
  guards.forEach(findSleepiestMinute)

  const sleepiestGuard = guards.reduce((current, next) => !current || next.timeAsleep > current.timeAsleep ? next : current, null)
  console.log('Id', sleepiestGuard.id)
  console.log('Minute', sleepiestGuard.sleepiestMinute.minute)

  const sleepiestMinuteGuard = guards.reduce((current, next) => !current || next.sleepiestMinute.count > current.sleepiestMinute.count ? next : current, null)
  console.log('Id', sleepiestMinuteGuard.id)
  console.log('Minute', sleepiestMinuteGuard.sleepiestMinute.minute)
}

function findSleepiestMinute (guard) {
  let count = 0
  const minute = guard.timesAsleep.reduce((ans, min, i) => {
    const rest = guard.timesAsleep.filter((min2, i2) => i2 > i && min === min2)
    if (rest.length > count) {
      count = rest.length
      return min
    }
    return ans
  }, 0)
  guard.sleepiestMinute = {count, minute}
}
