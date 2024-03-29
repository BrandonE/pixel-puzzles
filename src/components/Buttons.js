import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap'

const Buttons = props => {
  const {
    game, changeMode, clear, revealSolution, invert, importImage, exportImage,
    share, resizeGrids, print, isAuthoring, isReadOnly,
    gridSizeMin, gridSizeMax, subGridSizeMin, subGridSizeMax,
    nonogramGridSizeMin, nonogramGridSizeMax, gridData
  } = props

  const gridSize = gridData.length
  const subGridSize = gridData[0][0].length

  return (
    <>
      {isAuthoring && (
        <>
          <Row>
            <Col>
              <DropdownButton title="Resize Grid">
                {Array((game === 'classic') ? gridSizeMax : nonogramGridSizeMax).fill(0).map((_, i) => i + 1).filter(
                  size => size >= ((game === 'classic') ? gridSizeMin : nonogramGridSizeMin) && size !== gridSize
                ).map(size => (
                  <Dropdown.Item
                    key={size}
                    onSelect={() => resizeGrids(size, subGridSize)}
                  >
                    {size}x{size}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              {game === 'classic' && (
                <DropdownButton title="Resize Sub-Grid">
                { /* Sizes allowed are 2-9 */ }
                {Array(subGridSizeMax).fill(0).map((_, i) => i + 1).filter(
                  size => size >= subGridSizeMin && size !== subGridSize
                ).map(size => (
                  <Dropdown.Item
                    key={size}
                    onSelect={() => resizeGrids(gridSize, size)}
                  >
                    {size}x{size}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              )}
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

      {!isAuthoring && !isReadOnly && (
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Button variant="warning" onClick={revealSolution}>Reveal Solution</Button>
            </Form.Group>
          </Col>
        </Row>
      )}

      {!isReadOnly && (
        <Row>
          <Col>
            <Button variant="danger" onClick={clear}>Clear</Button>
            <Button variant="danger" onClick={changeMode}>{(isAuthoring) ? 'Play' : 'Edit'}</Button>
          </Col>
        </Row>
      )}

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
  game: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  revealSolution: PropTypes.func.isRequired,
  invert: PropTypes.func.isRequired,
  importImage: PropTypes.func.isRequired,
  exportImage: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
  resizeGrids: PropTypes.func.isRequired,
  print: PropTypes.func.isRequired,
  isAuthoring: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  gridSizeMin: PropTypes.number.isRequired,
  gridSizeMax: PropTypes.number.isRequired,
  subGridSizeMin: PropTypes.number.isRequired,
  subGridSizeMax: PropTypes.number.isRequired,
  nonogramGridSizeMin: PropTypes.number.isRequired,
  nonogramGridSizeMax: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired
}

export default Buttons
