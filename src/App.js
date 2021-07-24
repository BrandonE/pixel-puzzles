import React from 'react'
import Grid from './components/Grid'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// https://stackoverflow.com/a/10142256/12055600
/*
const shuffleArray = (arr) => {
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
*/

const serializeGridData = gridData => gridData.flat().flat().flat().join('')

const deserializeGridData = gridDataSerialized => {
  const size = Math.sqrt(Math.sqrt(gridDataSerialized.length))

  if (size % 1 !== 0) {
    throw new Error('Grid must have a size that is a power of 4.')
  }

  const gridData = []
  let count = 0

  for (let gridY = 0; gridY < size; gridY++) {
    const gridRow = []

    for (let gridX = 0; gridX < size; gridX++) {
      const subGridData = []

      for (let subGridY = 0; subGridY < size; subGridY++) {
        const subGridRow = []

        for (let subGridX = 0; subGridX < size; subGridX++) {
          const value = gridDataSerialized[count]
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

let gridData

class App extends React.Component {
  constructor () {
    super()

    let size
    const filledColor = '#000000'
    const emptyColor = '#FFFFFF'
    const searchParams = new URLSearchParams(window.location.search)
    const query = Object.fromEntries(searchParams.entries())
    const gridDataSerialized = query.gridData

    if (gridDataSerialized) {
      gridData = deserializeGridData(gridDataSerialized)
      size = Math.sqrt(Math.sqrt(gridDataSerialized.length))
    } else {
      gridData = []
      size = 8

      for (let gridY = 0; gridY < size; gridY++) {
        const gridRow = []

        for (let gridX = 0; gridX < size; gridX++) {
          const subGridData = []

          for (let subGridY = 0; subGridY < size; subGridY++) {
            const subGridRow = []

            for (let subGridX = 0; subGridX < size; subGridX++) {
              subGridRow.push(0)
            }

            subGridData.push(subGridRow)
          }

          gridRow.push(subGridData)
        }

        gridData.push(gridRow)
      }
    }

    document.onselectstart = () => false

    document.ontouchstart = () => {
      this.setState({
        isUsingMouse: false
      })
    }

    this.state = {
      isUsingMouse: true,
      isFilling: false,
      size,
      filledColor,
      emptyColor
    }

    this.onCellEdit = this.onCellEdit.bind(this)
    this.onCellChanged = this.onCellChanged.bind(this)
  }

  onCellEdit (filled) {
    this.setState({
      isFilling: !filled
    })
  }

  onCellChanged (gridY, gridX, subGridY, subGridX, value) {
    gridData[gridY][gridX][subGridY][subGridX] = (value) ? 1 : 0
  }

  play () {
    if ('URLSearchParams' in window) {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('gridData', serializeGridData(gridData))
      window.location.search = searchParams.toString()
    }
  }

  render () {
    const { isUsingMouse, isFilling, size, filledColor, emptyColor } = this.state

    return (
      <div>
        <Grid
          onCellEdit={this.onCellEdit}
          onCellChanged={this.onCellChanged}
          isUsingMouse={isUsingMouse}
          isFilling={isFilling}
          size={size}
          filledColor={filledColor}
          emptyColor={emptyColor}
          gridData={gridData}
        />

        <Button onClick={this.play}>Play</Button>
      </div>
    )
  }
}

export default App
