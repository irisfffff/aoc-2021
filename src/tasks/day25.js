// --- Day 25: Sea Cucumber ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day25').slice(0, -1).map(row => row.split(''))

const height = data.length
const width = data[0].length

const parseStep = () => {
  const movableEast = []
  data.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item !== '>') return
      if (data[i][(j + 1) % width] === '.')
        movableEast.push([ i, j ])
    })
  })
  movableEast.forEach(([ i, j ]) => {
    data[i][j] = '.'
    data[i][(j + 1) % width] = '>'
  })

  const movableSouth = []
  data.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item !== 'v') return
      if (data[(i + 1) % height][j] === '.')
        movableSouth.push([ i, j ])
    })
  })
  movableSouth.forEach(([ i, j ]) => {
    data[i][j] = '.'
    data[(i + 1) % height][j] = 'v'
  })
  return movableEast.length + movableSouth.length
}


// -------- Part One --------
let steps = 0
while
  (true) {
  const result = parseStep()
  steps++
  if (!result) break
}
console.log('Part One ---', steps)


// -------- Part Two --------

console.log('Part Two ---')
