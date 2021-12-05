// --- Day 1: Sonar Sweep ---
import {readByLine} from '../utils/index.js'

const data = readByLine('../data/day1').slice(0, -1).map(item => parseInt(item))

const calculateIncreased = (arr, diff = 1) => {
  let increased = 0
  for (let i = 0; i <= arr.length - diff; i++) {
    if (arr[i + diff] > arr[i]) increased += 1
  }
  return increased
}

// -------- Part One --------
let startTime = process.hrtime()

console.log('Part One ---' + calculateIncreased(data, 1))

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()

console.log('Part Two ---' + calculateIncreased(data, 3))

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
