// --- Day 16: Packet Decoder ---
import {readByLine, sumArray, multiplyArray} from '../utils/index.js'

const hex2bit = (hex) => {
  return (parseInt(hex, 16).toString(2)).padStart(4, '0')
}

const data = readByLine('../data/day16').slice(0, -1)[0]
  .split('').map(item => hex2bit(item)).join('')

// Packet start relative to the parent packet
// { version: number, typeId: number, subCounter: number, start: number, value?: number }
let packets = []

// Literal value packets length = 6 + 5n + zeros, n >= 1, min 11
// Other packets, lengthTId 0, min 22; lengthTId 1, min 18
// If successful return { newStart } otherwise return { error }
const parsePacket = (parentPacket, start) => {
  const packet = parentPacket.slice(start)
  // Minimal packet length is 11
  if (packet.length < 11) return { error: true }

  const version = parseInt(packet.slice(0, 3), 2)
  const typeId = parseInt(packet.slice(3, 6), 2)

  if (typeId === 4) {
    let i = 6, value = ''
    while (true) {
      if (i >= packet.length) return { error: true }
      const prefix = packet[i]
      value += packet.slice(i + 1, i + 5)
      i += 5
      if (prefix === '0') {
        break
      }
    }
    packets.push({ version, typeId, subCounter: 0, start, value: parseInt(value, 2) })
    return { newStart: start + i }

  } else {
    const lengthTypeId = packet[6]

    let shouldContinue, subPackets, newStart = 0, subCounter = 0, subLength, subNum

    if (lengthTypeId === '0') {
      if (packet.length < 22) return { error: true }
      // Length of all sub-packets
      subLength = parseInt(packet.slice(7, 22), 2)
      if (22 + subLength > packet.length) return { error: true }
      subPackets = packet.slice(22, 22 + subLength)
      shouldContinue = (newStart, subCounter) => newStart < subLength
    } else {
      if (packet.length < 18) return { error: true }
      // Total number of subPackets
      subNum = parseInt(packet.slice(7, 18), 2)
      if (18 + subNum * 11 > packet.length) return { error: true }
      subPackets = packet.slice(18)
      shouldContinue = (newStart, subCounter) => subCounter < subNum && newStart < subPackets.length
    }

    while (shouldContinue(newStart, subCounter)) {
      const result = parsePacket(subPackets, newStart)
      if (result.error && !subCounter) {
        return { error: true }
      }
      if (result.error) {
        const lastSubPacket = packets.pop()
        let totalSubPackets = lastSubPacket.subCounter
        while (totalSubPackets) {
          const subPackets = packets.slice(-totalSubPackets)
          packets = packets.slice(0, packets.length - totalSubPackets)
          totalSubPackets = sumArray(subPackets.map(item => item.subCounter))
        }
        subCounter--
        newStart = lastSubPacket.start
        // Treat it as trailing zero
        if (subPackets[newStart] === '1') return { error: true }
        newStart++
        continue
      }
      subCounter++
      newStart = result.newStart
    }
    if (lengthTypeId === '0') {
      packets.push({ version, typeId, subCounter, start })
      return { newStart: start + 22 + subLength }
    } else {
      if (subCounter === subNum) {
        packets.push({ version, typeId, subCounter, start })
        return { newStart: start + 18 + newStart }
      }
      return { error: true }
    }
  }
}


// -------- Part One --------
parsePacket(data, 0)
console.log('Part One ---', sumArray(packets.map(item => item.version)))


// -------- Part Two --------
const operatePackets = () => {
  const packet = packets.pop()
  let totalSubPackets = packet.subCounter
  let subResults = []
  while (totalSubPackets) {
    subResults.push(operatePackets(packets))
    totalSubPackets--
  }
  switch (packet.typeId) {
    case 0:
      return sumArray(subResults)
    case 1:
      return multiplyArray(subResults)
    case 2:
      return Math.min(...subResults)
    case 3:
      return Math.max(...subResults)
    case 4:
      return packet.value
    case 5:
      return +(subResults[1] > subResults[0])
    case 6:
      return +(subResults[1] < subResults[0])
    case 7:
      return +(subResults[1] === subResults[0])
  }
}
console.log('Part Two ---', operatePackets())
