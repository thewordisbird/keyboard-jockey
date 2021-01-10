import {useState, useEffect, useRef } from 'react';
  
const useTimer = (stopTimer) => {
  const [seconds, setSeconds] = useState(0)
  const timerId = useRef()
  
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)
    return () => {
      clearInterval(timerId.current)
    }
  }, [])

  useEffect(() => {
    if (stopTimer) {
      console.log('stoping timer')
      clearInterval(timerId.current)
    }
    
  }, [stopTimer])
  
  return seconds;
}
export default useTimer;