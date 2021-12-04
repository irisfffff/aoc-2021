// ** Play bingo with an octopus **
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day4').slice(0, -1)

const input = data[0].split(',').map(item => parseInt(item))

const boards = []
for (let i = 2; i < data.length - 4; i += 6) {
  boards.push(
    data.slice(i, i + 5)
      .map(line => line.trim()
        .replace(/  +/g, ' ')
        .split(' ')
        .map(item => parseInt(item))))
}

// If a number on a board is unmarked or not
// [[25 items for board1], [25 items for board2], ...]
const boardMark = []
for (let i = 0; i < boards.length; i++) {
  boardMark.push(new Array(25).fill(1))
}
// Sum of total amount of numbers marked on the row/column
// [[rows], [columns], [rows], [columns], ...]
const boardSum = []
for (let i = 0; i < boards.length * 2; i++) {
  boardSum.push(new Array(5).fill(0))
}

const markNumber = (num) => {
  boards.forEach((board, idx) => {
    for (let i = 0; i < 5; i++) {
      const j = board[i].findIndex((item) => item === num)
      if (j !== -1) {
        boardSum[idx * 2][i]++
        boardSum[idx * 2 + 1][j]++
        boardMark[idx][i * 5 + j] = 0
      }
    }
  })
}


// -------- Part One --------
let startTime = process.hrtime()

let i = 0, bingoed = -1
for (; i < input.length; i++) {
  markNumber(input[i])
  bingoed = boardSum.findIndex(item => item.some((ele) => ele === 5))
  if (bingoed !== -1)
    break
}

const winningBoard = boards[Math.floor(bingoed / 2)]
const winningBoardMark = boardMark[Math.floor(bingoed / 2)]
const sumWinning = sumArray(winningBoard.flat()
  .map((item, idx) => item * winningBoardMark[idx]))

console.log('Part One ---', sumWinning * input[i])

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()

let boardsLeft = boards.map((board, idx) => ({
  board,
  index: idx
}))
let losingBoard, losingIndex
// Continue until one board left
for (i = i + 1; i < input.length; i++) {
  markNumber(input[i])
  boardsLeft = boardsLeft.filter(({ board, index }) =>
    boardSum[index * 2].every((item) => item < 5) && boardSum[index * 2 + 1].every((item) => item < 5)
  )
  if (boardsLeft.length === 1) {
    losingBoard = boardsLeft[0].board
    losingIndex = boardsLeft[0].index
    break
  }
}

// Continue until the last board is bingoed
for (i = i + 1; i < input.length; i++) {
  markNumber(input[i])
  if (boardSum[losingIndex * 2].some(item => item === 5) || boardSum[losingIndex * 2 + 1].some(item => item === 5))
    break
}
const sumLosing = sumArray(losingBoard.flat().map((item, idx) => item * boardMark[losingIndex][idx]))

console.log('Part Two ---', sumLosing * input[i])

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
