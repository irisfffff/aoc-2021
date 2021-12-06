// --- ??? ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day6').slice(0, -1)[0]
  .split(',').map(item => parseInt(item))

const fishArray = new Array(9).fill(0)

const newDayFish = (arr) => {
  const birth = arr[0]
  for (let i = 0; i < 8; i++) {
    arr[i] = arr[i + 1]
  }
  arr[6] += birth
  arr[8] = birth
}

// -------- Part One --------
// let startTime = process.hrtime()
// data.forEach(item => fishArray[item]++)
// let days = 80
// for (; days > 0; days--) {
//   newDayFish(fishArray)
// }
//
// console.log('Part One ---', sumArray(fishArray))
//
// const elapsed1 = process.hrtime(startTime)
// console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
let startTime = process.hrtime()
data.forEach(item => fishArray[item]++)
let days = 256
for (; days > 0; days--) {
  newDayFish(fishArray)
}
console.log('Part Two ---', sumArray(fishArray))

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
