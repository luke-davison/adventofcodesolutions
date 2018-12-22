function calculateHighScore (numPlayers, lastMarble) {
  const circle = [0]
  const players = []
  for (let id = 0; id < numPlayers; id++) {
    players.push({id, score: 0})
  }
  let currentPlayer = 0
  let currentMarblePosition = 0
  let nextMarble = 1

  while (nextMarble <= lastMarble) {
    if (nextMarble % 23 === 0) {
      players[currentPlayer].score += nextMarble
      currentMarblePosition = currentMarblePosition - 7
      if (currentMarblePosition < 0) {
        currentMarblePosition += circle.length
      }
      players[currentPlayer].score += circle.splice(currentMarblePosition, 1)[0]
      if (currentMarblePosition === circle.length) {
        currentMarblePosition = 0
      }
    } else {
      currentMarblePosition = currentMarblePosition + 2
      if (currentMarblePosition > circle.length) {
        currentMarblePosition = 1
      }
      circle.splice(currentMarblePosition, 0, nextMarble)
    }
    nextMarble++
    currentPlayer++
    if (currentPlayer === players.length) {
      currentPlayer = 0
    }
  }
  const winningScore = players.reduce((highScore, player) => player.score > highScore ? player.score : highScore, 0)

  console.log(winningScore)
}

calculateHighScore(468, 71843)
// doesn't work or takes too long
calculateHighScore(468, 71843 * 100)
