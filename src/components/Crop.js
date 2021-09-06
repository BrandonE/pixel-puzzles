import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import ReactCrop from 'react-image-crop'
import { SpinnerComponent } from 'react-element-spinner'
import ScrollArea from 'react-scrollbar'
import 'react-image-crop/dist/ReactCrop.css'

class Crop extends React.Component {
  constructor () {
    super()

    this.state = {
      isCropping: true,
      crop: {}
    }

    this.cropComponentRef = React.createRef()

    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.getCroppedImg = this.getCroppedImg.bind(this)
    this.onCropComplete = this.onCropComplete.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.onAspectChange = this.onAspectChange.bind(this)
  }

  componentDidMount () {
    this.onAspectChange(true)
  }

  onImageLoaded (image) {
    this.imageRef = image
  }

  async getCroppedImg (image, crop, fileName) {
    const canvas = document.createElement('canvas')
    const pixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'))
            return
          }

          blob.name = fileName
          window.URL.revokeObjectURL(this.fileUrl)
          this.fileUrl = window.URL.createObjectURL(blob)
          resolve(this.fileUrl)
        },
        'image/png'
      )
    })
  }

  async onCropComplete (crop) {
    if (this.imageRef && crop.width && crop.height) {
      this.setState({
        isCropping: true
      })

      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.png'
      )

      this.props.onCropProcessed(croppedImageUrl)

      this.setState({
        isCropping: false
      })
    }
  }

  onCropChange (crop, percentCrop) {
    this.setState({ crop: percentCrop })
  }

  onAspectChange (isInitializing) {
    const { width, height } = this.props
    const { crop } = this.state
    const isSquare = !crop.aspect
    let widthPercentage, heightPercentage

    if (isSquare) {
      if (width < height) {
        widthPercentage = 100
        heightPercentage = width / height * 100
      } else {
        heightPercentage = 100
        widthPercentage = height / width * 100
      }
    } else {
      widthPercentage = 100
      heightPercentage = 100
    }

    this.setState({
      crop: {
        unit: '%',
        width: widthPercentage,
        height: heightPercentage,
        x: 0,
        y: 0,
        aspect: (isSquare) ? 1 : undefined
      }
    }, () => {
      if (!isInitializing) {
        this.cropComponentRef.current.onMediaLoaded()
      }
    })
  }

  render () {
    const { imageSrc } = this.props
    const { isCropping, crop } = this.state

    return (
      <div>
        <SpinnerComponent loading={isCropping} position="global" />

        <ScrollArea>
          <ReactCrop
            src={imageSrc}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            ref={this.cropComponentRef}
          />
        </ScrollArea>

        <Form>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox" label="Square Aspect Ratio (1:1)"
              checked={!!crop.aspect} onChange={() => this.onAspectChange()}
            />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

Crop.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onCropProcessed: PropTypes.func.isRequired
}

export default Crop
