import {useState, useEffect, useRef } from 'react';
  
const useCountDown = (countFrom) => {
  const [seconds, setSeconds] = useState(countFrom)
  const timerId = useRef()
  
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds(seconds => seconds - 1)
    }, 1000)
    return () => {
      clearInterval(timerId.current)
    }
  }, [])

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timerId.current)
    }
  }, [seconds])
  
  return seconds;
}
export default useCountDown;