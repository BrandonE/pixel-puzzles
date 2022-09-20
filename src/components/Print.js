import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Grid from './Grid'
import Coordinates from './Coordinates'
import Footer from './Footer'

class Print extends React.Component {
  render () {
    const {
      game, gridSize, subGridSize, filledColor, emptyColor,
      // Don't indicate which boxes are empty to begin with; always use unsolved color.
      unsolvedColor, gridData, coordinatesOrder
    } = this.props

    if (!gridData) {
      return <></>
    }

    return (
      <div className="print">
        <Header
          game={game}
          isPrinting={true}
        />

        {gridData && (
          <>
            <div className="grid">
              <Grid
                game={game}
                isPrinting={true}
                gridSize={gridSize}
                subGridSize={subGridSize}
                filledColor={filledColor}
                emptyColor={emptyColor}
                solvedColor={unsolvedColor}
                unsolvedColor={unsolvedColor}
                gridData={gridData}
              />
            </div>

            {game === 'classic' && (
              <Coordinates
                gridSize={gridSize}
                subGridSize={subGridSize}
                filledColor={filledColor}
                emptyColor={emptyColor}
                solvedColor={unsolvedColor}
                unsolvedColor={unsolvedColor}
                gridData={gridData}
                coordinatesOrder={coordinatesOrder}
              />
            )}
          </>
        )}

        <Footer />
      </div>
    )
  }
}

Print.propTypes = {
  game: PropTypes.string.isRequired,
  gridSize: PropTypes.number.isRequired,
  subGridSize: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridData: PropTypes.array,
  coordinatesOrder: PropTypes.array.isRequired
}

export default Print
