import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap'

const Buttons = props => {
  const {
    changeMode, clear, revealSolution, invert, importImage, exportImage,
    share, resizeCanvas, print, isAuthoring, gridData
  } = props

  return (
    <>
      {isAuthoring && (
        <>
          <Row>
            <Col>
              <DropdownButton title="Resize Canvas">
                { /* Sizes allowed are 3-9 */ }
                {Array(9).fill(0).map((_, i) => i + 1).filter(
                  size => size >= 3 && size !== gridData.length
                ).map(size => (
                  <Dropdown.Item
                    key={size}
                    onSelect={() => resizeCanvas(size)}
                  >
                    {size}<sup>4</sup>
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Button onClick={invert}>Invert</Button>
            </Col>
          </Row>

          <Row>
            <Form.Label>Import from Image</Form.Label>
            <Form.Control
              type="file" name="files"
              accept=".bmp, .gif, .jpg, .jpeg, .png, .tiff"
              onChange={importImage}
            />
          </Row>

          <Row>
            <Col>
              <Button onClick={exportImage}>Export as Image</Button>
            </Col>
          </Row>
        </>
      )}

      {!isAuthoring && (
        <div>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Button variant="warning" onClick={revealSolution}>Reveal Solution</Button>
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}

      <Row>
        <Col>
          <Button variant="danger" onClick={clear}>Clear</Button>
          <Button variant="danger" onClick={changeMode}>{(isAuthoring) ? 'Play' : 'Edit'}</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button onClick={print}>Print</Button>
          <Button onClick={share}>Share</Button>
        </Col>
      </Row>
    </>
  )
}

Buttons.propTypes = {
  changeMode: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  revealSolution: PropTypes.func.isRequired,
  invert: PropTypes.func.isRequired,
  importImage: PropTypes.func.isRequired,
  exportImage: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
  resizeCanvas: PropTypes.func.isRequired,
  print: PropTypes.func.isRequired,
  isAuthoring: PropTypes.bool,
  gridData: PropTypes.array.isRequired
}

export default Buttons
