import {useState, useEffect, useRef } from 'react';
  
const useTimer = () => {
  const [seconds, setSeconds] = useState(0)
  const [toggle, setToggle] = useState(false)
  const timerId = useRef()
  
  useEffect(() => {
    if (toggle){
    timerId.current = setInterval(() => {
      setSeconds(seconds => seconds + 1)
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

  const startTimer = () => {
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