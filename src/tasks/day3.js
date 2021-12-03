import {readByLine} from '../utils/index.js'

const data = readByLine('../data/day3').slice(0, -1)

const countGamma = (i, data) => {
  let count0 = 0, count1 = 0
  data.forEach(item => {
    parseInt(item[i]) ? count1++ : count0++
  })
  return count1 >= count0 ? '1' : '0'
}

const countEpsilon = (i, data) => {
  let count0 = 0, count1 = 0
  data.forEach(item => {
    parseInt(item[i]) ? count1++ : count0++
  })
  return count1 < count0 ? '1' : '0'
}


let gamma = '', epsilon = ''
for (let i = 0; i < data[0].length; i++) {
  gamma = gamma.concat(countGamma(i, data))
  epsilon = epsilon.concat(countEpsilon(i, data))
}

console.log({ gamma, epsilon })
console.log('Part One ---', parseInt(gamma, 2) * parseInt(epsilon, 2))

const filterGamma = (i, data) => {
  const gamma = countGamma(i, data)
  return data.filter(item => item[i] === gamma)
}

const filterEpsilon = (i, data) => {
  const epsilon = countEpsilon(i, data)
  return data.filter(item => item[i] === epsilon)
}

let oxygen = data, co2 = data, i = 0
do {
  oxygen = filterGamma(i, oxygen)
  i++
} while (oxygen.length > 1)

i = 0
do {
  co2 = filterEpsilon(i, co2)
  i++
} while (co2.length > 1)

console.log({ oxygen: oxygen[0], co2: co2[0] })
console.log('Part Two ---', parseInt(oxygen[0], 2) * parseInt(co2[0], 2))
