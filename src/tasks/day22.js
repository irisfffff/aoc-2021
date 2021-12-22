// --- Day 22: Reactor Reboot ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day22').slice(0, -1).map((line => {
  const match = line.match(/-?[0-9]+/g).map(item => parseInt(item))
  return { isOn: line.startsWith('on'), cuboid: match }
}))


// -------- Part One --------
// Brute force solution to operate each cube, ok for the scope of task1
const width = 101
const min = -50, max = 50
const cubes = new Array(width).fill(false)
  .map(() => new Array(width).fill(false)
    .map(() => new Array(width).fill(false)))
data.forEach(step => {
  const [ x1, x2, y1, y2, z1, z2 ] = step.cuboid
  if (x1 > max || x2 < min || y1 > max || y2 < min || z1 > max || z2 < min) return

  for (let i = Math.max(x1, min); i <= x2; i++) {
    for (let j = Math.max(y1, min); j <= y2; j++) {
      for (let k = Math.max(z1, min); k <= z2; k++) {
        cubes[i + 50][j + 50][k + 50] = step.isOn
      }
    }
  }
})
console.log('Part One ---', cubes.map(item => item.flat()).flat().filter(item => item).length)


// -------- Part Two --------
const calculateOverlap = (cuboid1, cuboid2) => {
  const [ x11, x12, y11, y12, z11, z12 ] = cuboid1
  const [ x21, x22, y21, y22, z21, z22 ] = cuboid2
  const x1 = Math.max(x11, x21)
  const x2 = Math.min(x12, x22)
  const y1 = Math.max(y11, y21)
  const y2 = Math.min(y12, y22)
  const z1 = Math.max(z11, z21)
  const z2 = Math.min(z12, z22)
  if (x1 <= x2 && y1 <= y2 && z1 <= z2) {
    return [ x1, x2, y1, y2, z1, z2 ]
  }
  return undefined
}

const calculateResult = () => {
  const onVolume = onCuboids.length ? sumArray(onCuboids.map(([ x1, x2, y1, y2, z1, z2 ]) => (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1))) : 0
  const overlapVolume = overlaps.length ? sumArray(overlaps.map(([ x1, x2, y1, y2, z1, z2 ]) => (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1))) : 0
  return onVolume - overlapVolume
}

const onCuboids = []
const overlaps = []
for (const cuboid of data) {
  const newOverlaps = [], newOnCuboids = []
  // For both on and off
  for (const onCuboid of onCuboids) {
    const result = calculateOverlap(cuboid.cuboid, onCuboid)
    if (result) newOverlaps.push(result)
  }
  for (const overlap of overlaps) {
    const result = calculateOverlap(cuboid.cuboid, overlap)
    if (result) newOnCuboids.push(result)
  }
  if (newOnCuboids.length) onCuboids.push(...newOnCuboids)
  if (newOverlaps.length) overlaps.push(...newOverlaps)
  if (cuboid.isOn) {
    onCuboids.push(cuboid.cuboid)
  }
}
const result = calculateResult()
console.log('Part Two ---', result)
