import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GameStatus from './GameStatus';
import GamePassage from './GamePassage';
import GameInput from './GameInput';
import GameTimer from './GameTimer';

const Game = ({ passage }) => {
  const [gameState, setGameState] = useState({
    display: '',
    inputString: '',
    error: false,
    errorIndex: -1,
    finished: false
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

 // Finish game
 useEffect(() => {
   if (gameState.inputString === passage){
     setGameState(state => (
       {
         ...state,
         display: '',
         finished: true,
       }
     ))
   }
 }, [gameState.inputString])

  return (
    <div className="App-game">
      <GameTimer stopTimer={gameState.finished}/>
      <GameStatus passageLength={passage.length} position={gameState.error ? gameState.errorIndex : gameState.inputString.length}>
        <i className="fas fa-truck-pickup fa-3x"/>
      </GameStatus>
      <div className="App-passage">
        <GamePassage passage={passage} inputLength={gameState.inputString.length} error={gameState.error} errorIndex={gameState.errorIndex} />
        <GameInput display={gameState.display} error={gameState.error} /> 
      </div>
    </div>
  )
}
Game.propTypes = {
  passage: PropTypes.string.isRequired
}
export default Game;