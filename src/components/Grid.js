import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'
import { getXLabelValues, getYLabel } from '../lib/util'

const Grid = props => {
  const {
    onCellEdit, onCellChanged, game, isAuthoring, isFilling, isRevealing, isPrinting,
    gridSize, subGridSize, filledColor, emptyColor, solvedColor, unsolvedColor, gridData
  } = props

  return (
    <table>
      <tbody>
        {(game === 'classic' || !isAuthoring) && (
          <tr>
            <td></td>

            {Array(gridSize).fill().map((_, colIndex) => (
                <td key={colIndex}>
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
              <td>{getYLabel(rowIndex, game, gridData, gridSize)}</td>
            )}

            {Array(gridSize).fill().map((_, colIndex) => (
              <SubGrid
                key={colIndex}
                onCellEdit={onCellEdit}
                onCellChanged={onCellChanged}
                game={game}
                isAuthoring={isAuthoring}
                isFilling={isFilling}
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
                initialSubGridData={gridData[rowIndex][colIndex]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Grid.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  game: PropTypes.string,
  isAuthoring: PropTypes.bool,
  isFilling: PropTypes.bool,
  isRevealing: PropTypes.bool,
  isPrinting: PropTypes.bool,
  gridSize: PropTypes.number.isRequired,
  subGridSize: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  solvedColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired
}

export default Grid
