import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'

const Grid = props => {
  const { onCellEdit, isUsingMouse, isFilling, size, filledColor, emptyColor } = props

  return (
    <table>
      <tbody>
        {Array(size).fill().map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array(size).fill().map((_, colIndex) => (
              <td key={colIndex}>
                <SubGrid
                  onCellEdit={onCellEdit}
                  isUsingMouse={isUsingMouse}
                  isFilling={isFilling}
                  size={size}
                  filledColor={filledColor}
                  emptyColor={emptyColor}
                  gridY={rowIndex}
                  gridX={colIndex}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Grid.propTypes = {
  onCellEdit: PropTypes.func,
  isUsingMouse: PropTypes.bool,
  isFilling: PropTypes.bool,
  size: PropTypes.number,
  filledColor: PropTypes.string,
  emptyColor: PropTypes.string
}

export default Grid
