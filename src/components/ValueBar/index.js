import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { throttle } from 'lodash'

const Bar = styled.canvas`
  background: #222;
  cursor: pointer;
`

class ParamBar extends React.Component {

  constructor (props) {
    super(props)

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.setSize = this.setSize.bind(this)
  }

  componentDidMount () {
    this.containerEl = this.canvas.parentElement
    this.width = this.canvas.width = this.containerEl.offsetWidth
    this.height = this.canvas.height = 16

    this.setSize()
    this.draw(this.props.value)

    window.addEventListener('resize', e => {
      e.preventDefault()
      this.setSize()
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setSize)
  }

  setSize () {
    this.canvas.width = 0
    this.width = this.canvas.width = this.containerEl.offsetWidth
    this.draw(this.props.value)
  }

  componentWillReceiveProps (nextProps) {
    this.draw(nextProps.value, this.props.value)
  }

  handleMouseDown (e) {
    this.pos = e.nativeEvent.screenX
    this.currentValue = this.props.value

    const onMouseUp = (e) => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', this.handleMouseMove)
    }

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  handleMouseMove (e) {
    const diff = (e.screenX - this.pos) / this.width
    const newVal = Math.max(0, Math.min(1, this.currentValue + diff))
    this.props.onChange(newVal)
  }

  draw = throttle((newVal) => {
    const barWidth = 2
    const innerWidth = this.width - barWidth
    const pos = innerWidth * newVal
    const context = this.canvas.getContext('2d')
    context.fillStyle = '#FFFFFF'

    if (this.oldVal) {
      const oldPos = innerWidth * this.oldVal
        // Only clear the area from the last position
      context.clearRect(oldPos - 1, 0, barWidth + 2, this.height)
    } else {
      context.clearRect(0, 0, this.width, this.height)
    }

    this.oldVal = newVal

    // Draw bar at new position
    context.fillRect(pos, 0, barWidth, this.height)
  }, 50)

  render () {
    return (
      <div>
        <Bar
          innerRef={node => { this.canvas = node }}
          onMouseDown={this.props.onMouseDown || this.handleMouseDown}
        />
      </div>
    )
  }
}

ParamBar.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func
}

export default ParamBar
