import Jimp from 'jimp/es'

// https://stackoverflow.com/a/10142256/12055600
export const shuffleArray = (arr) => {
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

export const generateGrid = (size, serializedGridData) => {
  const gridData = []
  let count = 0

  for (let gridY = 0; gridY < size; gridY++) {
    const gridRow = []

    for (let gridX = 0; gridX < size; gridX++) {
      const subGridData = []

      for (let subGridY = 0; subGridY < size; subGridY++) {
        const subGridRow = []

        for (let subGridX = 0; subGridX < size; subGridX++) {
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

export const generateCoordinatesOrder = size => {
  const coordinatesOrder = []

  for (let gridY = 0; gridY < size; gridY++) {
    for (let gridX = 0; gridX < size; gridX++) {
      coordinatesOrder.push({
        x: gridX,
        y: gridY
      })
    }
  }

  return shuffleArray(coordinatesOrder)
}

export const jimpToSerializedGridData = jimpFile => {
  let serializedGridData = ''
  const { width, height } = jimpFile.bitmap
  const size = Math.sqrt(Math.sqrt(width * height))

  if (size % 1 !== 0) {
    // This should never be thrown.
    throw new Error('Invalid image size.')
  }

  for (let gridY = 0; gridY < size; gridY++) {
    for (let gridX = 0; gridX < size; gridX++) {
      for (let subGridY = 0; subGridY < size; subGridY++) {
        for (let subGridX = 0; subGridX < size; subGridX++) {
          const x = gridX * size + subGridX
          const y = gridY * size + subGridY
          const { r, g, b, a } = Jimp.intToRGBA(jimpFile.getPixelColor(x, y))
          const rgb = r * g * b
          const value = (rgb >= ((255 * 255 * 255) / 2) || a === 0) ? '0' : '1'
          serializedGridData += value
        }
      }
    }
  }

  return serializedGridData
}

export const serializedGridDataToJimp = (serializedGridData, filledColor, emptyColor) => {
  const widthAndHeight = Math.sqrt(serializedGridData.length)
  const size = Math.sqrt(widthAndHeight)

  if (size % 1 !== 0) {
    // This should never be thrown.
    throw new Error('Invalid image size.')
  }

  const jimpFile = new Jimp(widthAndHeight, widthAndHeight)
  let count = 0

  for (let gridY = 0; gridY < size; gridY++) {
    for (let gridX = 0; gridX < size; gridX++) {
      for (let subGridY = 0; subGridY < size; subGridY++) {
        for (let subGridX = 0; subGridX < size; subGridX++) {
          const x = gridX * size + subGridX
          const y = gridY * size + subGridY
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
