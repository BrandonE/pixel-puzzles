import React from 'react'
import Grid from './components/Grid'
// import SubGrid from './components/SubGrid'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// https://stackoverflow.com/a/10142256/12055600
/*
const shuffleArray = (arr) => {
  let i = arr.length
  let j
  let temp

  if (i === 0) {
    return arr
  }

  while (--i) {
    j = Math.floor(Math.random() * (i + 1))
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  return arr
}
*/

class App extends React.Component {
  constructor () {
    super()

    document.onselectstart = () => false

    document.onmousedown = () => {
      this.setState({
        isUsingMouse: true
      })
    }

    this.state = {
      isFilling: false
    }

    this.onCellEdit = this.onCellEdit.bind(this)
  }

  onCellEdit (filled) {
    this.setState({
      isFilling: !filled
    })
  }

  render () {
    const { isUsingMouse, isFilling } = this.state

    return (
      <div onPointerCancel={this.onPointerCancel}>
        <Grid
          onCellEdit={this.onCellEdit}
          isUsingMouse={isUsingMouse}
          isFilling={isFilling}
          size={8}
          filledColor="#000000"
          unfilledColor="#FFFFFF"
        />
      </div>
    )
  }
}

export default App
