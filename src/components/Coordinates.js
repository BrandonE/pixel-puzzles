import React from 'react'
import PropTypes from 'prop-types'
import SubGrid from './SubGrid'
import { getCoordinateLabel } from '../lib/util'

const Coordinates = props => {
  const { size, filledColor, emptyColor, solvedColor, unsolvedColor, gridData, coordinatesOrder } = props

  return (
    coordinatesOrder.map((coordinates, index) => {
      const { x, y } = coordinates

      return (
        <table className="coordinates" key={index}>
          <tbody>
            <tr>
              <td>{getCoordinateLabel(x, y)}</td>
            </tr>
            <tr>
              <SubGrid
                isCoordinate={true}
                size={size}
                filledColor={filledColor}
                emptyColor={emptyColor}
                solvedColor={solvedColor}
                unsolvedColor={unsolvedColor}
                gridY={y}
                gridX={x}
                initialSubGridData={gridData[y][x]}
              />
            </tr>
          </tbody>
        </table>
      )
    })
  )
}

Coordinates.propTypes = {
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  solvedColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired,
  coordinatesOrder: PropTypes.array.isRequired
}

export default Coordinates
