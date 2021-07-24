import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'

const Grid = props => {
  const { onCellChanged, filledColor, emptyColor, gridData } = props

  return (
    <table>
      <tbody>
        {gridData.map((gridRow, rowIndex) => (
          <tr key={rowIndex}>
            {gridRow.map((subGridData, colIndex) => (
              <td key={colIndex}>
                <SubGrid
                  onCellChanged={onCellChanged}
                  filledColor={filledColor}
                  emptyColor={emptyColor}
                  subGridData={subGridData}
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
  onCellChanged: PropTypes.func,
  filledColor: PropTypes.string,
  emptyColor: PropTypes.string,
  gridData: PropTypes.array
}

export default Grid
