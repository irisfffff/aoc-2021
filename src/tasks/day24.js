// --- Day 24: Arithmetic Logic Unit ---
// const alu = (step, variables, inputs) => {
//   const instruction = step.split(' ')
//   let var2
//   if (instruction[2] && instruction[2].charCodeAt(0) > 57) {
//     var2 = variables[instruction[2]]
//   } else {
//     var2 = parseInt(instruction[2])
//   }
//   switch (instruction[0]) {
//     case 'inp':
//       variables[instruction[1]] = inputs.shift()
//       break
//     case 'add':
//       variables[instruction[1]] += var2
//       break
//     case 'mul':
//       variables[instruction[1]] *= var2
//       break
//     case 'div':
//       const result = variables[instruction[1]] / var2
//       variables[instruction[1]] = result >= 0 ? Math.floor(result) : Math.ceil(result)
//       break
//     case 'mod':
//       variables[instruction[1]] %= var2
//       break
//     case 'eql':
//       variables[instruction[1]] = +(variables[instruction[1]] === var2)
//       break
//   }
// }
//
// const runALU = (steps, inputs) => {
//   const variables = {
//     w: 0,
//     x: 0,
//     y: 0,
//     z: 0
//   }
//   for (const step of steps) {
//     alu(step, variables, inputs)
//   }
//   // console.log(variables)
//   return variables
// }

// Brute force doesn't work
// let monad = 99999999999999
// while (true) {
//   const inputs = monad.toString().split('').map(item => parseInt(item))
//   // console.log(inputs)
//   if (inputs.every(item => item !== 0)) {
//     const result = runALU(data, inputs)
//     if (result.z === 0) break
//   }
//   monad--
// }
//
// console.log('Part One ---', monad)


const d = [ 1, 1, 1, 1, 26, 1, 1, 26, 1, 26, 26, 26, 26, 26 ]
const a = [ 13, 15, 15, 11, -7, 10, 10, -5, 15, -3, 0, -5, -9, 0 ]
const b = [ 6, 7, 10, 2, 15, 8, 1, 10, 5, 3, 5, 11, 12, 10 ]

const model = new Array(14).fill(9)

// -------- Part One --------

const parseStep1 = (i, z) => {
  let w = 9
  while (true) {
    if (w === 0) return false
    let newZ
    if (d[i] === 26) {
      if (w !== z % 26 + a[i]) {
        w--
        continue
      }
      newZ = Math.floor(z / 26)
    } else {
      newZ = w + b[i] + 26 * z
    }
    if (i === 13) {
      if (newZ === 0) {
        model[i] = w
        return true
      }
      return false
    }

    if (parseStep1(i + 1, newZ)) {
      model[i] = w
      return true
    }
    w--
  }
}

parseStep1(0, 0)

console.log('Part One ---', model.map(i => i.toString()).join(''))


// -------- Part Two --------
const parseStep2 = (i, z) => {
  let w = 1
  while (true) {
    if (w > 9) return false
    let newZ
    if (d[i] === 26) {
      if (w !== z % 26 + a[i]) {
        w++
        continue
      }
      newZ = Math.floor(z / 26)
    } else {
      newZ = w + b[i] + 26 * z
    }
    if (i === 13) {
      if (newZ === 0) {
        model[i] = w
        return true
      }
      return false
    }

    if (parseStep2(i + 1, newZ)) {
      model[i] = w
      return true
    }
    w++
  }
}

parseStep2(0, 0)

console.log('Part Two ---', model.map(i => i.toString()).join(''))
