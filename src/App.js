import React from 'react'
import Grid from './components/Grid'
import { Container, Form, Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { toast, ToastContainer } from 'react-toastify'
import ReactToPrint from 'react-to-print'
import Jimp from 'jimp/es'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Buttons from './components/Buttons'
import Footer from './components/Footer'
import {
  generateGrid, generateCoordinatesOrder, serializeGridData,
  jimpToSerializedGridData, serializedGridDataToJimp
} from './lib/util'
import Print from './components/Print'

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

    this.printableRef = React.createRef()

    this.initializeGrid = this.initializeGrid.bind(this)
    this.onCellEdit = this.onCellEdit.bind(this)
    this.onCellChanged = this.onCellChanged.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.confirmChangeMode = this.confirmChangeMode.bind(this)
    this.clear = this.clear.bind(this)
    this.revealSolution = this.revealSolution.bind(this)
    this.invert = this.invert.bind(this)
    this.importImage = this.importImage.bind(this)
    this.exportImage = this.exportImage.bind(this)
    this.share = this.share.bind(this)
    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.print = this.print.bind(this)
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
                      isRevealing={true}
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

  importImage (e) {
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

  async exportImage () {
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
    const { protocol, host, pathname } = window.location
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('isAuthoring', 'false')
    searchParams.set('gridData', serializeGridData(this.gridData))
    navigator.clipboard.writeText(`${protocol}//${host}${pathname}?${searchParams.toString()}`)
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

  print () {
    this.setState({
      gridDataToPrint: this.gridData
    })

    confirmAlert({
      title: 'Print',
      message: 'Click this button to print the puzzle. We recommend printing in Landscape mode. ',
      childrenElement: () => (
        <ReactToPrint
          trigger={() => (
            <Button>Print</Button>
          )}
          content={() => this.printableRef.current}
        />
      ),
      buttons: [
        {
          label: 'Cancel'
        }
      ]
    })
  }

  render () {
    const {
      isAuthoring, isFilling, size, filledColor,
      emptyColor, solvedColor, unsolvedColor, gridDataToPrint
    } = this.state

    if (!size) {
      return <></>
    }

    return (
      <Container>
        <ToastContainer />
        <Header />

        <Main
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
          coordinatesOrder={this.coordinatesOrder}
        />

        <Form>
          <Buttons
            changeMode={this.changeMode}
            clear={this.clear}
            revealSolution={this.revealSolution}
            invert={this.invert}
            importImage={this.importImage}
            exportImage={this.exportImage}
            share={this.share}
            resizeCanvas={this.resizeCanvas}
            print={this.print}
            isAuthoring={isAuthoring}
            gridData={this.gridData}
          />

          <Footer />

          <Print
            size={size}
            filledColor={filledColor}
            emptyColor={emptyColor}
            unsolvedColor={unsolvedColor}
            gridData={gridDataToPrint}
            coordinatesOrder={this.coordinatesOrder}
            ref={this.printableRef}
          />
        </Form>
      </Container>
    )
  }
}

export default App
