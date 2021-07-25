import React from 'react'
import PropTypes from 'prop-types'
import { decimalToHex } from '../lib/util'

const Cell = props => {
  const {
    onCellEdit, onCellChanged, filledColor, emptyColor,
    gridY, gridX, subGridY, subGridX, isFilled
  } = props
  return (
    <td
      className="cell"

      style={{
        backgroundColor: decimalToHex((isFilled) ? filledColor : emptyColor)
      }}

      onPointerDown={() => {
        const { isFilled } = props
        console.log(isFilled)

        if (onCellEdit) {
          onCellEdit(isFilled)
        }

        if (onCellChanged) {
          onCellChanged(gridY, gridX, subGridY, subGridX, !isFilled)
        }
      }}

      onMouseEnter={e => {
        const { isFilling } = props
        console.log('POINTER ENTER')

        if (onCellChanged && e.buttons === undefined ? e.which === 1 : e.buttons === 1) {
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
