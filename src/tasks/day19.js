// --- Day 19: Beacon Scanner ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day19')

const beaconsByScanners = []
let currentScanner = []
for (const line of data) {
  if (line.startsWith('---')) {
    currentScanner = []
    continue
  }
  if (line === '') {
    beaconsByScanners.push(currentScanner.slice(0))
    continue
  }
  currentScanner.push(line.split(',').map(item => parseInt(item)))
}

const rotations = [
  [ 1, 2, 3 ],
  [ 1, -3, 2 ],
  [ 1, -2, -3 ],
  [ 1, 3, -2 ],
  [ 2, 3, 1 ],
  [ 2, -1, 3 ],
  [ 2, -3, -1 ],
  [ 2, 1, -3 ],
  [ 3, 1, 2 ],
  [ 3, -2, 1 ],
  [ 3, -1, -2 ],
  [ 3, 2, -1 ],
  [ -1, 3, 2 ],
  [ -1, -2, 3 ],
  [ -1, -3, -2 ],
  [ -1, 2, -3 ],
  [ -2, 1, 3 ],
  [ -2, -3, 1 ],
  [ -2, -1, -3 ],
  [ -2, 3, -1 ],
  [ -3, 2, 1 ],
  [ -3, -1, 2 ],
  [ -3, -2, -1 ],
  [ -3, 1, -2 ],
]

const rotateTo = (beacons, index) => beacons.map(beacon =>
  rotations[index].map(item => beacon[Math.abs(item) - 1] * Math.sign(item))
)

const findPair = (beacons1, beacons2) => {
  let i = 0, rotatedBeacons2
  for (; i < rotations.length; i++) {
    rotatedBeacons2 = rotateTo(beacons2, i)
    for (const ref1 of beacons1) {
      for (const ref2 of rotatedBeacons2) {
        const relative = ref1.map((item, index) => item - ref2[index])
        const overlapCounter = rotatedBeacons2.filter(beacon2 => {
            const newBeacon2 = beacon2.map((item, index) => item + relative[index])
            return beacons1.some(beacon1 => beacon1.every((item, index) => item === newBeacon2[index]))
          }
        ).length
        if (overlapCounter >= 12) {
          const newBeacons2 = rotatedBeacons2.map(beacon => beacon.map((item, index) => item + relative[index]))
          scanners.push(relative)
          return { isPair: true, newBeacons2 }
        }
      }
    }
  }
  return { isPair: false }
}

// -------- Part One --------
// Scanner 0
const scanners = [ [ 0, 0, 0 ] ]
const visited = new Array(beaconsByScanners.length).fill(false)
visited[0] = true
// Start looking for pairs from scanner 0
let queue = [ 0 ]
while (visited.some(item => !item)) {
  const i = queue.shift()
  for (let j = 0; j < beaconsByScanners.length; j++) {
    if (visited[j] || i === j) continue
    const result = findPair(beaconsByScanners[i], beaconsByScanners[j])
    if (result.isPair) {
      console.log({ i, j })
      beaconsByScanners[j] = result.newBeacons2
      visited[j] = true
      queue.push(j)
    }
  }
}

const beacons = []
for (const beaconsByScanner of beaconsByScanners) {
  beaconsByScanner.forEach(beacon => {
    // beacon not in beacons
    if (!beacons.some(ref =>
      ref.every((item, index) => item === beacon[index]))) {
      beacons.push(beacon)
    }
  })
}

console.log('Part One ---', beacons.length)


// -------- Part Two --------
let maxManhattan = 0
for (let i = 0; i < scanners.length; i++) {
  for (let j = i + 1; j < scanners.length; j++) {
    const manhattan = sumArray(scanners[i].map((item, index) => Math.abs(item - scanners[j][index])))
    maxManhattan = Math.max(maxManhattan, manhattan)
  }
}
console.log('Part Two ---', maxManhattan)
