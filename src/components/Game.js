import React, {useState, useEffect } from 'react';

const Game = ({ passage }) => {
  const [gameState, setGameState] = useState({
    display: '',
    inputString: '',
    error: false,
    errorIndex: -1
  })

  // On keydown effect
  useEffect(() => {
    // Create event listener to monitor keydown event on keyboard
    // Add the key to state
    const KEYS = 
      { 
        doNothing: [
         "Shift",
         'CapLocks',
         'Tab',
         'Control',
         'Alt',
         'Meta',
         'Enter',
         'Home',
         'End',
         'PageUp',
         'PageDown',
         'ArrowUp',
         'ArrowDown'
       ],
       remove: [
         'Backspace',
         'Delete',
         'Clear'
       ],
       move: [
         'ArrowRight',
         'ArrowLeft',
       ]
     }

    const mapKey = (e) => {
      if (KEYS.doNothing.includes(e.key)) {
        console.log('do nothing')
      }
      else if (KEYS.remove.includes(e.key)) {
        switch (e.key){
          case 'Backspace':
            setGameState(state => (
              {
                ...state,
                inputString: state.inputString.slice(0, -1),
                display: state.display.length > 0 ? state.display.slice(0, -1) : state.display
              }
            ))
            break;
          default:
            break;

        }
      } else if (KEYS.move.includes(e.key)){
        console.log('move')
      }
      else{
        setGameState(state => (
          {
            ...state,
            inputString: state.inputString + e.key,
            display: state.display + e.key
          }
        ))
      }

    }
    window.addEventListener('keydown', (e) => mapKey(e))
    return () => {
      window.removeEventListener('keydown', (e) => mapKey(e))
    }
  }, [])

  // Validate inpute effect
 useEffect(() => {
   const {inputString, error} = gameState;
   if (!error && passage.slice(0, inputString.length) !== inputString) {
     // Trigger Error
      setGameState(state => (
        {
          ...state,
          error: true,
          errorIndex: inputString.length - 1
        }
      ))
   } else if (error && passage.slice(0, inputString.length) === inputString){
    // Clear Error
    setGameState(state => (
      {
        ...state,
        error: false,
        errorIndex: - 1
      }
    ))
   }
 }, [gameState.inputString])

 // Reset Input
 useEffect(() => {
   const { error, display } = gameState;
   if (!error && display.slice(-1) === ' ') {
     setGameState(state => (
       {
         ...state,
         display: ''
       }
     ))
   }
 }, [gameState.display])

  return (
    <div className="App-passage">
      <div className="App-passage-text">
        { gameState.error
          ? (
            <>
            <span style={{background: 'lightgreen'}}>{passage.slice(0, gameState.errorIndex)}</span>
            <span style={{background: 'lightpink'}}>{passage.slice(gameState.errorIndex, gameState.inputString.length)}</span>
            </>
          )
        : (
          <span style={{background: 'lightgreen'}}>{passage.slice(0, gameState.inputString.length)}</span>
        )}
        {passage.slice(gameState.inputString.length)}
      </div>
      <div className="App-passage-input">
        <input type="text" value={gameState.display} readOnly/>
  
      </div>
      
    </div>
  )
}

export default Game;