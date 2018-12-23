// this was inspired by a solution on the advent of code reddit
// my original solution would take hours due to splicing very large arrays

function calculateHighScore (numPlayers, lastMarble) {
  const marbles = []
  const initialMarble = {value: 0}
  initialMarble.next = initialMarble
  initialMarble.prev = initialMarble
  marbles.push(initialMarble)

  const players = []
  let next = {}
  for (let id = 0; id < numPlayers; id++) {
    const player = {next, score: 0}
    players.push(player)
    next = player
  }
  players[0].next = players[players.length - 1]

  let currentPlayer = players[0]
  let currentMarble = initialMarble
  let nextMarble = 1

  while (nextMarble <= lastMarble) {
    if (nextMarble % (lastMarble / 100) === 0) {
      console.log(nextMarble / (lastMarble / 100))
    }
    if (nextMarble % 23 === 0) {
      currentPlayer.score += nextMarble
      currentMarble = currentMarble.prev.prev.prev.prev.prev.prev
      currentPlayer.score += currentMarble.prev.value
      currentMarble.prev.prev.next = currentMarble
      currentMarble.prev = currentMarble.prev.prev
    } else {
      const newMarble = {value: nextMarble}
      newMarble.prev = currentMarble.next
      newMarble.next = currentMarble.next.next
      newMarble.prev.next = newMarble
      newMarble.next.prev = newMarble
      currentMarble = newMarble
      marbles.push(currentMarble)
    }
    nextMarble++
    currentPlayer = currentPlayer.next
  }
  const winningScore = players.reduce((highScore, player) => player.score > highScore ? player.score : highScore, 0)

  console.log(winningScore)
}

calculateHighScore(468, 71843)
// doesn't work or takes too long
calculateHighScore(468, 71843 * 100)
