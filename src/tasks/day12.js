// --- ??? ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day12').slice(0, -1)
  .map(line => line.split('-'))

const connections = {}
data.forEach(([ a, b ]) => {
  if (a in connections) {
    connections[a].push(b)
  } else {
    connections[a] = [ b ]
  }
  if (b in connections) {
    connections[b].push(a)
  } else {
    connections[b] = [ a ]
  }
})


const isSmallCave = (cave) =>
  cave.split('').every(item => item >= 'a' && item <= 'z')

// Visit small caves at most once
const dfs1 = () => {
  const queue = []
  let paths = 0
  queue.push([ ...connections['start'] ])
  let path = [ 'start' ]
  while (queue.length) {
    if (!queue[queue.length - 1].length) {
      queue.pop()
      path.pop()
      continue
    }

    const cave = queue[queue.length - 1].pop()
    if (cave === 'start' || (isSmallCave(cave) && path.includes(cave))) continue
    if (cave === 'end') {
      paths++
      continue
    }
    path.push(cave)
    queue.push([ ...connections[cave] ])
  }
  return paths
}

let sum = dfs1()

// -------- Part One --------
console.log('Part One ---', sum)


// -------- Part Two --------

// Paths that visit a specific small cave twice
const dfs2 = (canVisitTwice) => {
  const queue = []
  let paths = 0
  queue.push([ ...connections['start'] ])
  let path = [ 'start' ]
  while (queue.length) {
    if (!queue[queue.length - 1].length) {
      queue.pop()
      path.pop()
      continue
    }

    const cave = queue[queue.length - 1].pop()
    if (cave === 'start' || (isSmallCave(cave) && (cave !== canVisitTwice && path.includes(cave))
      || (cave === canVisitTwice && path.filter(item => item === cave).length === 2))) continue
    if (cave === 'end') {
      if (path.filter(item => item === canVisitTwice).length === 2) {
        paths++
      }
      continue
    }
    path.push(cave)
    queue.push([ ...connections[cave] ])
  }
  return paths
}
Object.keys(connections).forEach(item => {
  if (item !== 'start' && item !== 'end' && isSmallCave(item)) {
    sum += dfs2(item)
  }
})
console.log('Part Two ---', sum)
