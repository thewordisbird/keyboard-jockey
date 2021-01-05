import React, { useState, useEffect } from 'react';

const StatusBar = ({ avitar }) => {
  const [pos, setPos] = useState(0)
  const [inc, setInc] = useState(10)

  // TODO: Make position a scale to cover the entire box for dynamic sizing
  // TODO: Make unique refrence for the component so multiple components can be run at the same time

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
    document.getElementById("animate").animate([
      { transform: `translateX(${pos}px)`}
    ], {
      duration: 1000,
      fill: "forwards"
      },
    )
  }, [pos])

  return (
    <>
      <div className="App-status-bar">
        <div id="animate" className="App-animate-avitar"></div>
      </div>
      <button onClick={handleClick}>Click to Move</button>
    </>
  )
}

export default StatusBar;