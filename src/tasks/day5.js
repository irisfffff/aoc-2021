// --- Day 5: Hydrothermal Venture ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day5').slice(0, -1)
  .map(line => {
    const match = line.match(/^([0-9]*),([0-9]*) -> ([0-9]*),([0-9]*)$/)
    return match.slice(1).map(item => parseInt(item))
  })

const drawStraight = ([ x1, y1, x2, y2 ], diagram) => {
  if (x1 === x2) {
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      diagram[i][x1]++
    }
    return
  }
  if (y1 === y2) {
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
      diagram[y1][i]++
    }
    return
  }
}

const drawDiagonal = ([ x1, y1, x2, y2 ], diagram) => {
  if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
    if ((x2 >= x1 && y2 >= y1) || (x1 >= x2 && y1 >= y2)) {
      const x = Math.min(x1, x2)
      const y = Math.min(y1, y2)
      for (let i = 0; i <= Math.abs(x1 - x2); i++) {
        diagram[y + i][x + i]++
      }
      return
    }
    if ((x2 <= x1 && y2 >= y1) || (x1 <= x2 && y1 >= y2)) {
      const x = Math.min(x1, x2)
      const y = Math.max(y1, y2)
      for (let i = 0; i <= Math.abs(x1 - x2); i++) {
        diagram[y - i][x + i]++
      }
      return
    }
  }
}

// -------- Part One --------
let startTime = process.hrtime()

const width = 1000
const diagram = new Array(width)
for (let i = 0; i < width; i++) {
  diagram[i] = new Array(width).fill(0)
}

data.forEach(line => drawStraight(line, diagram))

const overlaps1 = sumArray(diagram.map(row => row.filter(item => item > 1).length))

console.log('Part One ---', overlaps1)

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()

data.forEach(line => drawDiagonal(line, diagram))

const overlaps2 = sumArray(diagram.map(row => row.filter(item => item > 1).length))

console.log('Part Two ---', overlaps2)

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
