// --- Day 15: Chiton ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day15').slice(0, -1)
  .map(line => line.split('').map(item => parseInt(item)))

const findShortestPath = (totalRisk, graph, queue) => {
  const width = graph.length

  // Sort recently updated nodes by risk value
  queue.sort((ele1, ele2) => ele1.value - ele2.value)
  const { value: minRisk, i, j } = queue.shift()


  const neighbors = [ [ -1, 0 ], [ 1, 0 ], [ 0, -1 ], [ 0, 1 ] ]
  neighbors.forEach(([ a, b ]) => {
    const ii = i + a, jj = j + b
    if (ii < 0 || ii >= width || jj < 0 || jj >= width) return
    const newRisk = minRisk + graph[ii][jj]
    const oldRisk = totalRisk[ii][jj]
    if (newRisk < oldRisk) {
      totalRisk[ii][jj] = newRisk
      if (oldRisk === Infinity) {
        queue.push({ value: totalRisk[ii][jj], i: ii, j: jj })
      } else {
        const findNeighbor = queue.findIndex(item => item.i === ii && item.j === jj)
        queue[findNeighbor].value = totalRisk[ii][jj]
      }
    }
  })
}

const dijkstra = (graph) => {
  const width = graph.length
  const totalRisk = new Array(width).fill(0).map(() => new Array(width).fill(Infinity))
  totalRisk[0][0] = 0

  const queue = []
  queue.push({ value: 0, i: 0, j: 0 })
  do {
    findShortestPath(totalRisk, graph, queue)
  } while (queue.length)
  return totalRisk
}


// -------- Part One --------
const totalRisk1 = dijkstra(data)
console.log('Part One ---', totalRisk1[data.length - 1][data.length - 1])


// -------- Part Two --------
const buildNewTile = (delta) => {
  return new Array(data.length).fill(0).map((item, index) => data[index].slice().map(item => {
    const value = item + delta
    return (value - 1) % 9 + 1
  }))
}

const buildEntireCave = () => {
  let entireCave = []
  for (let i = 0; i < 5; i++) {
    let newRow = buildNewTile(i)
    for (let j = 1; j < 5; j++) {
      const newTile = buildNewTile(i + j)
      newRow = newRow.map((row, index) => row.concat(newTile[index]))
    }
    entireCave = [ ...entireCave, ...newRow ]
  }
  return entireCave
}
const entireCave = buildEntireCave()
const totalRisk2 = dijkstra(entireCave)
console.log('Part Two ---', totalRisk2[entireCave.length - 1][entireCave.length - 1])
