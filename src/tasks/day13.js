// --- ??? ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day13').slice(0, -1)

const size = 1500
const graph = new Array(size).fill('.').map(line => new Array(size).fill('.'))

let maxX = 0, maxY = 0
let i = 0
for (; data[i] !== ''; i++) {
  const [ x, y ] = data[i].split(',').map(item => parseInt(item))
  maxX = Math.max(maxX, x)
  maxY = Math.max(maxY, y)
  graph[y][x] = '#'
}

const folding = []
i++
for (; i < data.length; i++) {
  const line = data[i].split(' ')
  const [ dir, val ] = line[line.length - 1].split('=')
  folding.push([ dir, parseInt(val) ])
}

const foldY = (y) => {
  if (y >= maxY / 2) {
    for (let i = 1; i <= maxY - y; i++) {
      for (let j = 0; j <= maxX; j++) {
        graph[y - i][j] = graph[y - i][j] === '#' || graph[y + i][j] === '#' ? '#' : '.'
      }
    }
    maxY = y - 1
  } else {
    for (let i = 1; i <= maxY - y; i++) {
      for (let j = 0; j <= maxX; j++) {
        graph[y + i][j] = graph[y - i][j] === '#' || graph[y + i][j] === '#' ? '#' : '.'
      }
    }
    for (let i = 0; i < maxY - y; i++) {
      graph[i] = graph[maxY - i]
    }
    maxY = maxY - y - 1
  }
}

const foldX = (x) => {
  if (x >= maxX / 2) {
    for (let j = 1; j <= maxX - x; j++) {
      for (let i = 0; i <= maxY; i++) {
        graph[i][x - j] = graph[i][x - j] === '#' || graph[i][x + j] === '#' ? '#' : '.'
      }
    }
    maxX = x - 1
  } else {
    for (let j = 1; j <= maxX - x; j++) {
      for (let i = 0; i <= maxY; i++) {
        graph[i][x + j] = graph[i][x - j] === '#' || graph[i][x + j] === '#' ? '#' : '.'
      }
    }
    for (let i = 0; i <= maxY; i++) {
      graph[i] = graph[i].slice(x + 1).reverse()
    }
    maxX = maxX - x - 1
  }
}

// -------- Part One --------
// if (folding[0][0] === 'x') {
//   foldX(folding[0][1])
// } else {
//   foldY(folding[0][1])
// }
// const countDots = () => sumArray(graph.slice(0, maxY + 1).map(line => line.slice(0, maxX + 1).filter(item => item === '#').length))
// console.log('Part One ---', countDots())


// -------- Part Two --------
folding.forEach(([ dir, val ]) => {
  if (dir === 'x') {
    foldX(val)
  } else {
    foldY(val)
  }
})

console.log('Part Two ---')
graph.slice(0, maxY + 1).forEach(line => {
  console.log(line.slice(0, maxX + 1).join(''))
})
