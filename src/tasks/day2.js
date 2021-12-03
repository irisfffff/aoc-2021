import {readByLine} from '../utils/index.js'

const data = readByLine('../data/day2').slice(0, -1)

let pos = 0, depth = 0

data.forEach(item => {
  const [move, amount] = item.split(' ')
  switch (move) {
    case 'forward':
      pos += parseInt(amount)
      break
    case 'down':
      depth += parseInt(amount)
      break
    case 'up':
      depth -= parseInt(amount)
      break
    default:
      break
  }
})

console.log('Part One ---', 'Pos:', pos, 'Depth:', depth, 'Multiply:', pos * depth)

pos = 0
depth = 0
let aim = 0

data.forEach(item => {
  const arr = item.split(' ')
  const amount = parseInt(arr[1])
  switch (arr[0]) {
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
