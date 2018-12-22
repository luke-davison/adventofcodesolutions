const fs = require('fs')

const fileName = 'day-8-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
  if (err) throw err
  const numbers = result.split(' ').map(num => Number(num))
  let count = 0
  const node = getNode(numbers)

  console.log(count)
  console.log(node.value)

  function getNode (numbers) {
    const numChildren = numbers[0]
    const numMetadata = numbers[1]
    numbers.splice(0, 2)
    let children = []
    let i = 0
    while (i < numChildren) {
      children.push(getNode(numbers))
      i++
    }
    const metaData = numbers.splice(0, numMetadata)
    metaData.forEach(num => { count += num })

    let value = 0
    if (numChildren === 0) {
      value = metaData.reduce((sum, num) => sum + num, 0)
    } else {
      value = metaData.reduce((sum, num) => children[num - 1] ? sum + children[num - 1].value : sum, 0)
    }

    return {numChildren, numMetadata, children, metaData, value}
  }
}
