// --- Day 7: The Treachery of Whales ---
import {readByLine, sumArray, quickSortRecursive} from '../utils/index.js'

const data = readByLine('../data/day7').slice(0, -1)[0]
  .split(',').map(item => parseInt(item))


// -------- Part One --------
let startTime = process.hrtime()

// --- Original brute force solution ---
// const sum1 = []
//
// for (let i = 0; i <= Math.max(...data); i++) {
//   sum1.push(sumArray(data.map(item => Math.abs(item - i))))
// }
//
// console.log('Part One ---', Math.min(...sum1))

// --- Using medium ---
quickSortRecursive(data, 0, data.length - 1)
const pos = data.length % 2 ? data[~~(data.length / 2)] : Math.round((data[~~(data.length / 2) - 1] + data[~~(data.length / 2)]) / 2)
console.log('Part One ---', sumArray(data.map(item => Math.abs(item - pos))))

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()

// --- Original brute force solution ---
// const sum2 = []
//
// for (let i = 0; i <= Math.max(...data); i++) {
//   sum2.push(sumArray(data.map(item => {
//     const distance = Math.abs(item - i)
//     return ~~((distance + 1) * distance / 2)
//   })))
// }
//
// console.log('Part Two ---', Math.min(...sum2))

// --- Solution based on: https://www.reddit.com/r/adventofcode/comments/rawxad/2021_day_7_part_2_i_wrote_a_paper_on_todays/?utm_source=share&utm_medium=ios_app&utm_name=iossmf ---
const calculateFuel2 = (data, k) =>
  sumArray(data.map(item => {
    const distance = Math.abs(item - k)
    return ~~((distance + 1) * distance / 2)
  }))

const k1 = Math.round(sumArray(data) / data.length - 0.5)
const k2 = Math.round(sumArray(data) / data.length + 0.5)

console.log('Part Two ---', Math.min(calculateFuel2(data, k1), calculateFuel2(data, k2)))

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
