// --- Day 11: Dumbo Octopus ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day11').slice(0, -1)
  .map(line => line.split('').map(item => parseInt(item)))

const adjacent = [ [ -1, -1 ], [ -1, 0 ], [ -1, 1 ], [ 0, -1 ], [ 0, 1 ], [ 1, -1 ], [ 1, 0 ], [ 1, 1 ] ]

const increaseByOne = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      data[i][j] += 1
    }
  }
}

const increaseAdjacent = (i, j, flashed) => {
  adjacent.forEach(([ a, b ]) => {
    const x = i + a
    const y = j + b
    if ((x >= 0 && x < 10) && (y >= 0 && y < 10) && !flashed[x][y]) {
      data[x][y] += 1
    }
  })
}
// -------- Part One --------
const parseStep = () => {
  increaseByOne()

  const flashed = []
  for (let i = 0; i < 10; i++) flashed.push(new Array(10).fill(0))
  do {
    data.forEach((line, i) => {
      line.forEach((item, j) => {
        if (item > 9 && !flashed[i][j]) {
          flashed[i][j] = 1
          data[i][j] = 0
          increaseAdjacent(i, j, flashed)
        }
      })
    })
  } while (!data.flat().every(item => item <= 9))

  return sumArray(flashed.flat())
}

// let total = 0
// let steps = 100
// do {
//   total += parseStep()
//   steps--
// } while (steps)
// console.log('Part One ---', total)


// -------- Part Two --------
let steps = 0
let flashedInStep = 0
do {
  flashedInStep = parseStep()
  steps++
} while (flashedInStep !== 100)
console.log('Part Two ---', steps)
