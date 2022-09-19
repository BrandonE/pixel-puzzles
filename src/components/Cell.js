import React from 'react'
import PropTypes from 'prop-types'
import { decimalToHex } from '../lib/util'

const Cell = props => {
  const verySmallWidth = 600

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
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
  const scale = (isPrinting) ? 50 : 40
  let widthAndHeight

  if (game === 'classic') {
    widthAndHeight = (windowWidth > verySmallWidth) ? `${scale / (gridSize * subGridSize)}vw` : '6px'
  } else if (game === 'nonogram') {
    widthAndHeight = `${scale / (20)}em`
  }

  return (
    <td
      className="cell"

      style={{
        backgroundColor: decimalToHex((isFilled) ? filledColor : emptyColor),
        minWidth: widthAndHeight,
        minHeight: widthAndHeight,
        width: widthAndHeight,
        height: widthAndHeight
      }}

      onPointerDown={() => {
        const { isFilled } = props

        if (onCellEdit) {
          onCellEdit(isFilled)
        }

        if (onCellChanged) {
          onCellChanged(gridY, gridX, subGridY, subGridX, !isFilled)
        }
      }}

      onMouseEnter={e => {
        const { isFilling } = props

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
  game: PropTypes.string,
  isFilling: PropTypes.bool,
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
