// --- Day 7: The Treachery of Whales ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day7').slice(0, -1)[0]
  .split(',').map(item => parseInt(item))


// -------- Part One --------
const sum1 = []

for (let i = 0; i <= Math.max(...data); i++) {
  sum1.push(sumArray(data.map(item => Math.abs(item - i))))
}

console.log('Part One ---', Math.min(...sum1))


// -------- Part Two --------
const sum2 = []

for (let i = 0; i <= Math.max(...data); i++) {
  sum2.push(sumArray(data.map(item => {
    const distance = Math.abs(item - i)
    return ~~((distance + 1) * distance / 2)
  })))
}

console.log('Part Two ---', Math.min(...sum2))
