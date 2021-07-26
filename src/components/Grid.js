import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'
import { getXLabel, getYLabel } from '../lib/util'

const Grid = props => {
  const {
    onCellEdit, onCellChanged, isAuthoring, isFilling, isRevealing,
    size, filledColor, emptyColor, solvedColor, unsolvedColor, gridData
  } = props

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          {Array(size).fill().map((_, colIndex) => (
            <td key={colIndex}>{getXLabel(colIndex)}</td>
          ))}
        </tr>

        {Array(size).fill().map((_, rowIndex) => (
          <tr key={rowIndex}>
            <td>{getYLabel(rowIndex)}</td>
            {Array(size).fill().map((_, colIndex) => (
              <SubGrid
                key={colIndex}
                onCellEdit={onCellEdit}
                onCellChanged={onCellChanged}
                isAuthoring={isAuthoring}
                isFilling={isFilling}
                isRevealing={isRevealing}
                size={size}
                filledColor={filledColor}
                emptyColor={emptyColor}
                solvedColor={solvedColor}
                unsolvedColor={unsolvedColor}
                gridY={rowIndex}
                gridX={colIndex}
                initialSubGridData={gridData[rowIndex][colIndex]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Grid.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  isAuthoring: PropTypes.bool,
  isFilling: PropTypes.bool,
  isRevealing: PropTypes.bool,
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  solvedColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired
}

export default Grid
