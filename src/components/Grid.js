import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'
import { getXLabel, getYLabel } from '../lib/util'

const Grid = props => {
  const {
    onCellEdit, onCellChanged, isAuthoring, isUsingMouse, isFilling, size,
    filledColor, emptyColor, solvedColor, unsolvedColor, gridData
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
                isUsingMouse={isUsingMouse}
                isFilling={isFilling}
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
  isAuthoring: PropTypes.bool.isRequired,
  isUsingMouse: PropTypes.bool.isRequired,
  isFilling: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.string.isRequired,
  emptyColor: PropTypes.string.isRequired,
  solvedColor: PropTypes.string.isRequired,
  unsolvedColor: PropTypes.string.isRequired,
  gridData: PropTypes.array.isRequired
}

export default Grid
