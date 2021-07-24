import React from 'react'
import PropTypes from 'prop-types'

const Cell = props => {
  const {
    onCellChanged, filledColor, emptyColor,
    gridY, gridX, subGridY, subGridX, filled
  } = props

  return (
    <div
      style={{
        background: (filled) ? filledColor : emptyColor
      }}
      onMouseEnter={() => {
        console.log(gridY, gridX, subGridY, subGridX, !filled)
        onCellChanged(gridY, gridX, subGridY, subGridX, !filled)
      }}
    >
      x
    </div>
  )
}

Cell.propTypes = {
  onCellChanged: PropTypes.func,
  filledColor: PropTypes.string,
  emptyColor: PropTypes.string,
  subGridData: PropTypes.array,
  gridY: PropTypes.number,
  gridX: PropTypes.number,
  subGridY: PropTypes.number,
  subGridX: PropTypes.number,
  filled: PropTypes.bool
}

export default Cell
