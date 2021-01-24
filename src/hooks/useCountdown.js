import {useState, useEffect, useRef } from 'react';
  
const useCountDown = () => {
  const [seconds, setSeconds] = useState(null)
  const [toggle, setToggle] = useState(false)
  const timerId = useRef()
  
  useEffect(() => {
    timerId.current = setInterval(() => {
      if (toggle) {
        setSeconds(seconds => seconds - 1);
      }
    }, 1000)
    return () => {
      clearInterval(timerId.current);
    }
  }, [toggle])

  useEffect(() => {
    if (seconds === -2) {
      setToggle(false);
      setSeconds(null);
      clearInterval(timerId.current);
    }
  }, [seconds])
  
  const startCountDown = (startTime) => {
    setSeconds(startTime);
    setToggle(true);
  };

  const countDownStatus = () => {
    return toggle;
  };

  return (
    {
      countDownTime: seconds,
      startCountDown: startCountDown,
      countDownStatus: countDownStatus
    }
  );
}

export default useCountDown;