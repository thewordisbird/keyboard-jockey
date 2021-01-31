import {useState, useEffect, useRef } from 'react';
  
const useTimer = () => {
  const [seconds, setSeconds] = useState(null)
  const [toggle, setToggle] = useState(false)
  const timerId = useRef()
  
  useEffect(() => {
    if (toggle){
    timerId.current = setInterval(() => {
      setSeconds(seconds => {
        
        return seconds + 1 
      })
    }, 1000)}
    return () => {
      clearInterval(timerId.current)
    }
  }, [toggle])

  useEffect(() => {
    if (!toggle) {
      console.log('stoping timer')
      clearInterval(timerId.current)
    }
  }, [toggle])

  const startTimer = (startTime=0) => {
    setSeconds(startTime)
    setToggle(true)
  }

  const stopTimer = () => {
    setToggle(false)
  }
  return (
      {
      time: seconds,
      startTimer: startTimer,
      stopTimer: stopTimer
    }
  )
}
export default useTimer;