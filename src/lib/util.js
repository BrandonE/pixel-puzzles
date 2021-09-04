import Jimp from 'jimp/es'

// https://stackoverflow.com/a/10142256/12055600
export const shuffleArray = arr => {
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

export const decimalToHex = dec => `#${dec.toString(16).toUpperCase().padStart(6, '0')}`
export const getXLabel = x => 'ABCDEFGHIJK'[x]
export const getYLabel = y => y + 1
export const getCoordinateLabel = (x, y) => getXLabel(x) + getYLabel(y)
