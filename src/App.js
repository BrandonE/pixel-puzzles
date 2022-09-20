import React from 'react'
import Grid from './components/Grid'
import { Form, Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { toast, ToastContainer } from 'react-toastify'
import { SpinnerComponent } from 'react-element-spinner'
import ReactToPrint from 'react-to-print'
import Jimp from 'jimp/es'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Main from './components/Main'
import Buttons from './components/Buttons'
import Footer from './components/Footer'
import Crop from './components/Crop'
import {
  generateGrid, generateCoordinatesOrder, serializeGridData,
  jimpToSerializedGridData, gridDataToJimp
} from './lib/util'
import Print from './components/Print'

const serializedGridDataGitHub30x30 = '0000000000000000000000000000000000000000000110011100001001111111111111111111111111111111111111111111111111111111111111111111110000111001111111111111110000000000000001100011100000000000000000000000000000000000000000100011000110111111111111111111111110111111111111111111110001111111111111111111111111111111111111111111111111111111111111111111111111100011110111111111111111011110000000000100001100011000001110011101111011110111111110111101111011110111100000100000000000000000000110000000000000000000000000011000000000000000000001000000000000000000000000011110111101111011110111111100111001111011110111101111111111111111111111111111101110011100111001110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111100111001110011100111111111111111111111111111111111111111111111111111111110011100111001110011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111001110011100111001111111111111111111111111111111110111101111011110011111110111111111111111101110000000000100001110011111000000000000000000001000000000000000000000000000010000000000000010011111111011111111111111111111111111111111101111011110111000011100011000110000100000110111110111101111101111111111111111111101101000001000010000000000000000000000010000100000000000000011111111111111111111111111111111111111111111111111111001100011000100000000000000000000000000000000000111100111000110000000000111111111111111111110011100000000000000000000000000000000000000000000000000111111111111111111111110011110111001100000000000000000000000000000000000000'
const serializedGridDataGitHub15x15 = '000001111100000000111111111000001111111111100011001111100110011000000000111111000000000111111000000000111111000000000011111000000000111111000000000111111100000001111010111000111110001000000111110000110000111100000011000010000'

const defaultGridSize = 8
const defaultSubGridSize = 5
const defaultNonogramGridSize = 15

const preventUnload = e => {
  // Cancel the event
  e.preventDefault() // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = ''
}

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      game: 'classic',
      isAuthoring: false,
      isReadOnly: false,
      // TODO: Move this down to Grid to avoid re-rendering coordinates and make things faster.
      isFilling: false,
      isCrossingOut: false,
      filledColor: 0x00000000,
      emptyColor: 0xFFFFFFFF,
      solvedColor: 0xFFFF00FF,
      unsolvedColor: 0x808080FF,
      isLoading: false
    }

    this.printableRef = React.createRef()

    this.initializeGrid = this.initializeGrid.bind(this)
    this.onCellEdit = this.onCellEdit.bind(this)
    this.onCellChanged = this.onCellChanged.bind(this)
    this.onCrossOut = this.onCrossOut.bind(this)
    this.changeGame = this.changeGame.bind(this)
    this.confirmChangeGame = this.confirmChangeGame.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.confirmChangeMode = this.confirmChangeMode.bind(this)
    this.clear = this.clear.bind(this)
    this.revealSolution = this.revealSolution.bind(this)
    this.invert = this.invert.bind(this)
    this.onCropProcessed = this.onCropProcessed.bind(this)
    this.importImage = this.importImage.bind(this)
    this.confirmImportImage = this.confirmImportImage.bind(this)
    this.exportImage = this.exportImage.bind(this)
    this.share = this.share.bind(this)
    this.resizeGrids = this.resizeGrids.bind(this)
    this.print = this.print.bind(this)
  }

  componentDidMount () {
    const searchParams = new URLSearchParams(window.location.search)
    const query = Object.fromEntries(searchParams.entries())

    const game = (['classic', 'nonogram'].includes(query.game)) ? query.game : 'classic'

    let gridSize = parseInt(query.gridSize, 10)
    let subGridSize = parseInt(query.subGridSize, 10)

    if (game === 'classic') {
      if (!gridSize || gridSize < 2 || gridSize > 9) {
        gridSize = defaultGridSize
      }

      if (!subGridSize || subGridSize < 2 || subGridSize > 9) {
        subGridSize = defaultSubGridSize
      }
    } else if (game === 'nonogram') {
      if (!gridSize || gridSize < 5 || gridSize > 20) {
        gridSize = defaultNonogramGridSize
      }

      subGridSize = 1
    }

    document.onselectstart = () => false

    window.addEventListener('beforeunload', preventUnload)

    this.initializeGrid(game, gridSize, subGridSize, query.gridData)

    const isAuthoring = (query.isAuthoring === 'true')

    this.setState({
      game,
      isAuthoring,
      isReadOnly: (query.isReadOnly === 'true') && !isAuthoring,
      gridSize,
      subGridSize
    })
  }

  componentWillUnmount () {
    window.removeEventListener('beforeunload', preventUnload)
  }

  navigate (searchParams) {
    window.removeEventListener('beforeunload', preventUnload)
    window.location.search = searchParams.toString()
  }

  initializeGrid (game, gridSize, subGridSize, serializedGridData) {
    if (!serializedGridData && game === 'classic' && gridSize === defaultGridSize && subGridSize === defaultSubGridSize) {
      serializedGridData = serializedGridDataGitHub30x30
    }

    if (!serializedGridData && game === 'nonogram' && gridSize === defaultNonogramGridSize) {
      serializedGridData = serializedGridDataGitHub15x15
    }

    this.gridData = generateGrid(gridSize, subGridSize, serializedGridData)
    this.coordinatesOrder = generateCoordinatesOrder(gridSize)
  }

  onCellEdit (filled) {
    this.setState({
      isFilling: !filled
    })
  }

  onCellChanged (gridY, gridX, subGridY, subGridX, value) {
    this.gridData[gridY][gridX][subGridY][subGridX] = (value) ? 1 : 0
  }

  onCrossOut (crossed) {
    this.setState({
      isCrossingOut: crossed
    })
  }

  changeGame (game) {
    const { isAuthoring } = this.state

    confirmAlert({
      title: 'Confirmation',
      message: `Are you sure you want to change the game mode? ${(isAuthoring) ? 'This will clear the canvas and cannot be undone.' : 'This will undo your progress.'}`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.confirmChangeGame(game)
        },
        {
          label: 'No'
        }
      ]
    })
  }

  confirmChangeGame (game) {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('game', game)
    searchParams.delete('gridData', serializeGridData(this.gridData))
    searchParams.delete('gridSize')
    searchParams.delete('subGridSize')
    searchParams.delete('isReadOnly')
    this.navigate(searchParams)
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
    searchParams.delete('isReadOnly')
    this.navigate(searchParams)
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
              searchParams.set('gridData', '0')
            } else {
              // Clear your progress, not the grid data (actual puzzle contents).
              searchParams.set('gridData', serializeGridData(this.gridData))
            }

            searchParams.set('isAuthoring', JSON.stringify(isAuthoring))
            this.navigate(searchParams)
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
                  const { game, gridSize, subGridSize, filledColor, emptyColor, solvedColor, unsolvedColor } = this.state

                  if (!this.gridData) {
                    return <></>
                  }

                  return (
                    <Grid
                      game={game}
                      isRevealing={true}
                      isFilling={false}
                      isCrossingOut={false}
                      gridSize={gridSize}
                      subGridSize={subGridSize}
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
    this.navigate(searchParams)
  }

  onCropProcessed (croppedImageUrl) {
    this.setState({ croppedImageUrl })
  }

  importImage (e) {
    const file = e.target.files[0]
    e.target.value = ''

    this.setState({
      isLoading: true
    })

    const reader = new FileReader()

    reader.addEventListener('load', async () => {
      const jimpFile = await Jimp.read(reader.result)
      const { width, height } = jimpFile.bitmap

      const importedImageSrc = await new Promise((resolve, reject) => {
        // Converting to PNG ensures GIFs are processed properly.
        jimpFile.getBase64(Jimp.MIME_PNG, (err, src) => {
          if (err) {
            reject(err)
          } else {
            resolve(src)
          }
        })
      })

      this.setState({
        isLoading: false
      })

      confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure you want to import this image? Your current canvas will be overwritten.',
        childrenElement: () => <Crop
          imageSrc={importedImageSrc}
          width={width}
          height={height}
          onImageLoaded={this.onImageLoaded}
          onCropProcessed={this.onCropProcessed}
        />,
        buttons: [
          {
            label: 'Import',
            onClick: () => this.confirmImportImage()
          },
          {
            label: 'Cancel'
          }
        ],
        closeOnClickOutside: false
      })
    })

    reader.readAsDataURL(file)
  }

  async confirmImportImage () {
    const { croppedImageUrl } = this.state

    this.setState({
      isLoading: true
    })

    const jimpFile = await Jimp.read(croppedImageUrl)
    const gridSize = this.gridData.length
    const subGridSize = this.gridData[0][0].length
    const gridWidthAndHeight = gridSize * subGridSize

    const { width, height } = jimpFile.bitmap
    const largerDimension = (width > height) ? width : height

    jimpFile
      .background(0xFFFFFFFF)
      .contain(largerDimension, largerDimension)
      .resize(gridWidthAndHeight, gridWidthAndHeight)

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('gridData', jimpToSerializedGridData(jimpFile, gridSize, subGridSize))
    this.navigate(searchParams)
  }

  async exportImage () {
    const { filledColor, emptyColor } = this.state
    const image = gridDataToJimp(this.gridData, filledColor, emptyColor)
    const u8 = await image.getBufferAsync(Jimp.MIME_JPEG)

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
            <div><img src={`data:image/jpeg;base64, ${b64Encoded}`} /></div>
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
    searchParams.delete('isReadOnly')
    searchParams.set('gridData', serializeGridData(this.gridData))
    navigator.clipboard.writeText(`${protocol}//${host}${pathname}?${searchParams.toString()}`)
    toast.success('URL copied to your clipboard!')
  }

  resizeGrids (gridSize, subGridSize) {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to resize? This will clear the canvas.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const searchParams = new URLSearchParams(window.location.search)
            searchParams.set('gridSize', gridSize)
            searchParams.set('subGridSize', subGridSize)
            searchParams.set('gridData', '0')
            this.navigate(searchParams)
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
      message: 'Click this button to print the puzzle. Works best on Google Chrome. ',
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
      game, isAuthoring, isReadOnly, isFilling, isCrossingOut, gridSize, subGridSize,
      filledColor, emptyColor, solvedColor, unsolvedColor, isLoading, gridDataToPrint,
      hasError
    } = this.state

    if (hasError) {
      <h1>An unexpected error has occurred. Please reload this page.</h1>
    }

    if (!this.gridData) {
      return <></>
    }

    return (
      <>
        <ToastContainer />

        <ErrorBoundary onError={err => toast.error(err.toString())}>
          <div className="no-print">
            <SpinnerComponent loading={isLoading} position="global" />

            <Header
              changeGame={this.changeGame}
              game={game}
            />

            <Main
              onCellEdit={this.onCellEdit}
              onCellChanged={this.onCellChanged}
              onCrossOut={this.onCrossOut}
              game={game}
              isAuthoring={isAuthoring}
              isFilling={isFilling}
              isCrossingOut={isCrossingOut}
              gridSize={gridSize}
              subGridSize={subGridSize}
              filledColor={filledColor}
              emptyColor={emptyColor}
              solvedColor={solvedColor}
              unsolvedColor={unsolvedColor}
              gridData={this.gridData}
              coordinatesOrder={this.coordinatesOrder}
            />

            <Form className="mainForm">
              <Buttons
                game={game}
                changeMode={this.changeMode}
                clear={this.clear}
                revealSolution={this.revealSolution}
                invert={this.invert}
                importImage={this.importImage}
                exportImage={this.exportImage}
                share={this.share}
                resizeGrids={this.resizeGrids}
                print={this.print}
                isAuthoring={isAuthoring}
                isReadOnly={isReadOnly}
                gridData={this.gridData}
              />

              <Footer game={game} />

              <Print
                gridSize={gridSize}
                subGridSize={subGridSize}
                filledColor={filledColor}
                emptyColor={emptyColor}
                unsolvedColor={unsolvedColor}
                gridData={gridDataToPrint}
                coordinatesOrder={this.coordinatesOrder}
                game={game}
                ref={this.printableRef}
              />
            </Form>
          </div>

          <div className="print">
            <h3>Unsupported operation! To print this puzzle, please click the <em>Print</em> button on the webpage itself</h3>
          </div>
        </ErrorBoundary>
      </>
    )
  }
}

export default App
