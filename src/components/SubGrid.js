import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

class SubGrid extends React.Component {
  constructor (props) {
    super()
    const { size } = props
    const subGridData = []

    for (let subGridY = 0; subGridY < size; subGridY++) {
      const subGridRow = []

      for (let subGridX = 0; subGridX < size; subGridX++) {
        subGridRow.push(false)
      }

      subGridData.push(subGridRow)
    }

    this.state = {
      subGridData
    }

    this.onCellChanged = this.onCellChanged.bind(this)
  }

  onCellChanged (subGridY, subGridX, value) {
    const { subGridData } = this.state
    subGridData[subGridY][subGridX] = value

    this.setState({
      subGridData
    })
  }

  render () {
    const { onCellEdit, isUsingMouse, isFilling, filledColor, emptyColor } = this.props
    const { subGridData } = this.state

    return (
      <table>
        <tbody>
          {subGridData.map((subGridRow, rowIndex) => (
            <tr key={rowIndex}>
              {subGridRow.map((isFilled, colIndex) => (
                <td key={colIndex}>
                  <Cell
                    onCellEdit={onCellEdit}
                    onCellChanged={this.onCellChanged}
                    isUsingMouse={isUsingMouse}
                    isFilling={isFilling}
                    filledColor={filledColor}
                    emptyColor={emptyColor}
                    subGridY={rowIndex}
                    subGridX={colIndex}
                    isFilled={isFilled}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

SubGrid.propTypes = {
  onCellEdit: PropTypes.func,
  isUsingMouse: PropTypes.bool,
  isFilling: PropTypes.bool,
  size: PropTypes.number,
  onCellChanged: PropTypes.func,
  filledColor: PropTypes.string,
  emptyColor: PropTypes.string
}

export default SubGrid
