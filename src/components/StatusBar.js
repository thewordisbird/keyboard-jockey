import React, { useState, useEffect, useRef } from 'react';


const StatusBar = ({ children }) => {
  const [pos, setPos] = useState(0)
  const [inc, setInc] = useState(10)

  // TODO: Make position a scale to cover the entire box for dynamic sizing
  const buttonEl = useRef()
  const animateEl = useRef()
  const handleClick = () => {
    // Move increment the position by the increment
    setPos(p => {
      if (p + inc > 370){
        return 370
      } else {
        return p + inc
      }
    })
  }

  useEffect(() => {
    // animate element movement from current pos to state pos
    animateEl.current.animate([
      { transform: `translateX(${pos}px)`}
    ], {
      duration: 1000,
      fill: "forwards"
      },
    )
  }, [pos])
  
  return (
    <div className="App-track">
      <div className="App-status-bar">
        <div ref={animateEl} className="App-animate-avitar">{ children }</div>
      </div>
      <div>
        <button ref={buttonEl} onClick={handleClick}>Click to Move</button>
      </div>
      
    </div>
  )
}

export default StatusBar;