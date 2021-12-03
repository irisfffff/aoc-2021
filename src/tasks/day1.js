import {readByLine} from '../utils/index.js'

const data = readByLine('../data/day1').slice(0, -1).map(item => parseInt(item))

const calculateIncreased = (arr, diff = 1) => {
  let increased = 0
  for (let i = 0; i <= arr.length - diff; i++) {
    if (arr[i + diff] > arr[i]) increased += 1
  }
  return increased
}

console.log('Part One ---' + calculateIncreased(data, 1))

console.log('Part Two ---' + calculateIncreased(data, 3))

// Part One: 1832
// Part Two: 1858
