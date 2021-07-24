import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'

const Grid = props => {
  const { onCellEdit, onCellChanged, isUsingMouse, isFilling, size, filledColor, emptyColor, gridData } = props

  return (
    <table>
      <tbody>
        {Array(size).fill().map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array(size).fill().map((_, colIndex) => (
              <SubGrid
                key={colIndex}
                onCellEdit={onCellEdit}
                onCellChanged={onCellChanged}
                isUsingMouse={isUsingMouse}
                isFilling={isFilling}
                size={size}
                filledColor={filledColor}
                emptyColor={emptyColor}
                gridY={rowIndex}
                gridX={colIndex}
                subGridData={gridData[rowIndex][colIndex]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Grid.propTypes = {
  onCellEdit: PropTypes.func.isRequired,
  onCellChanged: PropTypes.func.isRequired,
  isUsingMouse: PropTypes.bool.isRequired,
  isFilling: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.string.isRequired,
  emptyColor: PropTypes.string.isRequired,
  gridData: PropTypes.array.isRequired
}

export default Grid
