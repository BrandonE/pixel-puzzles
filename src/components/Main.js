import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Coordinates from './Coordinates'

class Main extends React.Component {
  render () {
    const {
      onCellEdit, onCellChanged, isAuthoring, isFilling, gridSize, subGridSize,
      filledColor, emptyColor, solvedColor, unsolvedColor, gridData,
      coordinatesOrder
    } = this.props

    return (
      <>
        <div>
          <div className="grid">
            <Grid
              onCellEdit={onCellEdit}
              onCellChanged={onCellChanged}
              isAuthoring={isAuthoring}
              isFilling={isFilling}
              gridSize={gridSize}
              subGridSize={subGridSize}
              filledColor={filledColor}
              emptyColor={emptyColor}
              solvedColor={solvedColor}
              unsolvedColor={unsolvedColor}
              gridData={gridData}
            />
          </div>

          {!isAuthoring && (
            <Coordinates
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
      </>
    )
  }
}

Main.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  isAuthoring: PropTypes.bool,
  isFilling: PropTypes.bool,
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
