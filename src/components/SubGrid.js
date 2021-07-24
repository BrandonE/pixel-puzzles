import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

class SubGrid extends React.Component {
  constructor (props) {
    super()
    const { isAuthoring, size } = props
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

          if (isAuthoring) {
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
    const { isAuthoring } = this.props
    const { subGridData, subGridFilling } = this.state

    if (isAuthoring) {
      subGridData[subGridY][subGridX] = (value) ? 1 : 0
      subGridFilling[subGridY][subGridX] = subGridData[subGridY][subGridX]
      this.props.onCellChanged(gridY, gridX, subGridY, subGridX, value)
    }

    subGridFilling[subGridY][subGridX] = (value) ? 1 : 0

    this.setState({
      subGridData,
      subGridFilling
    })
  }

  isSolved () {
    const { subGridData, subGridFilling } = this.state
    console.log(JSON.stringify(subGridData))
    console.log(JSON.stringify(subGridFilling))

    console.log(JSON.stringify(subGridData) === JSON.stringify(subGridFilling))
    return (JSON.stringify(subGridData) === JSON.stringify(subGridFilling))
  }

  render () {
    const {
      onCellEdit, isUsingMouse, isFilling, filledColor, emptyColor,
      solvedColor, unsolvedColor, gridY, gridX
    } = this.props

    console.log(solvedColor, unsolvedColor)
    const { subGridFilling } = this.state

    return (
      <td
        className="subGrid"
        style={{ border: `1px solid ${this.isSolved() ? solvedColor : unsolvedColor}` }}
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
  isAuthoring: PropTypes.bool.isRequired,
  isUsingMouse: PropTypes.bool.isRequired,
  isFilling: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.string.isRequired,
  emptyColor: PropTypes.string.isRequired,
  solvedColor: PropTypes.string.isRequired,
  unsolvedColor: PropTypes.string.isRequired,
  gridY: PropTypes.number.isRequired,
  gridX: PropTypes.number.isRequired,
  initialSubGridData: PropTypes.array
}

export default SubGrid
