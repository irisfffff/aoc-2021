// ** Pilot submarine **
import {readByLine} from '../utils/index.js'

const data = readByLine('../data/day2').slice(0, -1).map(item => item.split(' '))

// -------- Part One --------
let startTime = process.hrtime()

let pos = 0, depth = 0
data.forEach(([ move, x ]) => {
  const amount = parseInt(x)
  switch
    (move) {
    case 'forward'
    :
      pos += amount
      break
    case 'down'
    :
      depth += amount
      break
    case 'up'
    :
      depth -= amount
      break
    default:
      break
  }
})

console.log('Part One ---', 'Pos:', pos, 'Depth:', depth, 'Multiply:', pos * depth)

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()

pos = 0
depth = 0
let aim = 0

data.forEach(([ move, x ]) => {
  const amount = parseInt(x)
  switch (move) {
    case 'forward':
      pos += amount
      depth = depth + aim * amount
      break
    case 'down':
      aim += amount
      break
    case 'up':
      aim -= amount
      break
    default:
      break
  }
})

console.log('Part Two ---', 'Pos:', pos, 'Depth:', depth, 'Multiply:', pos * depth)

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
