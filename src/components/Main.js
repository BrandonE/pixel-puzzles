import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Coordinates from './Coordinates'

class Main extends React.Component {
  render () {
    const {
      onCellEdit, onCellChanged, onCrossOut, getCellWidthAndHeight, game,
      isAuthoring, isFilling, isCrossingOut, gridSize, subGridSize,
      filledColor, emptyColor, solvedColor, unsolvedColor, gridData,
      coordinatesOrder
    } = this.props

    return (
      <div>
        <Grid
          onCellEdit={onCellEdit}
          onCellChanged={onCellChanged}
          onCrossOut={onCrossOut}
          getCellWidthAndHeight={getCellWidthAndHeight}
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
            getCellWidthAndHeight={getCellWidthAndHeight}
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
      </div>
    )
  }
}

Main.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  onCrossOut: PropTypes.func,
  getCellWidthAndHeight: PropTypes.func.isRequired,
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
