import React, {useState, useEffect, useRef } from 'react';
const GameTimer = ({stopTimer}) =>{
  const [seconds, setSeconds] = useState(0)
  const timerId = useRef()
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)
    return () => {
      console.log('cleared Timer')
      clearInterval(timerId.current)
    }
  }, [])

  useEffect(() => {
    if (stopTimer) {
      console.log('stoping timer')
    clearInterval(timerId.current)
    }
    
  }, [stopTimer])

  return (
    <div className="App-timer">
      {Math.floor(seconds/60)}:{seconds % 60}
    </div>
  )
}

export default GameTimer;