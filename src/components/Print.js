import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Grid from './Grid'
import Coordinates from './Coordinates'
import Footer from './Footer'

class Print extends React.Component {
  render () {
    const {
      size, filledColor, emptyColor,
      // Don't indicate which boxes are empty to begin with; always use unsolved color.
      unsolvedColor, gridData, coordinatesOrder
    } = this.props

    return (
      <div className="print">
        <Header />

        <div className="grid">
          <Grid
            size={size}
            filledColor={filledColor}
            emptyColor={emptyColor}
            solvedColor={unsolvedColor}
            unsolvedColor={unsolvedColor}
            gridData={gridData}
          />
        </div>

        <Coordinates
          size={size}
          filledColor={filledColor}
          emptyColor={emptyColor}
          solvedColor={unsolvedColor}
          unsolvedColor={unsolvedColor}
          gridData={gridData}
          coordinatesOrder={coordinatesOrder}
        />

        <Footer />
      </div>
    )
  }
}

Print.propTypes = {
  size: PropTypes.number.isRequired,
  filledColor: PropTypes.number.isRequired,
  emptyColor: PropTypes.number.isRequired,
  unsolvedColor: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired,
  coordinatesOrder: PropTypes.array.isRequired
}

export default Print
