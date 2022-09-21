import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'
import { getXLabelValues, getYLabel } from '../lib/util'

const Grid = props => {
  const {
    onCellEdit, onCellChanged, onCrossOut, getCellWidthAndHeight, game, isAuthoring, isFilling,
    isCrossingOut, isRevealing, isPrinting, gridSize, subGridSize, filledColor, emptyColor,
    solvedColor, unsolvedColor, gridData, noFloat
  } = props

  const cellWidthAndHeight = getCellWidthAndHeight(isPrinting)
  const vw = cellWidthAndHeight.match(/[0-9]\.*[0-9]*vw/)[0]
  const vwValue = parseFloat(vw.split('vw')[0]) / 2
  const fontSize = cellWidthAndHeight.replace(vw, `${vwValue}vw`).replace('40px', '20px')

  return (
    <div
      className="grid"
      style={{
        float: (game === 'classic' && !noFloat) ? 'left' : undefined,
        paddingRight: (game === 'classic') ? '20px' : undefined
      }}
    >
      <table
        style={{
          margin: (game === 'nonogram') ? 'auto' : undefined
        }}
      >
        <tbody>
          {(game === 'classic' || !isAuthoring) && (
            <tr>
              <td></td>

              {Array(gridSize).fill().map((_, colIndex) => (
                  <td
                    key={colIndex}

                    style={{
                      fontSize: (game === 'nonogram') ? fontSize : undefined,
                      verticalAlign: 'bottom',
                      paddingDown: '5px'
                    }}
                  >
                    {getXLabelValues(colIndex, game, gridData, gridSize).map((value, valueIndex) => (
                      <span key={valueIndex}>{value}<br /></span>
                    ))}
                  </td>
              ))}
            </tr>
          )}

          {Array(gridSize).fill().map((_, rowIndex) => (
            <tr key={rowIndex}>
              {(game === 'classic' || !isAuthoring) && (
                <td
                  style={{
                    fontSize: (game === 'nonogram') ? fontSize : undefined,
                    textAlign: 'right',
                    paddingRight: '5px'
                  }}
                >
                  {getYLabel(rowIndex, game, gridData, gridSize)}
                </td>
              )}

              {Array(gridSize).fill().map((_, colIndex) => (
                <SubGrid
                  key={colIndex}
                  onCellEdit={onCellEdit}
                  onCellChanged={onCellChanged}
                  onCrossOut={onCrossOut}
                  game={game}
                  isAuthoring={isAuthoring}
                  isFilling={isFilling}
                  isCrossingOut={isCrossingOut}
                  isRevealing={isRevealing}
                  isPrinting={isPrinting}
                  gridSize={gridSize}
                  subGridSize={subGridSize}
                  filledColor={filledColor}
                  emptyColor={emptyColor}
                  solvedColor={solvedColor}
                  unsolvedColor={unsolvedColor}
                  gridY={rowIndex}
                  gridX={colIndex}
                  cellWidthAndHeight={cellWidthAndHeight}
                  initialSubGridData={gridData[rowIndex][colIndex]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!isAuthoring && game === 'nonogram' && (
        <>
          <p
            style={{
              fontSize,
              textAlign: 'center'
            }}
          ><strong>Grid size: {gridSize}x{gridSize}</strong></p>
        </>
      )}
    </div>
  )
}

Grid.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  onCrossOut: PropTypes.func,
  getCellWidthAndHeight: PropTypes.func.isRequired,
  game: PropTypes.string,
  isAuthoring: PropTypes.bool,
  isFilling: PropTypes.bool,
  isCrossingOut: PropTypes.bool,
  isRevealing: PropTypes.bool,
  isPrinting: PropTypes.bool,
  gridSize: PropTypes.number.isRequired,
  subGridSize: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  solvedColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired,
  noFloat: PropTypes.bool
}

export default Grid
