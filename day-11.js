function calculateGrid (input, size) {
  const gridWidth = 300
  const gridHeight = 300

  let racks = []

  for (let x = 1; x <= gridWidth; x++) {
    const rackId = 10 + x
    let rack = {rackId, cells: []}
    racks.push(rack)
    for (let y = 1; y <= gridHeight; y++) {
      const powerLvl = calculatePowerLvl(x, y, input)
      rack.cells.push({x, y, rack, powerLvl})
    }
  }

  let highest = {score: 0}
  racks.filter((rack, x) => x < racks.length - size + 1).forEach((rack, x) => {
    rack.cells.filter((cell, y) => y < rack.cells.length - size + 1).forEach((cell, y) => {
      cell.score = racks.reduce((score, nextRack, i) => {
        if (i >= x && i < x + size) {
          return nextRack.cells.reduce((score2, nextCell, j) => {
            if (j >= y && j < y + size) {
              score2 += nextCell.powerLvl
            }
            return score2
          }, score)
        } else {
          return score
        }
      }, 0)
      if (cell.score > highest.score) {
        highest = cell
      }
    })
  })

  highest.size = size

  return highest
}

function calculatePowerLvl (x, y, input) {
  let powerLvl = ((x + 10) * y + input) * (x + 10)
  powerLvl = powerLvl.toString().split('')
  if (powerLvl.length < 3) {
    powerLvl = 0
  } else {
    powerLvl = Number(powerLvl[powerLvl.length - 3])
  }
  powerLvl -= 5
  return powerLvl
}

// takes a very long time.
// fortunately the actual answer was one of the smaller size squares

let highest = {score: 0}
for (let size = 1; size <= 300; size++) {
  const next = calculateGrid(5791, size)
  console.log('size:', size, '-', next.x + ',' + next.y + ',' + size, '-', next.score)
  if (next.score > highest.score) {
    highest = next
  }
}

console.log(highest.x + ',' + highest.y + ',' + highest.size)
