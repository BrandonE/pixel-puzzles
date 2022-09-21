import React from 'react'
import PropTypes from 'prop-types'

const Header = props => (
  <>
    {props.game === 'classic' && (
      <>
        <h1>Pixel Puzzles - Classic</h1>
        <h4>Copy each square&apos;s pattern to the associated coordinates to reveal a secret image!</h4>
      </>
    )}

    {props.game === 'nonogram' && (
      <>
        <h1>Pixel Puzzles - Nonogram</h1>
        <h4>
          Solve the {props.isPrinting && <>Nonogram</>} {!props.isPrinting && <a href="https://en.wikipedia.org/wiki/Nonogram">Nonogram</a>} to reveal a secret image!&nbsp;

          {!props.isPrinting && (
            <a href="https://www.youtube.com/watch?v=zisu0Qf4TAI">Nonogram Tutorial</a>
          )}
        </h4>
      </>
    )}

    <h6>Fill the grid in your browser or print the puzzle to complete by hand. Edit the puzzle or generate your own using any image. Share puzzles with your friends and family! {props.isPrinting && <>https://brandone.github.io/pixel-puzzles/</>}</h6>

    {!props.isPrinting && (
      <>
        {props.changeGame && props.game === 'classic' && (
          <>
            <h6><strong>Left-click to fill or unfill a cell</strong></h6>
            <br />
            <h4>
              <a href="" onClick={e => {
                e.preventDefault()
                props.changeGame('nonogram')
              }}>Switch to Nonogram mode</a>
            </h4>
          </>
        )}

        {props.changeGame && props.game === 'nonogram' && (
          <>
            <h6><strong>Left-click to fill or unfill a cell. Right-click to cross out or uncross out a cell</strong></h6>
            <br />
            <h4>
              <a href="" onClick={e => {
                e.preventDefault()
                props.changeGame('classic')
              }}>Switch to Classic mode</a>
            </h4>
          </>
        )}
      </>
    )}
  </>
)

Header.propTypes = {
  changeGame: PropTypes.func,
  game: PropTypes.string.isRequired,
  isPrinting: PropTypes.bool
}

export default Header
