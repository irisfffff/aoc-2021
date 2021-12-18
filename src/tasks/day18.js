// --- Day 18: Snailfish ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day18').slice(0, -1)

const parseData = (line) => {
  const result = []
  let nested = 0
  for (let i = 0; i < line.length; i++) {
    switch (line[i]) {
      case '[':
        nested++
        break
      case ',':
        break
      case ']':
        nested--
        break
      default:
        result.push({ level: nested, value: parseInt(line[i]) })
    }
  }
  return result
}

const doAddition = (a, b) => {
  return a.concat(b).map(item =>
    ({ ...item, level: item.level + 1 }))
}

const doExplode = (snailfish, index) => {
  const left = snailfish.slice(0, index)
  const right = snailfish.slice(index + 2)
  if (left.length) {
    left[index - 1].value += snailfish[index].value
  }
  if (right.length) {
    right[0].value += snailfish[index + 1].value
  }
  return [ ...left, {
    level: 4,
    value: 0,
  }, ...right ]
}

const doSplit = (snailfish, index) => {
  const leftValue = Math.floor(snailfish[index].value / 2)
  const rightValue = Math.ceil(snailfish[index].value / 2)
  return [
    ...snailfish.slice(0, index),
    { level: snailfish[index].level + 1, value: leftValue },
    { level: snailfish[index].level + 1, value: rightValue },
    ...snailfish.slice(index + 1),
  ]
}

const parseSnailfish = (snailfish) => {
  while (true) {
    const explodeIndex = snailfish.findIndex(item => item.level === 5)
    if (explodeIndex !== -1) {
      snailfish = doExplode(snailfish, explodeIndex)
      continue
    }
    const splitIndex = snailfish.findIndex(item => item.value >= 10)
    if (splitIndex !== -1) {
      snailfish = doSplit(snailfish, splitIndex)
      continue
    }
    break
  }
  return snailfish
}

const calculateMagnitude = (snailfish) => {
  while (snailfish.length > 2) {
    const maxLevel = Math.max(...snailfish.map(item => item.level))
    const firstMax = snailfish.findIndex(item => item.level === maxLevel)
    if (firstMax !== -1) {
      snailfish = [ ...snailfish.slice(0, firstMax),
        {
          level: maxLevel - 1,
          value: snailfish[firstMax].value * 3 + snailfish[firstMax + 1].value * 2,
        },
        ...snailfish.slice(firstMax + 2) ]
    }
  }
  return snailfish
}

const assignment = data.map(line => parseData(line))

// -------- Part One --------
// let result = assignment.shift()
// while (assignment.length) {
//   result = doAddition(result, assignment.shift())
//   result = parseSnailfish(result)
// }
// result = calculateMagnitude(result)
// console.log('Part One ---', result[0].value * 3 + result[1].value * 2)


// -------- Part Two --------
let maxMagnitude = 0
for (const snailfish1 of assignment) {
  for (const snailfish2 of assignment) {
    const result = calculateMagnitude(parseSnailfish(doAddition(snailfish1, snailfish2)))
    const magnitude = result[0].value * 3 + result[1].value * 2
    maxMagnitude = Math.max(maxMagnitude, magnitude)
  }
}
console.log('Part Two ---', maxMagnitude)
