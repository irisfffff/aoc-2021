// --- Day 8: Seven Segment Search ---
import {readByLine, sumArray} from '../utils/index.js'

let data = readByLine('../data/day8').slice(0, -1)


// -------- Part One --------
const appearances = data.map(entry => {
  let [ pattern, output ] = entry.split('|').map(item => item.trim().split(' '))
  return output.filter(item => [ 2, 3, 4, 7 ].includes(item.length)).length
})
console.log('Part One ---', sumArray(appearances))


// -------- Part Two --------
const findNumber = (pattern, number) => {
  return pattern.findIndex(item => item.length === number.length && number.split('').every(ele => item.includes(ele)))
}

const results = data.map(entry => {
  let [ pattern, output ] = entry.split('|').map(item => item.trim().split(' '))
  const one = pattern.find(item => item.length === 2)
  const seven = pattern.find(item => item.length === 3)
  const four = pattern.find(item => item.length === 4)
  const eight = pattern.find(item => item.length === 7)
  const three = pattern.find(item => item.length === 5 && one.split('').every(ele => item.includes(ele)))
  const nine = pattern.find(item => item.length === 6 && four.split('').every(ele => item.includes(ele)))
  const e = eight.split('').find(ele => !nine.includes(ele))
  const zero = pattern.find(item => item.length === 6 && item !== nine && one.split('').every(ele => item.includes(ele)))
  const six = pattern.find(item => item.length === 6 && item !== nine && item !== zero)
  const two = pattern.find(item => item.length === 5 && item !== three && item.includes(e))
  const five = pattern.find(item => item.length === 5 && item !== three && !item.includes(e))

  const result = output.map(item => findNumber([ zero, one, two, three, four, five, six, seven, eight, nine ], item))
  return parseInt(result.join(''))
})
console.log('Part Two ---', sumArray(results))
