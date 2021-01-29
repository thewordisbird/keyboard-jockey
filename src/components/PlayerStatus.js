import React, { useEffect, useRef } from 'react';

import PlayerStats from './PlayerStats';

const PlayerStatus = ({ player, passageLength, children }) => {
 
  const increment = 1/passageLength

  // TODO: Make position a scale to cover the entire box for dynamic sizing
  const statusBarEl = useRef();
  const animateEl = useRef();
  
  useEffect(() => {
    const width = statusBarEl.current.clientWidth
    const scaledPosition = player.progress * increment * width
    // animate element movement from current pos to state pos
    animateEl.current.animate([
      { transform: `translateX(${scaledPosition}px)`}
    ], {
      duration: 1000,
      fill: "forwards"
      },
    )
  }, [player.progress, statusBarEl])
  
  return (
    <div className="App-player-status">
      <div className="App-track">
        <div ref={statusBarEl} className="App-status-bar">
          <div ref={animateEl} className="App-animate-avitar">{ children }</div>
        </div>
      </div>
      <PlayerStats pace={player.pace} />
    </div>
 
    
  )
}

export default PlayerStatus;