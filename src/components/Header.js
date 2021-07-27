import React from 'react'
import PropTypes from 'prop-types'

const Header = props => (
  <>
    <h1>Pixel Puzzles</h1>
    <h4>Copy each square&apos;s pattern to the associated coordinates to reveal a secret image!</h4>
    <h6>Fill the grid in your browser or print the puzzle to complete by hand. Edit the puzzle or generate your own using any image. Share puzzles with your friends and family! {props.showUrl && <>https://brandone.github.io/pixel-puzzles/</>}</h6>
  </>
)

Header.propTypes = {
  showUrl: PropTypes.bool
}

export default Header
