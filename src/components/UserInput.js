import React, { useState, useEffect, useRef } from 'react';

function useKeyDown(){
  const [key, setKey] = useState()

  useEffect(() => {
    window.addEventListener('keydown', (e) => setKey(e.key) )
    return () => {
      window.removeEventListener('keydown', (e) => setKey(e.key) )
    }
  }, [])

  return key
}

const UserInput = () => {
  const [input, setInput] = useState('')
  const key = useKeyDown()

  useEffect(() => {
    if (key) {
      setInput(input=> input + key)
    }
  }, [key])
  return (
    <div>{input}</div>
  )


}

export default UserInput