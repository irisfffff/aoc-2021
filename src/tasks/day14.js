// --- Day 14: Extended Polymerization ---
import {readByLine, sumArray, quickSortRecursive} from '../utils/index.js'

const data = readByLine('../data/day14').slice(0, -1)

const template = data[0]
const instructions = {}
data.slice(2).forEach(line => {
  const [ key, value ] = line.split(' -> ')
  instructions[key] = { insert: value, counter: 0, next: [] }
})

// -------- Part One --------
// Original solution: updating string for every step -> too slow

// let steps = 10
// let result = template
// const processStep = (preResult) => {
//   let newResult = ''
//   let preIdx = 0
//   for (let i = 0; i < preResult.length - 1; i++) {
//     const pair = preResult[i] + preResult[i + 1]
//     if (pair in instructions) {
//       newResult = newResult.concat(preResult.slice(preIdx, i + 1), instructions[pair].insert)
//       preIdx = i + 1
//     }
//   }
//   newResult = newResult.concat(preResult.slice(preIdx))
//   return newResult
// }
//
// do {
//   result = processStep(result)
//   steps--
// } while (steps > 0)
//
// const counter = {}
// for (let i = 65; i <= 90; i++) {
//   counter[String.fromCharCode(i)] = 0
// }
// result.split('').forEach(item => {
//   counter[item] += 1
// })
//
// const occurrences = Object.values(counter).filter(item => item !== 0)
// quickSortRecursive(occurrences, 0, occurrences.length - 1)
//
// console.log('Part One ---', occurrences[occurrences.length - 1] - occurrences[0])


// -------- Part Two --------

let startTime = process.hrtime()

Object.keys(instructions).forEach(pair => {
  const pair1 = pair[0] + instructions[pair].insert
  const pair2 = instructions[pair].insert + pair[1]
  // All character combinations exist
  instructions[pair].next.push(pair1)
  instructions[pair].next.push(pair2)
})

const charCounter = {}
for (let i = 65; i <= 90; i++) {
  charCounter[String.fromCharCode(i)] = 0
}
template.split('').forEach(item => {
  charCounter[item] += 1
})
for (let i = 0; i <= template.length - 2; i++) {
  const pair = template[i] + template[i + 1]
  instructions[pair].counter += 1
}
let steps = 40
do {
  Object.values(instructions).forEach(({ insert, counter }) => {
    charCounter[insert] += counter
  })
  const newInstructionCounters = {}
  Object.keys(instructions).forEach(pair => {
    newInstructionCounters[pair] = 0
  })
  Object.entries(instructions).forEach(([ pair, { counter, next: [ pair1, pair2 ] } ]) => {
    newInstructionCounters[pair1] += counter
    newInstructionCounters[pair2] += counter
  })
  Object.keys(instructions).forEach(pair => {
    instructions[pair].counter = newInstructionCounters[pair]
  })
  steps--
} while (steps > 0)

const occurrences = Object.values(charCounter).filter(item => item !== 0)
quickSortRecursive(occurrences, 0, occurrences.length - 1)

console.log('Part Two ---', occurrences[occurrences.length - 1] - occurrences[0])

const elapsed = process.hrtime(startTime)
console.log('Execution time:', elapsed[0] + 's, ' + (elapsed[1] / 1000000).toFixed(3) + 'ms')
