// --- Day 7: The Treachery of Whales ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day7').slice(0, -1)[0]
  .split(',').map(item => parseInt(item))


// -------- Part One --------
let startTime = process.hrtime()
const sum1 = []

for (let i = 0; i <= Math.max(...data); i++) {
  sum1.push(sumArray(data.map(item => Math.abs(item - i))))
}

console.log('Part One ---', Math.min(...sum1))

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()
const sum2 = []

for (let i = 0; i <= Math.max(...data); i++) {
  sum2.push(sumArray(data.map(item => {
    const distance = Math.abs(item - i)
    return ~~((distance + 1) * distance / 2)
  })))
}

console.log('Part Two ---', Math.min(...sum2))

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
