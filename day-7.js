const fs = require('fs')

const fileName = 'day-7-input.txt'

fs.readFile(fileName, 'utf-8', interpretFile)

function interpretFile (err, result) {
  if (err) throw err
  const positions = result.split('\r\n').map(line => {
    const second = line.slice(36, 37)
    const first = line.slice(5, 6)
    return {first, second}
  })
  const steps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => { return {char, prereqs: []} })

  steps.forEach(step => {
    positions.forEach(position => {
      if (step.char === position.second) {
        step.prereqs.push(position.first)
      }
    })
  })
  getOrder(steps.map(step => step))
  calculateTime(steps)
}

function getOrder (steps) {
  let order = []
  let i = 0
  while (steps.length) {
    const step = steps[i]
    const prereqs = step.prereqs.filter(prereq => {
      return !order.find(char => char === prereq)
    })
    if (prereqs.length === 0) {
      order.push(step.char)
      steps.splice(i, 1)
      i = 0
    } else {
      i++
      if (i === steps.length) {
        console.log('problem')
        steps = []
      }
    }
  }

  console.log(order.join(''))
}

function calculateTime (steps) {
  steps.forEach((step, i) => {
    step.count = 61 + i
  })
  let count = 0
  let workers = [{}, {}, {}, {}, {}]
  let stepsDone = []

  while (steps.length) {
    const availableWorkers = workers.filter(worker => !worker.step)
    if (availableWorkers.length) {
      const availableSteps = steps.filter(step => {
        return !step.worker && !step.prereqs.filter(prereq => {
          return !stepsDone.find(char => char === prereq)
        }).length
      })
      availableWorkers.forEach((worker, i) => {
        let step = availableSteps[i]
        if (step) {
          worker.step = step
          step.worker = worker
        }
      })
    }

    count++

    workers.forEach(worker => {
      if (worker.step) {
        worker.step.count--
        if (worker.step.count === 0) {
          stepsDone.push(worker.step.char)
          steps = steps.filter(step => step.char !== worker.step.char)
          worker.step = null
        }
      }
    })
  }

  console.log(count)
}
