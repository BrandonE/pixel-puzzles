import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error) {
    this.setState({ hasError: true })
    this.props.onError(error)
  }

  render () {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <Button variant="primary" type="submit" onClick={() => window.location.reload(false)}>Reload application</Button>
        </>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onError: PropTypes.func.isRequired
}

export default ErrorBoundary
