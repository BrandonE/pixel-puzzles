import React from 'react'
import Grid from './components/Grid'
import { Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { toast, ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import SubGrid from './components/SubGrid'
import { generateGrid, generateCoordinatesOrder, serializeGridData, getCoordinateLabel } from './lib/util'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      isAuthoring: false,
      isUsingMouse: true,
      isFilling: false,
      filledColor: 'black',
      emptyColor: 'white',
      solvedColor: 'yellow',
      unsolvedColor: 'grey'
    }

    this.initializeGrid = this.initializeGrid.bind(this)
    this.onCellEdit = this.onCellEdit.bind(this)
    this.onCellChanged = this.onCellChanged.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.confirmChangeMode = this.confirmChangeMode.bind(this)
    this.clear = this.clear.bind(this)
    this.revealSolution = this.revealSolution.bind(this)
    this.invert = this.invert.bind(this)
  }

  componentDidMount () {
    const searchParams = new URLSearchParams(window.location.search)
    const query = Object.fromEntries(searchParams.entries())

    document.onselectstart = () => false

    document.ontouchstart = () => {
      this.setState({
        isUsingMouse: false
      })
    }

    this.setState({
      isAuthoring: (query.isAuthoring === 'true'),
      size: this.initializeGrid(query.gridData)
    })
  }

  initializeGrid (gridDataSerialized) {
    let size = 8

    if (gridDataSerialized) {
      const deserializedSize = Math.sqrt(Math.sqrt(gridDataSerialized.length))

      if (deserializedSize % 1 !== 0) {
        toast.error('Grid must have a size that is a power of 4.')
        this.gridData = generateGrid(size)
      } else if (deserializedSize < 3) {
        toast.error('Sub-grids can be no smaller than 3x3.')
        this.gridData = generateGrid(size)
      } else if (deserializedSize > 11) {
        toast.error('Sub-grids can be no larger than 11x11.')
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
    const { isAuthoring } = this.state

    if (isAuthoring) {
      this.confirmChangeMode()
    } else {
      confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure you want to edit the puzzle? This will undo your progress and reveal the solution!',
        buttons: [
          {
            label: 'Yes',
            onClick: this.confirmChangeMode
          },
          {
            label: 'No'
          }
        ]
      })
    }
  }

  confirmChangeMode () {
    const { isAuthoring } = this.state
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('gridData', serializeGridData(this.gridData))
    searchParams.set('isAuthoring', JSON.stringify(!isAuthoring))
    window.location.search = searchParams.toString()
  }

  clear () {
    const { isAuthoring } = this.state

    confirmAlert({
      title: 'Confirmation',
      message: `Are you sure you want to clear ${isAuthoring ? 'the canvas' : 'your progress'}? This cannot be undone`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const searchParams = new URLSearchParams(window.location.search)

            if (isAuthoring) {
              // Clear the canvas.
              searchParams.delete('gridData')
            } else {
              // Clear your progress, not the grid data (actual puzzle contents).
              searchParams.set('gridData', serializeGridData(this.gridData))
            }

            searchParams.set('isAuthoring', JSON.stringify(isAuthoring))
            window.location.search = searchParams.toString()
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  revealSolution () {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to reveal the solution? This spoils the fun!',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setTimeout(() => {
              confirmAlert({
                title: 'Solution',
                childrenElement: () => {
                  const { size, filledColor, emptyColor, solvedColor, unsolvedColor } = this.state

                  if (!size) {
                    return <></>
                  }

                  // TODO: Create an animation of filling the grid.
                  return (
                    <Grid
                      isAuthoring={true}
                      isUsingMouse={false}
                      isFilling={false}
                      size={size}
                      filledColor={filledColor}
                      emptyColor={emptyColor}
                      solvedColor={solvedColor}
                      unsolvedColor={unsolvedColor}
                      gridData={this.gridData}
                    />
                  )
                },
                buttons: [
                  {
                    label: 'Continue'
                  }
                ]
              })
            }, 0) // Required to make sure the first alert is dismissed before the next is revealed.
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  invert () {
    const serializedGridData = serializeGridData(this.gridData)
    let invertedSerializedGridData = ''

    for (let i = 0; i < serializedGridData.length; i++) {
      invertedSerializedGridData += (serializedGridData[i] === '1') ? '0' : '1'
    }

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('gridData', invertedSerializedGridData)
    window.location.search = searchParams.toString()
  }

  render () {
    const {
      isAuthoring, isUsingMouse, isFilling, size,
      filledColor, emptyColor, solvedColor, unsolvedColor
    } = this.state

    if (!size) {
      return <></>
    }

    return (
      <Container>
        <ToastContainer />
        <h1>Pixel Puzzles</h1>

        <div>
          <div className="grid">
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
          </div>

          {!isAuthoring && (
            this.coordinatesOrder.map((coordinates, index) => {
              const { x, y } = coordinates

              return (
                <table className="coordinates" key={index}>
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
            })
          )}
        </div>

        <ButtonToolbar>
          <ButtonGroup>
            {isAuthoring && (
              <div>
                <Button onClick={this.invert}>Invert</Button>
                <Button>Import (File upload)</Button>
                <Button>Share (Provide shareable link using hostname and query params.)</Button>
                <Button>Drop down to change size (Provide same warning as clearing)</Button>
              </div>
            )}

            {!isAuthoring && (
              <div>
                <Button onClick={this.revealSolution}>Reveal Solution</Button>
              </div>
            )}

            <Button variant="danger" onClick={this.clear}>Clear</Button>

            <Button onClick={this.changeMode}>{(isAuthoring) ? 'Play' : 'Edit'}</Button>
            <Button>Print (New window)</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>
    )
  }
}

export default App
