// --- Day 21: Dirac Dice ---
import {sumArray} from '../utils/index.js'

// // -------- Part One --------
// const takeTurn = (start, dices) => {
//   const result = (start + sumArray(dices)) % 10
//   return result ? result : 10
// }
//
// const getDieResult = (dice) => {
//   const result = dice % 100
//   return result ? result : 100
// }

// const limit = 1000
// let pos1 = 3, pos2 = 4, score1 = 0, score2 = 0, isPlayer1 = true
// let dice = 0
// while (score1 < limit && score2 < limit) {
//   const dices = [ getDieResult(++dice), getDieResult(++dice), getDieResult(++dice) ]
//   if (isPlayer1) {
//     pos1 = takeTurn(pos1, dices)
//     score1 += pos1
//   } else {
//     pos2 = takeTurn(pos2, dices)
//     score2 += pos2
//   }
//   isPlayer1 = !isPlayer1
// }
//
// console.log('Part One ---', Math.min(score1, score2) * dice)


// -------- Part Two --------
const takeTurn = (start, dieResult) => {
  const result = (start + dieResult) % 10
  return result ? result : 10
}
const limit = 21
// Dice result possibilities of every turn
const possibilities = [ [ 3, 1 ], [ 4, 3 ], [ 5, 6 ], [ 6, 7 ], [ 7, 6 ], [ 8, 3 ], [ 9, 1 ] ]
// { pos1, pos2, score1, score2, isPlayer1, universes }
const splitsUniverse = (pos1, pos2, score1, score2, isPlayer1) => {
  let player1Wins = 0, player2Wins = 0
  for (const [ dieResult, universes ] of possibilities) {
    let newPos1 = pos1, newPos2 = pos2, newScore1 = score1, newScore2 = score2
    if (isPlayer1) {
      newPos1 = takeTurn(pos1, dieResult)
      newScore1 += newPos1
    } else {
      newPos2 = takeTurn(pos2, dieResult)
      newScore2 += newPos2
    }
    if (newScore1 >= limit) {
      player1Wins += universes
    } else if (newScore2 >= limit) {
      player2Wins += universes
    } else {
      const [ wins1, wins2 ] = splitsUniverse(newPos1, newPos2, newScore1, newScore2, !isPlayer1)
      player1Wins += universes * wins1
      player2Wins += universes * wins2
    }
  }
  return [ player1Wins, player2Wins ]
}

const result = splitsUniverse(3, 4, 0, 0, true)
console.log('Part Two ---', Math.max(...result))
