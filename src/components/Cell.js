import React from 'react'
import PropTypes from 'prop-types'
import { decimalToHex } from '../lib/util'

const Cell = props => {
  const {
    onCellEdit, onCellChanged, isUsingMouse, isFilling, filledColor, emptyColor,
    gridY, gridX, subGridY, subGridX, isFilled
  } = props
  return (
    <td
      className="cell"

      style={{
        backgroundColor: decimalToHex((isFilled) ? filledColor : emptyColor)
      }}

      onPointerDown={() => {
        if (onCellEdit) {
          onCellEdit(isFilled)
        }

        if (onCellChanged) {
          onCellChanged(gridY, gridX, subGridY, subGridX, !isFilled)
        }
      }}

      onPointerEnter={(e) => {
        if (
          onCellChanged && (
            !isUsingMouse || (e.buttons === undefined ? e.which === 1 : e.buttons === 1)
          )
        ) {
          onCellChanged(gridY, gridX, subGridY, subGridX, isFilling)
        }
      }}
    >
    </td>
  )
}

Cell.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  isUsingMouse: PropTypes.bool,
  isFilling: PropTypes.bool,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  gridY: PropTypes.number.isRequired,
  gridX: PropTypes.number.isRequired,
  subGridY: PropTypes.number.isRequired,
  subGridX: PropTypes.number.isRequired,
  isFilled: PropTypes.number.isRequired
}

export default Cell
