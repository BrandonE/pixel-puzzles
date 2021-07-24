import React from 'react'
import Grid from './components/Grid'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import SubGrid from './components/SubGrid'
import { generateGrid, generateCoordinatesOrder, serializeGridData, getCoordinateLabel } from './lib/util'

class App extends React.Component {
  constructor () {
    super()

    const filledColor = '#000000'
    const emptyColor = '#FFFFFF'
    const solvedColor = 'green'
    const unsolvedColor = 'grey'

    const searchParams = new URLSearchParams(window.location.search)
    const query = Object.fromEntries(searchParams.entries())

    document.onselectstart = () => false

    document.ontouchstart = () => {
      this.setState({
        isUsingMouse: false
      })
    }

    this.state = {
      isAuthoring: (query.isAuthoring === 'true'),
      isUsingMouse: true,
      isFilling: false,
      size: this.initializeGrid(query.gridData),
      filledColor,
      emptyColor,
      solvedColor,
      unsolvedColor
    }

    this.initializeGrid = this.initializeGrid.bind(this)
    this.onCellEdit = this.onCellEdit.bind(this)
    this.onCellChanged = this.onCellChanged.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.clear = this.clear.bind(this)
  }

  initializeGrid (gridDataSerialized) {
    let size = 8

    if (gridDataSerialized) {
      const deserializedSize = Math.sqrt(Math.sqrt(gridDataSerialized.length))

      if (deserializedSize % 1 !== 0) {
        // Convert to use Toast notification.
        console.error('Grid must have a size that is a power of 4.')
        this.gridData = generateGrid(size)
      } else if (deserializedSize < 3) {
        console.error('Sub-grids can be no smaller than 3x3.')
        this.gridData = generateGrid(size)
      } else if (deserializedSize > 11) {
        // Convert to use Toast notification.
        console.error('Sub-grids can be no larger than 11x11.')
        this.gridData = generateGrid(size)
      } else {
        size = deserializedSize
        this.gridData = generateGrid(size, gridDataSerialized)
      }
    } else {
      this.gridData = generateGrid(size)
    }

    this.coordinatesOrder = generateCoordinatesOrder(size)

    return size
  }

  onCellEdit (filled) {
    this.setState({
      isFilling: !filled
    })
  }

  onCellChanged (gridY, gridX, subGridY, subGridX, value) {
    this.gridData[gridY][gridX][subGridY][subGridX] = (value) ? 1 : 0
  }

  changeMode () {
    if ('URLSearchParams' in window) {
      const { isAuthoring } = this.state
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('gridData', serializeGridData(this.gridData))
      searchParams.set('isAuthoring', JSON.stringify(!isAuthoring))
      window.location.search = searchParams.toString()
    }
  }

  clear () {
    // TODO: Popup confirmation.

    if ('URLSearchParams' in window) {
      const { isAuthoring } = this.state
      const searchParams = new URLSearchParams(window.location.search)

      if (isAuthoring) {
        // Only clear data if authoring. Otherwise, refresh the page to reset progress.
        searchParams.delete('gridData')
      }

      searchParams.set('isAuthoring', JSON.stringify(isAuthoring))
      window.location.search = searchParams.toString()
    }
  }

  render () {
    const {
      isAuthoring, isUsingMouse, isFilling, size,
      filledColor, emptyColor, solvedColor, unsolvedColor
    } = this.state

    return (
      <div>
        <Grid
          onCellEdit={this.onCellEdit}
          onCellChanged={this.onCellChanged}
          isAuthoring={isAuthoring}
          isUsingMouse={isUsingMouse}
          isFilling={isFilling}
          size={size}
          filledColor={filledColor}
          emptyColor={emptyColor}
          solvedColor={solvedColor}
          unsolvedColor={unsolvedColor}
          gridData={this.gridData}
        />

        {isAuthoring && (
          <div>
            <Button>Import (File upload)</Button>
            <Button>Share (Provide shareable link using hostname and query params.)</Button>
            <Button>Drop down to change size (Provide same warning as clearing)</Button>
          </div>
        )}

        {!isAuthoring && (
          <div>
            {this.coordinatesOrder.map((coordinates, index) => {
              const { x, y } = coordinates

              return (
                <table key={index}>
                  <tbody>
                    <tr>
                      <td>{getCoordinateLabel(x, y)}</td>
                    </tr>
                    <tr>
                      <SubGrid
                        isCoordinate={true}
                        size={size}
                        filledColor={filledColor}
                        emptyColor={emptyColor}
                        solvedColor={solvedColor}
                        unsolvedColor={unsolvedColor}
                        gridY={y}
                        gridX={x}
                        initialSubGridData={this.gridData[y][x]}
                      />
                    </tr>
                  </tbody>
                </table>
              )
            })}
            <Button>Reveal Solution (Add popup to confirm)</Button>
          </div>
        )}

        <Button onClick={this.clear}>Clear (Warn lost progress; interrupt refresh in the same way)</Button>

        <Button onClick={this.changeMode}>{(isAuthoring) ? 'Play (Indicate lost progress)' : 'Edit (Warn losing progress and revealing puzzle)'}</Button>
        <Button>Print (New window)</Button>
      </div>
    )
  }
}

export default App
