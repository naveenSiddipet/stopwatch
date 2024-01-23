// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    count: 25,
    status: true,
    minutescounter: 1500,
    secondscounter: 60,
    isDisabled: false,
  }

  reset = () => {
    this.setState({
      staus: true,
      minutes: 25,
      seconds: 0,
      count: 25,
      minutescounter: 1500,
      secondscounter: 60,
      isDisabled: false,
    })
  }

  start = () => {
    const {status} = this.state
    if (status === true) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
      this.setState({status: true, isDisabled: true})
    }
  }

  tick = () => {
    const {secondscounter} = this.state
    if (secondscounter === 0) {
      this.setState(previous => ({
        status: false,
        seconds: 59,
        secondscounter: 59,
        minutes: Math.floor((previous.minutescounter - 1) / 60),
        minutescounter: previous.minutescounter - 1,
        isDisabled: true,
      }))
    }
    this.setState(previous => ({
      status: false,
      seconds: previous.secondscounter - 1,
      secondscounter: previous.secondscounter - 1,
      minutes: Math.floor((previous.minutescounter - 1) / 60),
      minutescounter: previous.minutescounter - 1,
      isDisabled: true,
    }))
  }

  increment = () => {
    this.setState(previous => ({
      minutes: previous.minutes + 1,
      count: previous.count + 1,
      minutescounter: previous.minutescounter + 60,
    }))
  }

  decrement = () => {
    this.setState(previous => ({
      minutes: previous.minutes - 1,
      count: previous.count - 1,
      minutescounter: previous.minutescounter - 60,
    }))
  }

  render() {
    const {minutes, seconds, count, status, isDisabled} = this.state
    const imageUrl = status
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const altText = status ? 'play icon' : 'pause icon'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="bottom">
          <div className="imageE">
            <div className="timer">
              <h1 className="minutes">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="status">{status ? 'Paused' : 'Running'}</p>
            </div>
          </div>
          <div className="card2">
            <div className="nav1">
              <div className="insidenav">
                <button type="button" onClick={this.start}>
                  <img src={imageUrl} alt={altText} className="icon" />

                  <p> {status ? 'Start' : 'Pause'} </p>
                </button>

                <button type="button" onClick={this.reset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                  <p className="textnav">Reset</p>
                </button>
              </div>
            </div>
            <p className="set">Set Timer Limit</p>
            <div className="nav2">
              <button
                className="symbol"
                onClick={this.decrement}
                disabled={isDisabled}
              >
                -
              </button>
              <p className="count">{count}</p>
              <button
                className="symbol"
                onClick={this.increment}
                disabled={isDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
