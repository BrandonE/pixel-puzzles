import React from 'react'
import PropTypes from 'prop-types'
import X from '../images/x.svg'
import { decimalToHex } from '../lib/util'

const Cell = props => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const [crossedOut, setCrossedOut] = React.useState({
    isCrossedOut: false
  })

  React.useEffect(() => {
    const handleResize = () => {
      const currentWidth = dimensions.width

      if (
        (currentWidth > verySmallWidth && window.innerWidth <= verySmallWidth) ||
          (currentWidth <= verySmallWidth && window.innerWidth > verySmallWidth)
      ) {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const {
    onCellEdit, onCellChanged, game, isPrinting, gridSize, subGridSize,
    filledColor, emptyColor, gridY, gridX, subGridY, subGridX, isFilled
  } = props

  const windowWidth = dimensions.width
  const verySmallWidth = 600
  let scale
  let minimumWidthAndHeight

  if (game === 'classic') {
    scale = isPrinting ? 50 : 40
    minimumWidthAndHeight = '6px'
  } else if (game === 'nonogram') {
    scale = 75
    minimumWidthAndHeight = '40px'
  }

  const widthAndHeight = ((game === 'classic' || isPrinting) && windowWidth > verySmallWidth)
    ? `${scale / (gridSize * subGridSize)}vw`
    : minimumWidthAndHeight

  return (
    <td
      className="cell"

      style={{
        backgroundColor: crossedOut.isCrossedOut ? undefined : decimalToHex((isFilled) ? filledColor : emptyColor),
        backgroundImage: crossedOut.isCrossedOut ? `url(${X})` : undefined,
        minWidth: widthAndHeight,
        minHeight: widthAndHeight,
        width: widthAndHeight,
        height: widthAndHeight
      }}

      onPointerDown={(e) => {
        // Ignore right-click.
        if (e.button === 2) {
          return
        }

        const { isFilled } = props

        if (onCellEdit) {
          onCellEdit(isFilled)
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
          onCellChanged(gridY, gridX, subGridY, subGridX, false)
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
  gridSize: PropTypes.number.isRequired,
  subGridSize: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  gridY: PropTypes.number.isRequired,
  gridX: PropTypes.number.isRequired,
  subGridY: PropTypes.number.isRequired,
  subGridX: PropTypes.number.isRequired,
  isFilled: PropTypes.number.isRequired
}

export default Cell
