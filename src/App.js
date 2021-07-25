import React from 'react'
import Grid from './components/Grid'
import { Container, Row, Col, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { toast, ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Jimp from 'jimp/es'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import SubGrid from './components/SubGrid'
import {
  generateGrid, generateCoordinatesOrder, serializeGridData, getCoordinateLabel,
  jimpToSerializedGridData, serializedGridDataToJimp
} from './lib/util'

const serializedGridDataGitHub = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000011000011110001111100000000000000110001111101111111111111111111111111111111111111110111111111111111111111111111111111111111111111111111111111111111111111101111111111111111111111111111111111111111111111111111111100000000110000001111100011111110111111111111111111111111111111110000000000000000000000000000000010000000110000001111000011111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010000001100000111000011110011111101111111111111111111111111111111111111111111111011111110111111111111111111111111111111111111111111111111000111110000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110001110000011111100111111101111111111111111111111111111111101111111011111110000000000000000000000001000000010000000110000001110000011110000000011110001111100011111001111110011111100111111011111110111111111111110111111101111111011111110111111101111111011111110111111000000000100000000000000000000000000000000000000000000000000000000111100000000000000000000000000000000000000000000000000000000000000001111000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000011111110111111101111111011111110111111101111111011111110011111111110000111110001111100011111100111111001111110011111110111111100111111101111111111111111111111111111111111111111111111111111111111111001111100011111000111100001111000011110000111100001111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111100011111000111110000111100001111000011110000111100001111111111101111111011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000011110000111100001111000011110000111110001111100011111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111000011110000111100001111000011110001111100011111000111111111111111111111111111111111111111111111111111111111111111111111011111110111111101111111011111110011111100111111000111110001111111111100111111101111111011111111111111111111111110011111110001110000000000000000000000000000000011000000111100001111111011111111000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000011000011110111111111111111001111110111111101111111111111111111111111111111111111111111111111111110111111101111111011111110111111001111110011111000111110000000111100001111000001110000011100000011000000010000000000000000111001111111001111111010111110011111110011111100111111100111111111111111111111111111111111111111001111100110111100000000100000001100000010000000100000000000000000000000000000000000000000000000000000110000000100000001000000000000000000000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110111100001111000011100000111000001100000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111100011111000011110000011100000011000000000000000000000000111111111111111111111111111111111111111111111111001111110000111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111001111000011111110111110001111000011100000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      isAuthoring: false,
      isFilling: false,
      filledColor: 0x00000000,
      emptyColor: 0xFFFFFFFF,
      solvedColor: 0xFFFF00FF,
      unsolvedColor: 0x808080FF
    }

    this.initializeGrid = this.initializeGrid.bind(this)
    this.onCellEdit = this.onCellEdit.bind(this)
    this.onCellChanged = this.onCellChanged.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.confirmChangeMode = this.confirmChangeMode.bind(this)
    this.clear = this.clear.bind(this)
    this.revealSolution = this.revealSolution.bind(this)
    this.invert = this.invert.bind(this)
    this.import = this.import.bind(this)
    this.export = this.export.bind(this)
    this.share = this.share.bind(this)
    this.resizeCanvas = this.resizeCanvas.bind(this)
  }

  componentDidMount () {
    const searchParams = new URLSearchParams(window.location.search)
    const query = Object.fromEntries(searchParams.entries())

    document.onselectstart = () => false

    this.setState({
      isAuthoring: (query.isAuthoring === 'true'),
      size: this.initializeGrid(query.gridData)
    })
  }

  initializeGrid (serializedGridData) {
    let size = 8

    if (serializedGridData) {
      const deserializedSize = Math.sqrt(Math.sqrt(serializedGridData.length))

      if (deserializedSize % 1 !== 0) {
        toast.error('Grid must have a size of x^4.')
        this.gridData = generateGrid(size, serializedGridDataGitHub)
      } else if (deserializedSize < 3) {
        toast.error('Grid can be no smaller than 3^4.')
        this.gridData = generateGrid(size, serializedGridDataGitHub)
      } else if (deserializedSize > 11) {
        toast.error('Grid can be no larger than 11^4.')
        this.gridData = generateGrid(size, serializedGridDataGitHub)
      } else {
        size = deserializedSize
        this.gridData = generateGrid(size, serializedGridData)
      }
    } else {
      this.gridData = generateGrid(size, serializedGridDataGitHub)
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
      message: `Are you sure you want to clear ${isAuthoring ? 'the canvas' : 'your progress'}? This cannot be undone.`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const searchParams = new URLSearchParams(window.location.search)

            if (isAuthoring) {
              // Clear the canvas.
              const serializedGridData = serializeGridData(this.gridData)
              searchParams.set('gridData', '0'.repeat(serializedGridData.length))
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

  import (e) {
    const file = e.target.files[0]
    e.target.value = ''

    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to import this image? Your current canvas will be overwritten.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const reader = new FileReader()

            // Closure to capture the file information.
            reader.onload = ((_) => {
              return async (e) => {
                const jimpFile = await Jimp.read(Buffer.from(e.target.result))
                const size = Math.pow(this.gridData.length, 2)

                jimpFile
                  .contrast(1)
                  .resize(size, size)

                const searchParams = new URLSearchParams(window.location.search)
                searchParams.set('gridData', jimpToSerializedGridData(jimpFile))
                window.location.search = searchParams.toString()
              }
            })(file)

            reader.readAsArrayBuffer(file)
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  async export () {
    const { filledColor, emptyColor } = this.state
    const image = serializedGridDataToJimp(serializeGridData(this.gridData), filledColor, emptyColor)
    const u8 = await image.getBufferAsync(Jimp.MIME_PNG)

    // https://medium.com/@koteswar.meesala/convert-array-buffer-to-base64-string-to-display-images-in-angular-7-4c443db242cd
    const stringChar = u8.reduce((data, byte) => {
      return data + String.fromCharCode(byte)
    }, '')

    const b64Encoded = btoa(stringChar)

    confirmAlert({
      title: 'Image',
      childrenElement: () => {
        return (
          <>
            Right-click and &quot;Save Image As&quot; to download the image.
            <div><img src={`data:image/png;base64, ${b64Encoded}`} /></div>
          </>
        )
      },
      buttons: [
        {
          label: 'Continue'
        }
      ]
    })
  }

  share () {
    const { protocol, host } = window.location
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('isAuthoring', 'false')
    searchParams.set('gridData', serializeGridData(this.gridData))
    navigator.clipboard.writeText(`${protocol}//${host}/?${searchParams.toString()}`)
    toast.success('URL copied to your clipboard!')
  }

  resizeCanvas (size) {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to resize? This will clear the canvas.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const searchParams = new URLSearchParams(window.location.search)
            searchParams.set('gridData', '0'.repeat(Math.pow(size, 4)))
            window.location.search = searchParams.toString()
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  render () {
    const {
      isAuthoring, isFilling, size,
      filledColor, emptyColor, solvedColor, unsolvedColor
    } = this.state

    if (!size) {
      return <></>
    }

    return (
      <Container>
        <ToastContainer />
        <h1>Pixel Puzzles</h1>
        <h4>Copy each square&apos;s pattern to the associated coordinates to reveal a secret image!</h4>
        <h6>Fill the grid in your browser or print the puzzle to complete by hand. Edit the puzzle or generate your own using any image. Share puzzles with your friends and family!</h6>

        <div>
          <div className="grid">
            <Grid
              onCellEdit={this.onCellEdit}
              onCellChanged={this.onCellChanged}
              isAuthoring={isAuthoring}
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

        <Form>
          {isAuthoring && (
            <>
              <Row>
                <Col>
                  <DropdownButton title="Resize Canvas">
                    { /* Sizes allowed are 3-11 */ }
                    {Array(11).fill(0).map((_, i) => i + 1).filter(
                      size => size >= 3 && size !== this.gridData.length
                    ).map(size => (
                      <Dropdown.Item
                        key={size}
                        onSelect={() => this.resizeCanvas(size)}
                      >
                        {size}<sup>4</sup>
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                  <Button onClick={this.invert}>Invert</Button>
                </Col>
              </Row>

              <Row>
                <Form.Label>Import from Image</Form.Label>
                <Form.Control
                  type="file" name="files"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={this.import}
                />
              </Row>

              <Row>
                <Col>
                  <Button onClick={this.export}>Export as Image</Button>
                  <Button onClick={this.share}>Share</Button>
                </Col>
              </Row>
            </>
          )}

          {!isAuthoring && (
            <div>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Button onClick={this.revealSolution}>Reveal Solution</Button>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}

          <Row>
            <Col>
              <Button variant="danger" onClick={this.clear}>Clear</Button>
              <Button onClick={this.changeMode}>{(isAuthoring) ? 'Play' : 'Edit'}</Button>
              <Button>Print as PDF</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              Created by <a href="https://github.com/BrandonE" target="_blank" rel="noreferrer">Brandon Evans</a>.
              Inspired by <a href="https://web.archive.org/web/20111027002447/http://www.tipstricks.com/puzzles.html" target="_blank" rel="noreferrer">Pencil Puzzles</a> from <a href="https://en.wikipedia.org/wiki/Tips_%26_Tricks_(magazine)">Tips &amp; Tricks Magazine</a>
              &nbsp; <a href="https://github.com/BrandonE/pixel-puzzles" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default App
