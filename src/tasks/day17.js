// --- Day 17: Trick Shot ---
import {readByLine, sumArray} from '../utils/index.js'

// const data = readByLine('../data/dayu').slice(0, -1)

const targetX = [ 288, 330 ], targetY = [ -96, -50 ]

const parseStep = (x, y, vx, vy) => {
  x += vx
  y += vy
  if (vx > 0) {
    vx--
  } else if (vx < 0) {
    vx++
  }
  vy--
  return { x, y, vx, vy }
}

const isWithinTarget = (x, y) =>
  x >= targetX[0] && x <= targetX[1] && y >= targetY[0] && y <= targetY[1]

// -------- Part One --------
// let maxY = undefined
// for (let i = 5; i < targetX[1]; i++) {
//   for (let j = 70; j < 100; j++) {
//     let x = 0, y = 0, vx = i, vy = j
//     while (!(y < targetY[0] && vy < 0)) {
//       const result = parseStep(x, y, vx, vy)
//       x = result.x
//       y = result.y
//       vx = result.vx
//       vy = result.vy
//       if (isWithinTarget(x, y)) break
//     }
//     if (isWithinTarget(x, y)) {
//       if (maxY === undefined) {
//         console.log(i, j)
//         maxY = ~~(j * (j + 1) / 2)
//       } else {
//         console.log(i, j)
//         maxY = Math.max(maxY, ~~(j * (j + 1) / 2))
//       }
//     }
//   }
// }

// console.log('Part One ---', maxY)


// -------- Part Two --------
let counter = 0
for (let i = 1; i <= targetX[1]; i++) {
  for (let j = targetY[0]; j < 200; j++) {
    let x = 0, y = 0, vx = i, vy = j
    while (!(y < targetY[0] && vy < 0)) {
      const result = parseStep(x, y, vx, vy)
      x = result.x
      y = result.y
      vx = result.vx
      vy = result.vy
      if (isWithinTarget(x, y)) break
    }
    if (isWithinTarget(x, y)) {
      console.log(i, j)
      counter++
    }
  }
}
console.log('Part Two ---', counter)
