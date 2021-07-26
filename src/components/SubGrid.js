import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'
import { decimalToHex } from '../lib/util'

class SubGrid extends React.Component {
  constructor (props) {
    super()
    const { isAuthoring, isCoordinate, size } = props
    const { initialSubGridData } = props

    const subGridData = []
    const subGridFilling = []

    for (let subGridY = 0; subGridY < size; subGridY++) {
      const subGridDataRow = []
      const subGridFillingRow = []

      for (let subGridX = 0; subGridX < size; subGridX++) {
        if (initialSubGridData) {
          const initialValue = initialSubGridData[subGridY][subGridX]

          subGridDataRow.push(initialValue)

          if (isAuthoring || isCoordinate) {
            subGridFillingRow.push(initialValue)
          } else {
            subGridFillingRow.push(0)
          }
        } else {
          subGridDataRow.push(0)
          subGridFillingRow.push(0)
        }
      }

      subGridData.push(subGridDataRow)
      subGridFilling.push(subGridFillingRow)
    }

    this.state = {
      subGridData,
      subGridFilling
    }

    this.onCellChanged = this.onCellChanged.bind(this)
    this.isSolved = this.isSolved.bind(this)
  }

  onCellChanged (gridY, gridX, subGridY, subGridX, value) {
    const { onCellChanged, isAuthoring, isCoordinate } = this.props
    const { subGridData, subGridFilling } = this.state

    if (!isCoordinate && onCellChanged) {
      if (isAuthoring) {
        subGridData[subGridY][subGridX] = (value) ? 1 : 0
        subGridFilling[subGridY][subGridX] = subGridData[subGridY][subGridX]
        onCellChanged(gridY, gridX, subGridY, subGridX, value)
      }

      subGridFilling[subGridY][subGridX] = (value) ? 1 : 0
    }

    this.setState({
      subGridData,
      subGridFilling
    })
  }

  isSolved () {
    const { isAuthoring, isCoordinate } = this.props
    const { subGridData, subGridFilling } = this.state
    return (!isAuthoring && !isCoordinate && JSON.stringify(subGridData) === JSON.stringify(subGridFilling))
  }

  render () {
    const {
      onCellEdit, isFilling, filledColor, emptyColor,
      solvedColor, unsolvedColor, gridY, gridX
    } = this.props
    const { subGridFilling } = this.state

    return (
      <td
        className="subGrid"
        style={{ border: `1px solid ${decimalToHex(this.isSolved() ? solvedColor : unsolvedColor)}` }}
      >
        <table>
          <tbody>
            {subGridFilling.map((subGridFillingRow, rowIndex) => (
              <tr key={rowIndex}>
                {subGridFillingRow.map((isFilled, colIndex) => (
                  <Cell
                    key={colIndex}
                    onCellEdit={onCellEdit}
                    onCellChanged={this.onCellChanged}
                    isFilling={isFilling}
                    filledColor={filledColor}
                    emptyColor={emptyColor}
                    gridY={gridY}
                    gridX={gridX}
                    subGridY={rowIndex}
                    subGridX={colIndex}
                    isFilled={isFilled}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    )
  }
}

SubGrid.propTypes = {
  onCellEdit: PropTypes.func,
  onCellChanged: PropTypes.func,
  isAuthoring: PropTypes.bool,
  isCoordinate: PropTypes.bool,
  isFilling: PropTypes.bool,
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  solvedColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridY: PropTypes.number.isRequired,
  gridX: PropTypes.number.isRequired,
  initialSubGridData: PropTypes.array
}

export default SubGrid
