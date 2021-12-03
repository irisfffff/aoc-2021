import { readFileSync } from 'fs'
// const readline = require('readline');

export const readByLine = (filename) => {
    return readFileSync(filename).toString().split(/\n/)
}
