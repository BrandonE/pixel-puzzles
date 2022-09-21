import React from 'react'
import PropTypes from 'prop-types'
import X from '../images/x.svg'
import { decimalToHex } from '../lib/util'

const Cell = props => {
  const [crossedOut, setCrossedOut] = React.useState({
    isCrossedOut: false
  })

  const {
    onCellEdit, onCellChanged, game, filledColor, emptyColor,
    gridY, gridX, subGridY, subGridX, cellWidthAndHeight, isFilled
  } = props

  return (
    <td
      className="cell"

      style={{
        backgroundColor: crossedOut.isCrossedOut ? undefined : decimalToHex((isFilled) ? filledColor : emptyColor),
        backgroundImage: crossedOut.isCrossedOut ? `url(${X})` : undefined,
        minWidth: cellWidthAndHeight,
        minHeight: cellWidthAndHeight,
        width: cellWidthAndHeight,
        height: cellWidthAndHeight
      }}

      onPointerDown={(e) => {
        // Ignore right-click.
        if (e.button === 2) {
          return
        }

        const { isAuthoring, isFilled } = props

        if (onCellEdit) {
          onCellEdit(isFilled)

          if (
            game === 'nonogram' && e.pointerType === 'touch' &&
              !isAuthoring && isFilled && !crossedOut.isCrossedOut
          ) {
            setCrossedOut({ isCrossedOut: isFilled })
            return
          }
        }

        if (onCellChanged) {
          onCellChanged(gridY, gridX, subGridY, subGridX, !isFilled)
        }

        setCrossedOut({ isCrossedOut: false })
      }}

      // Right-click
      onContextMenu={(e) => {
        e.preventDefault()

        const { onCrossOut } = props

        if (game !== 'nonogram' || props.isAuthoring || !onCrossOut) {
          return
        }

        const isCrossingOut = !crossedOut.isCrossedOut

        onCrossOut(isCrossingOut)
        setCrossedOut({ isCrossedOut: isCrossingOut })
        onCellChanged(gridY, gridX, subGridY, subGridX, false)
      }}

      onMouseEnter={e => {
        const { isAuthoring, isFilling, isCrossingOut } = props

        if (onCellChanged && e.buttons === undefined ? e.which === 1 : e.buttons === 1) {
          onCellChanged(gridY, gridX, subGridY, subGridX, isFilling)

          if (isFilling) {
            setCrossedOut({ isCrossedOut: false })
          }
        } else if (game === 'nonogram' && e.buttons === 2 && !isAuthoring) {
          setCrossedOut({ isCrossedOut: isCrossingOut })

          if (isCrossingOut) {
            onCellChanged(gridY, gridX, subGridY, subGridX, false)
          }
        }
      }}
    >
    </td>
  )
}

Cell.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  onCrossOut: PropTypes.func,
  game: PropTypes.string.isRequired,
  isAuthoring: PropTypes.bool,
  isFilling: PropTypes.bool,
  isCrossingOut: PropTypes.bool,
  isPrinting: PropTypes.bool,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  gridY: PropTypes.number.isRequired,
  gridX: PropTypes.number.isRequired,
  subGridY: PropTypes.number.isRequired,
  subGridX: PropTypes.number.isRequired,
  cellWidthAndHeight: PropTypes.string.isRequired,
  isFilled: PropTypes.number.isRequired
}

export default Cell
