const fs = require('fs')
const moment = require('moment')

const fileName = 'day-6-1-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
    if (err) throw err
    const coordinates = result.split('\r\n').map(line => {
        let x = Number(line.slice(0, line.indexOf(',')))
        let y = Number(line.slice(line.indexOf(',') + 2))
        return {x, y, cells: [], distances: []}
    })

    const minX = coordinates.reduce((min, next) => min > next.x ? next.x : min, 99999)
    const minY = coordinates.reduce((min, next) => min > next.y ? next.y : min, 99999)
    const maxX = coordinates.reduce((max, next) => max < next.x ? next.x : max, 0)
    const maxY = coordinates.reduce((max, next) => max < next.y ? next.y : max, 0)

    let cells = []

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            let nearest = []
            let nearestDistance
            let distances = []
            coordinates.forEach(coord => {
                let distance = Math.abs(coord.x - x) + Math.abs(coord.y - y)
                if (!nearest.length || distance < nearestDistance) {
                    nearest = [coord]
                    nearestDistance = distance
                } else if (distance === nearestDistance) {
                    nearest.push(coord)
                }
                distances.push(distance)
            })
            let distanceSum = distances.reduce((sum, distance) => sum + distance, 0)
            const cell = {x, y, nearest, nearestDistance, distanceSum}
            cells.push(cell)
            if (cell.nearest.length === 1) {
                cell.nearest[0].cells.push(cell)
                if (x === minX || y === minY || x === maxX || y === maxY) {
                    cell.nearest[0].edge = true
                }
            }
        }
    }

    const largestArea = coordinates
        .filter(coord => !coord.edge)
        .reduce((largest, next) => !largest || largest.cells.length < next.cells.length ? next : largest)
    console.log('largest area:', largestArea.cells.length)

    const closestCells = cells.filter(cell => cell.distanceSum < 10000)
    console.log('closest cells area:', closestCells.length)


}