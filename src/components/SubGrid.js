import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

const SubGrid = props => {
  const {
    onCellChanged, filledColor, emptyColor,
    subGridData, gridY, gridX
  } = props

  return (
    <table>
      <tbody>
        {subGridData.map((subGridRow, rowIndex) => (
          <tr key={rowIndex}>
            {subGridRow.map((cellFilled, colIndex) => (
              <td key={colIndex}>
                <Cell
                  onCellChanged={onCellChanged}
                  filledColor={filledColor}
                  emptyColor={emptyColor}
                  gridY={gridY}
                  gridX={gridX}
                  subGridY={rowIndex}
                  subGridX={colIndex}
                  filled={cellFilled}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

SubGrid.propTypes = {
  onCellChanged: PropTypes.func,
  filledColor: PropTypes.string,
  emptyColor: PropTypes.string,
  subGridData: PropTypes.array,
  gridY: PropTypes.number,
  gridX: PropTypes.number
}

export default SubGrid
