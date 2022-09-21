import Jimp from 'jimp/es'

// https://stackoverflow.com/a/10142256/12055600
const shuffleArray = arr => {
  let i = arr.length
  let j
  let temp

  if (i === 0) {
    return arr
  }

  while (--i) {
    j = Math.floor(Math.random() * (i + 1))
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  return arr
}

export const serializeGridData = gridData => gridData.flat().flat().flat().join('')

export const binaryStringToHexStringWithLeftovers = binaryString => {
  let hexStringWithLeftovers = ''

  for (let i = 0; i < binaryString.length; i += 4) {
    const nibble = binaryString.substring(i, i + 4)

    if (nibble.length === 4) {
      hexStringWithLeftovers += parseInt(nibble, 2).toString(16).toUpperCase()
    } else {
      hexStringWithLeftovers += '_' + nibble
    }
  }

  return hexStringWithLeftovers
}

export const hexStringWithLeftoversToBinaryString = hexStringWithLeftovers => {
  const [hexString, leftovers] = hexStringWithLeftovers.split('_')

  return hexString.split('').map(digit => parseInt(digit, 16).toString(2).padStart(4, '0')).join('') + leftovers
}

export const generateGrid = (gridSize, subGridSize, serializedGridData) => {
  const gridData = []
  let count = 0

  for (let gridY = 0; gridY < gridSize; gridY++) {
    const gridRow = []

    for (let gridX = 0; gridX < gridSize; gridX++) {
      const subGridData = []

      for (let subGridY = 0; subGridY < subGridSize; subGridY++) {
        const subGridRow = []

        for (let subGridX = 0; subGridX < subGridSize; subGridX++) {
          const value = (serializedGridData) ? serializedGridData[count] : '0'
          subGridRow.push((value === '1') ? 1 : 0)
          count++
        }

        subGridData.push(subGridRow)
      }

      gridRow.push(subGridData)
    }

    gridData.push(gridRow)
  }

  return gridData
}

export const generateCoordinatesOrder = gridSize => {
  const coordinatesOrder = []

  for (let gridY = 0; gridY < gridSize; gridY++) {
    for (let gridX = 0; gridX < gridSize; gridX++) {
      coordinatesOrder.push({
        x: gridX,
        y: gridY
      })
    }
  }

  return shuffleArray(coordinatesOrder)
}

export const jimpToSerializedGridData = (jimpFile, gridSize, subGridSize) => {
  let serializedGridData = ''
  const { width, height } = jimpFile.bitmap
  const gridWidthAndHeight = gridSize * subGridSize

  if (gridWidthAndHeight !== width || gridWidthAndHeight !== height) {
    // This should never be thrown.
    throw new Error('Invalid image size.')
  }

  for (let gridY = 0; gridY < gridSize; gridY++) {
    for (let gridX = 0; gridX < gridSize; gridX++) {
      for (let subGridY = 0; subGridY < subGridSize; subGridY++) {
        for (let subGridX = 0; subGridX < subGridSize; subGridX++) {
          const x = gridX * subGridSize + subGridX
          const y = gridY * subGridSize + subGridY
          const { r, g, b, a } = Jimp.intToRGBA(jimpFile.getPixelColor(x, y))
          const rgb = r + g + b
          const value = (rgb >= ((255 + 255 + 255) / 2) || a === 0) ? '0' : '1'
          serializedGridData += value
        }
      }
    }
  }

  return serializedGridData
}

export const gridDataToJimp = (gridData, filledColor, emptyColor) => {
  const serializedGridData = serializeGridData(gridData)
  const gridSize = gridData.length
  const subGridSize = gridData[0][0].length
  const gridWidthAndHeight = gridSize * subGridSize

  const jimpFile = new Jimp(gridWidthAndHeight, gridWidthAndHeight)
  let count = 0

  for (let gridY = 0; gridY < gridSize; gridY++) {
    for (let gridX = 0; gridX < gridSize; gridX++) {
      for (let subGridY = 0; subGridY < subGridSize; subGridY++) {
        for (let subGridX = 0; subGridX < subGridSize; subGridX++) {
          const x = gridX * subGridSize + subGridX
          const y = gridY * subGridSize + subGridY
          const { r, g, b } = Jimp.intToRGBA((serializedGridData[count] === '1') ? filledColor : emptyColor)

          jimpFile.setPixelColor(Jimp.rgbaToInt(r, g, b, 255), x, y)

          count++
        }
      }
    }
  }

  return jimpFile
}

export const getXLabelValues = (x, game, gridData, gridSize) => {
  if (!game || game === 'classic') {
    return ['ABCDEFGHIJK'[x]]
  } else if (game === 'nonogram') {
    const labelValues = []
    let continuousCells = 0

    for (let gridY = 0; gridY < gridSize; gridY++) {
      if (gridData[gridY][x][0][0]) {
        continuousCells++
      } else {
        if (continuousCells) {
          labelValues.push(continuousCells)
        }

        continuousCells = 0
      }
    }

    if (continuousCells !== 0) {
      labelValues.push(continuousCells)
    } else if (labelValues.length === 0) {
      labelValues.push(0)
    }

    return labelValues
  }
}

export const getYLabel = (y, game, gridData, gridSize) => {
  if (!game || game === 'classic') {
    return y + 1
  } else if (game === 'nonogram') {
    const labelValues = []
    let continuousCells = 0

    for (let gridX = 0; gridX < gridSize; gridX++) {
      if (gridData[y][gridX][0][0]) {
        continuousCells++
      } else {
        if (continuousCells) {
          labelValues.push(continuousCells)
        }

        continuousCells = 0
      }
    }

    if (continuousCells !== 0) {
      labelValues.push(continuousCells)
    } else if (labelValues.length === 0) {
      labelValues.push(0)
    }

    return labelValues.join(',')
  }
}

export const decimalToHex = dec => `#${dec.toString(16).toUpperCase().padStart(6, '0')}`
export const getCoordinateLabel = (x, y) => getXLabelValues(x)[0] + getYLabel(y)
