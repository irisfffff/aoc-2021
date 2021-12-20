// --- Day 20: Trench Map ---
import {readByLine, sumArray} from '../utils/index.js'

const data = readByLine('../data/day20').slice(0, -1)

const algorithm = data[0]
const input = data.slice(2)

const processImage = (image, defaultPixel) => {
  const extendedImage = new Array(image.length + 4).fill(defaultPixel)
    .map(() => new Array(image[0].length + 4).fill(defaultPixel))

  for (let i = 0; i < image.length; i++) {
    extendedImage[i + 2].splice(2, image[0].length, ...image[i])
  }

  const newImage = new Array(image.length + 2).fill('.')
    .map(() => new Array(image[0].length + 2).fill('.'))

  for (let i = 1; i < extendedImage.length - 1; i++) {
    for (let j = 1; j < extendedImage[0].length - 1; j++) {
      const pixel = [
        ...extendedImage[i - 1].slice(j - 1, j + 2),
        ...extendedImage[i].slice(j - 1, j + 2),
        ...extendedImage[i + 1].slice(j - 1, j + 2),
      ]
      const decimal = parseInt(pixel.map(item => item === '#' ? '1' : '0').join(''), 2)
      newImage[i - 1][j - 1] = algorithm[decimal]
    }
  }
  const newDefault = defaultPixel === '.' ? algorithm[0] : algorithm[511]
  return { newImage, newDefault }
}

// -------- Part One --------
// First time extending with dark pixel '.'
// let defaultPixel = '.'
// const result1 = processImage(input, defaultPixel)
// const result2 = processImage(result1.newImage, result1.newDefault)
// console.log('Part One ---', sumArray(result2.newImage.map(row => row.filter(item => item === '#').length)))


// -------- Part Two --------
let steps = 50, result = { newImage: input, newDefault: '.' }
while (steps) {
  result = processImage(result.newImage, result.newDefault)
  steps--
}
console.log('Part Two ---', sumArray(result.newImage.map(row => row.filter(item => item === '#').length)))
