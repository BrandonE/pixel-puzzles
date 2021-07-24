import React from 'react'
import Grid from './components/Grid'
import SubGrid from './components/SubGrid'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// https://stackoverflow.com/a/10142256/12055600
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

class App extends React.Component {
  constructor () {
    super()

    const size = 8
    const gridData = []
    const coordinatesOrder = []

    for (let gridY = 0; gridY < size; gridY++) {
      const gridRow = []

      for (let gridX = 0; gridX < size; gridX++) {
        const subGridData = []

        coordinatesOrder.push({
          x: gridX,
          y: gridY
        })

        for (let subGridY = 0; subGridY < size; subGridY++) {
          const subGridRow = []

          for (let subGridX = 0; subGridX < size; subGridX++) {
            subGridRow.push(false)
          }

          subGridData.push(subGridRow)
        }

        gridRow.push(subGridData)
      }

      gridData.push(gridRow)
    }

    this.state = {
      filledColor: '#000000',
      emptyColor: '#FFFFFF',
      gridData,
      coordinatesOrder: shuffleArray(coordinatesOrder)
    }

    this.onCellChanged = this.onCellChanged.bind(this)
  }

  onCellChanged (gridY, gridX, subGridY, subGridX, value) {
    const { gridData } = this.state
    gridData[gridY][gridX][subGridY][subGridX] = value

    this.setState({
      gridData
    })
  }

  render () {
    const { filledColor, emptyColor, gridData, coordinatesOrder } = this.state

    return (
      <div>
        <Grid
          onCellChanged={this.onCellChanged}
          filledColor={filledColor}
          unfilledColor={emptyColor}
          gridData={gridData}
        />

        {(coordinatesOrder.map((coordinates, index) => {
          const { x, y } = coordinates

          return (
            <SubGrid
              key={index}
              onCellChanged={() => {}}
              filledColor={filledColor}
              emptyColor={emptyColor}
              subGridData={gridData[y][x]}
              gridY={y}
              gridX={x}
            />
          )
        }))}
      </div>
    )
  }
}

export default App
