import React from 'react'
import PropTypes from 'prop-types'

const Cell = props => {
  const {
    onCellEdit, onCellChanged, isUsingMouse, isFilling, filledColor, emptyColor, subGridY, subGridX, isFilled
  } = props

  return (
    <div
      style={{
        background: (isFilled) ? filledColor : emptyColor
      }}

      onPointerDown={() => {
        onCellEdit(isFilled)
        onCellChanged(subGridY, subGridX, !isFilled)
      }}

      onPointerEnter={(e) => {
        if (!isUsingMouse || (e.buttons === undefined ? e.which === 1 : e.buttons === 1)) {
          onCellChanged(subGridY, subGridX, isFilling)
        }
      }}
    >
      x
    </div>
  )
}

Cell.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  isUsingMouse: PropTypes.bool,
  isFilling: PropTypes.bool,
  filledColor: PropTypes.string,
  emptyColor: PropTypes.string,
  subGridData: PropTypes.array,
  gridY: PropTypes.number,
  gridX: PropTypes.number,
  subGridY: PropTypes.number,
  subGridX: PropTypes.number,
  isFilled: PropTypes.bool
}

export default Cell
