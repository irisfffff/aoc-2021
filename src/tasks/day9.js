// --- Day 9: Smoke Basin ---
import {readByLine, sumArray, quickSortRecursive} from '../utils/index.js'

const data = readByLine('../data/day9').slice(0, -1)
  .map(row => row.split('').map(item => parseInt(item)))

// -------- Part One --------
let startTime = process.hrtime()

const rows = data.length
const columns = data[0].length
let sum = 0
const lowPoints = []

const isLower = (point, neighbor) => {
  if (neighbor === undefined) return true
  if (point < neighbor) return true
  return false
}

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const isLowPoint = (data[i - 1] === undefined || isLower(data[i][j], data[i - 1][j]))
      && (data[i + 1] === undefined || isLower(data[i][j], data[i + 1][j]))
      && isLower(data[i][j], data[i][j - 1])
      && isLower(data[i][j], data[i][j + 1])
    if (isLowPoint) {
      lowPoints.push([ i, j ])
      sum += data[i][j] + 1
    }
  }
}
console.log('Part One ---', sum)

const elapsed1 = process.hrtime(startTime)
console.log('Execution time:', elapsed1[0] + 's, ' + (elapsed1[1] / 1000000).toFixed(3) + 'ms')


// -------- Part Two --------
startTime = process.hrtime()

const visited = new Array(rows)
for (let i = 0; i < rows; i++) {
  visited[i] = new Array(columns).fill(false)
}
const queue = []
const bfs = ([ i, j ]) => {
  let size = 0
  queue.push([ i, j, -1 ])
  while (queue.length) {
    const [ i, j, ref ] = queue.shift()
    if (data[i] === undefined || data[i][j] === undefined || visited[i][j]) {
      continue
    }
    const nodeValue = data[i][j]
    if (nodeValue === 9) {
      visited[i][j] = true
      continue
    }
    if (ref < nodeValue && nodeValue !== 9) {
      size++
      visited[i][j] = true
      queue.push([ i - 1, j, nodeValue ], [ i + 1, j, nodeValue ], [ i, j - 1, nodeValue ], [ i, j + 1, nodeValue ])
    }
  }
  return size
}
const basins = lowPoints.map(point => bfs(point))
quickSortRecursive(basins, 0, basins.length - 1)
const l = basins.length
console.log('Part Two ---', basins[l - 1] * basins[l - 2] * basins[l - 3])

const elapsed2 = process.hrtime(startTime)
console.log('Execution time:', elapsed2[0] + 's, ' + (elapsed2[1] / 1000000).toFixed(3) + 'ms')
