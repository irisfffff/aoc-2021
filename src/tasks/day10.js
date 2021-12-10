// --- ??? ---
import {readByLine, sumArray, quickSortRecursive} from '../utils/index.js'

const data = readByLine('../data/day10').slice(0, -1)

const chunkStarts = [ '(', '[', '{', '<' ]
const chunkEnds = [ ')', ']', '}', '>' ]
const illegalPoints = [ 3, 57, 1197, 25137 ]

const parseLine = (line) => {
  const stack = []
  for (let i = 0; i < line.length; i++) {
    if (chunkStarts.includes(line[i])) {
      stack.push(chunkStarts.findIndex(item => item === line[i]))
    } else if (chunkEnds.includes(line[i])) {
      const closingIndex = chunkEnds.findIndex(item => item === line[i])
      const openChunkIndex = stack.pop()
      if (closingIndex !== openChunkIndex) {
        return { illegalPoint: illegalPoints[closingIndex], stack: undefined }
      }
    }
  }
  return { illegalPoint: 0, stack }
}

// -------- Part One --------

console.log('Part One ---', sumArray(data.map(line => parseLine(line).illegalPoint)))


// -------- Part Two --------
const calculateAutocompletePoints = (pre, cur) => {
  return pre * 5 + (cur + 1)
}
const autoCompletePoints = []
data.forEach(line => {
  const { illegalPoint, stack } = parseLine(line)
  if (!illegalPoint && stack) {
    const reversed = stack.reverse()
    autoCompletePoints.push(reversed.reduce(calculateAutocompletePoints, 0))
  }
})

quickSortRecursive(autoCompletePoints, 0, autoCompletePoints.length - 1)

console.log('Part Two ---', autoCompletePoints[~~((autoCompletePoints.length - 1) / 2)])
