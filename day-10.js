const fs = require('fs')

const fileName = 'day-10-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
  if (err) throw err
  const stars = result.split('\r\n').map(line => {
    let pos = line.indexOf('<') + 1
    let x = Number(line.slice(pos + 1, line.indexOf(',', pos)))
    x = line.slice(pos, pos + 1) === '-' ? -x : x

    pos = line.indexOf(',', pos) + 2
    let y = Number(line.slice(pos + 1, line.indexOf('>', pos)))
    y = line.slice(pos, pos + 1) === '-' ? -y : y

    pos = line.indexOf('<', pos) + 1
    let xSpeed = Number(line.slice(pos + 1, line.indexOf(',', pos)))
    xSpeed = line.slice(pos, pos + 1) === '-' ? -xSpeed : xSpeed

    pos = line.indexOf(',', pos) + 2
    let ySpeed = Number(line.slice(pos + 1, line.indexOf('>', pos)))
    ySpeed = line.slice(pos, pos + 1) === '-' ? -ySpeed : ySpeed

    return {x, y, xSpeed, ySpeed}
  })

  drawStars(stars)
}

function drawStars (stars) {
  // it just occurred to me that my input numbers are too high
  // to draw in Node
  // will come back to this challenge
}
