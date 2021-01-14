import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GameStatus from './GameStatus';
import PlayerStats from './PlayerStats'
import GamePassage from './GamePassage';
import GameInput from './GameInput';
import GameTimer from './GameTimer';

import useTimer from '../hooks/useTimer';
// import StartGame from './StartGame';
// import useCountDown from '../hooks/useCountdown';

const Game = ({ passage }) => {
  const [gameState, setGameState] = useState({
    validatedInput: '', // Input string that has been cleared on a space
    activeInput:'', // Value shown in input
    passageIdx: 0,
    error: false,
    errorIndex: -1,
    initGame: false,
    finished: false,
    wordCount: 0,    
  })

  const handleStartGame = () => {
    setGameState(state => (
      {
        ...state,
        initGame: true
      }
    ))
  }

  const time = useTimer(gameState.finished)

 const validateInput = (inputString) => {
    if (!gameState.error && passage.slice(0, inputString.length) !== inputString) {
      return false
    } else {
      return true
    }
  }

  const findError = (inputString) => {
    // Find error. Because the user could move around in the input,
      // it might not be the last character, but it will be in the last word.
      let idx = gameState.validatedInput.length;
      console.log('start idx', idx)
      while (idx < inputString.length && passage.slice(0, idx + 1) === inputString.slice(0,idx + 1)) {
        idx++
      }
      return idx
  }

  const handleInput = (e) => {
    const inputString = gameState.validatedInput + e.target.value
    
    if (validateInput(inputString)) {
      if (e.target.value.slice(-1) === ' '){
        // Clear valid word input
        setGameState(state => (
          {
            ...state,
            validatedInput: inputString,
            passageIdx: inputString.length,
            error: false,
            errorIdx: -1
          }
        ))
        // Clear Input

      } else {
        // Increment passageIdx and clear errors if any
        setGameState(state => (
          {
            ...state, 
            passageIdx: inputString.length,
            error: false,
            errorIdx: -1
          }
        ))
      }
    } else {
      // Error
      setGameState(state => (
        {
          ...state,
          passageIdx: inputString.length,
          error: true,
          errorIdx: state.errorIdx === -1 ? inputString.length : state.errorIndex
        }
      ))
    }
  }

//  // Reset Input
//  useEffect(() => {
//    const { error, display } = gameState;
//    if (!error && display.slice(-1) === ' ') {
//      setGameState(state => (
//        {
//          ...state,
//          display: '',
//          wordCount: state.wordCount + 1
//        }
//      ))
//    }
//  }, [gameState.display])

//  // Finish game
//  useEffect(() => {
//    if (gameState.inputString === passage){
//      setGameState(state => (
//        {
//          ...state,
//          display: '',
//          finished: true,
//          wordCount: state.wordCount + 1
//        }
//      ))
//    }
//  }, [gameState.inputString])
  console.log('passage: ', passage)
  return (
    <div className="App-game">
      <GameTimer seconds={time}/>
      <div className="App-status">
        {/* <GameStatus passageLength={passage.length} position={gameState.error ? gameState.errorIndex : gameState.inputString.length}>
          <i className="fas fa-truck-pickup fa-3x"/>
        </GameStatus>
        <PlayerStats position={1} pace={Math.round(gameState.wordCount/(time/60))} /> */}
      </div>
      
      
      <div className="App-passage">
        <GamePassage passage={passage} inputLength={gameState.passageIdx} error={gameState.error} errorIndex={gameState.errorIndex} />
        <GameInput  error={gameState.error} handleInput={handleInput} /> 
      </div>
      { gameState.initGame ? '' : <button onClick={handleStartGame}>Start Game</button>}
      
    </div>
  )
}
Game.propTypes = {
  passage: PropTypes.string.isRequired
}
export default Game;