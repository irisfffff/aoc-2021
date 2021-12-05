// --- Day 3: Binary Diagnostic ---
import {readByLine} from '../utils/index.js'

const data = readByLine('../data/day3').slice(0, -1)

const countGamma = (i, data) => {
  let count0 = 0, count1 = 0
  data.forEach(item => {
    item[i] === '1' ? count1++ : count0++
  })
  return count1 >= count0 ? '1' : '0'
}

const countEpsilon = (i, data) => {
  let count0 = 0, count1 = 0
  data.forEach(item => {
    item[i] === '1' ? count1++ : count0++
  })
  return count1 < count0 ? '1' : '0'
}

// -------- Part One --------
let startTime = process.hrtime()

let gamma = '', epsilon = ''
for (let i = 0; i < data[0].length; i++) {
  gamma = gamma.concat(countGamma(i, data))
  epsilon = epsilon.concat(countEpsilon(i, data))
}

console.log({ gamma, epsilon })
console.log('Part One ---', parseInt(gamma, 2) * parseInt(epsilon, 2))

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()

const filterData = (i, data, value) => {
  return data.filter(item => item[i] === value)
}

let oxygen = data, co2 = data, i = 0
do {
  oxygen = filterData(i, oxygen, countGamma(i, oxygen))
  i++
} while (oxygen.length > 1)

i = 0
do {
  co2 = filterData(i, co2, countEpsilon(i, co2))
  i++
} while (co2.length > 1)

console.log({ oxygen: oxygen[0], co2: co2[0] })
console.log('Part Two ---', parseInt(oxygen[0], 2) * parseInt(co2[0], 2))

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
