import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Coordinates from './Coordinates'

class Main extends React.Component {
  render () {
    const {
      onCellEdit, onCellChanged, onCrossOut, game, isAuthoring, isFilling, isCrossingOut,
      gridSize, subGridSize, filledColor, emptyColor, solvedColor, unsolvedColor,
      gridData, coordinatesOrder
    } = this.props

    return (
      <div>
        <Grid
          onCellEdit={onCellEdit}
          onCellChanged={onCellChanged}
          onCrossOut={onCrossOut}
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
          gridData={gridData}
        />

        {!isAuthoring && game === 'classic' && (
          <Coordinates
            gridSize={gridSize}
            subGridSize={subGridSize}
            filledColor={filledColor}
            emptyColor={emptyColor}
            solvedColor={solvedColor}
            unsolvedColor={unsolvedColor}
            gridData={gridData}
            coordinatesOrder={coordinatesOrder}
          />
        )}

        {!isAuthoring && game === 'nonogram' && (
          <>
            <br />
            <p><strong>Grid size: {gridSize}x{gridSize}</strong></p>
          </>
        )}
      </div>
    )
  }
}

Main.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  onCrossOut: PropTypes.func,
  game: PropTypes.string.isRequired,
  isAuthoring: PropTypes.bool,
  isFilling: PropTypes.bool,
  isCrossingOut: PropTypes.bool,
  gridSize: PropTypes.number.isRequired,
  subGridSize: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  solvedColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired,
  coordinatesOrder: PropTypes.array.isRequired
}

export default Main
