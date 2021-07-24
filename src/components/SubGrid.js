import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

class SubGrid extends React.Component {
  constructor (props) {
    super()
    const { size } = props
    let { subGridData } = props

    if (!subGridData) {
      subGridData = []

      for (let subGridY = 0; subGridY < size; subGridY++) {
        const subGridRow = []

        for (let subGridX = 0; subGridX < size; subGridX++) {
          subGridRow.push(0)
        }

        subGridData.push(subGridRow)
      }
    }

    this.state = {
      subGridData
    }

    this.onCellChanged = this.onCellChanged.bind(this)
  }

  onCellChanged (gridY, gridX, subGridY, subGridX, value) {
    // This function will not be defined for read-only subgrid coordinates. Do not edit these cells.
    if (this.props.onCellChanged) {
      const { subGridData } = this.state
      subGridData[subGridY][subGridX] = (value) ? 1 : 0

      this.setState({
        subGridData
      })

      this.props.onCellChanged(gridY, gridX, subGridY, subGridX, value)
    }
  }

  render () {
    const { onCellEdit, isUsingMouse, isFilling, filledColor, emptyColor, gridY, gridX } = this.props
    const { subGridData } = this.state

    return (
      <td className="subGrid">
        <table>
          <tbody>
            {subGridData.map((subGridRow, rowIndex) => (
              <tr key={rowIndex}>
                {subGridRow.map((isFilled, colIndex) => (
                  <Cell
                    key={colIndex}
                    onCellEdit={onCellEdit}
                    onCellChanged={this.onCellChanged}
                    isUsingMouse={isUsingMouse}
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
  isUsingMouse: PropTypes.bool.isRequired,
  isFilling: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.string.isRequired,
  emptyColor: PropTypes.string.isRequired,
  gridY: PropTypes.number.isRequired,
  gridX: PropTypes.number.isRequired,
  subGridData: PropTypes.array
}

export default SubGrid
