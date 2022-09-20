import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = props => (
  <Row className="footer">
    <Col>
      Created by <a href="https://github.com/BrandonE" target="_blank" rel="noreferrer">Brandon Evans</a>

      {props.game === 'classic' && (
        <>
          .&nbsp;Inspired by <a href="https://web.archive.org/web/20111027002447/http://www.tipstricks.com/puzzles.html" target="_blank" rel="noreferrer">Pencil Puzzles</a> from <a href="https://en.wikipedia.org/wiki/Tips_%26_Tricks_(magazine)">Tips &amp; Tricks Magazine</a>
        </>
      )}

      &nbsp; <a href="https://github.com/BrandonE/pixel-puzzles" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a>
    </Col>
  </Row>
)

Footer.propTypes = {
  game: PropTypes.string.isRequired
}

export default Footer
