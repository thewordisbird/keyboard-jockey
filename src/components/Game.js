import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GameStatus from './GameStatus';
import PlayerStats from './PlayerStats'
import GamePassage from './GamePassage';
import GameInput from './GameInput';
import GameTimer from './GameTimer';
import Fade from './Fade';
import useTimer from '../hooks/useTimer';
import useCountDown from '../hooks/useCountdown';
import GameCountdown from './GameCountdown';
import GameLight from './GameLight';
// import useCountDown from '../hooks/useCountdown';

// Set globals
const COUNTDOWN_TIMER = 10

const Game = ({ passage }) => {
  const [gameState, setGameState] = useState({
    // validatedInput: '', // Input string that has been cleared on a space
    // activeInput:'', // Value shown in input
    input: '',
    validInput:  '',
    error: false,
    errorIdx: -1,
    inGame: false,
    displayCountDown: false,
    startGame: false,
    finishGame: false,
    wordCount: 0,  
  })

  
  // Custom Hooks
  const { countDownTime, startCountDown, countDownStatus } = useCountDown()
  const { time, startTimer, stopTimer } = useTimer()

  // *** Side Effects ***
  useEffect(() => {
    // Start the game when the countdown finishes
    if (countDownTime === 0) {
      startTimer()
      setGameState(state => (
        {
          ...state,
          displayCountDown: false,
          startGame: true
        }
      ))
    }
  }, [countDownTime])

 useEffect(() => {
   // Reset Input on space if valid
  console.log('In effect')
  const { error, input } = gameState;
  if (!error && input.slice(-1) === ' ') {
    setGameState(state => (
      {
        ...state,
        input: '',
        validInput: state.validInput + input,
        wordCount: state.wordCount + 1
      }
    ))
  }
}, [gameState.input])

useEffect(() => {
  // Finish game when input matches passage
  if (gameState.validInput + gameState.input === passage){
    stopTimer()
    setGameState(state => (
      {
        ...state,
        input: '',
        validInput: state.validInput + state.input,
        finishGame: true,
        wordCount: state.wordCount + 1
      }
    ))
  }
}, [gameState.input])


// *** Handlers ***
  const handleStartCountDown = () => {
    startCountDown(COUNTDOWN_TIMER)
    setGameState(state => (
      {
        ...state,
        inGame: true,
        displayCountDown: true
      }
    ))
  }

  const handleInput = (e) => {
    if (gameState.startGame){
      if (validateInput(e.target.value)) {      
        setGameState(state => (
          {
            ...state,
            input: e.target.value,
            error: false,
            errorIdx: -1          
          }
        ))
      } else {
        // Error
        setGameState(state => (
          {
            ...state,
            input: e.target.value,
            error: true,
            errorIdx: state.errorIdx === -1 ? findError(e.target.value) : state.errorIdx
          }
        ))
      }
    }
  }

  // *** Helpers ***
 const validateInput = (inputString) => {
   const insepectFrom = gameState.validInput.length
    if (passage.slice(insepectFrom, insepectFrom + inputString.length) !== inputString) {
      return false
    } else {
      return true
    }
  }

  const findError = (inputString) => {
    // Find error. Because the user could move around in the input,
      // it might not be the last character, but it will be in the last word.
      console.log('in find error')
      let idx = gameState.validInput.length + inputString.length;
      
      console.log('starting at: ', idx)
      console.log('start idx', idx)
      while (passage.slice(gameState.validInput.length, idx) === inputString.slice(0,idx)) {
        idx++
      }
      console.log('error at: ', idx)
      return idx - 1
  }

  return (
    <div className="App-game">
      <Fade display={gameState.displayCountDown}>
        <GameCountdown display={gameState.displayCountDown}>
            <GameLight time={countDownTime} />
            <GameTimer time={countDownTime} />
          </GameCountdown>
      </Fade>
      
      {gameState.startGame && <GameTimer time={time}/>}
      
      <div className="App-status">
        <GameStatus passageLength={passage.length} position={gameState.error ? gameState.errorIdx : gameState.validInput.length + gameState.input.length}>
          <i className="fas fa-truck-pickup fa-3x"/>
        </GameStatus>
        <PlayerStats pace={Math.round(gameState.wordCount/(time/60)) || 0} />
      </div>
      { gameState.inGame 
        ? (
          <div className="App-passage">
            <GamePassage passage={passage} inputLength={gameState.validInput.length + gameState.input.length} error={gameState.error} errorIdx={gameState.errorIdx} />
            <GameInput  input={gameState.input} error={gameState.error} handleInput={handleInput} /> 
          </div>
        )  : (
        <button onClick={handleStartCountDown}>Start Game</button>
        )
      }
    </div>
  )
}
Game.propTypes = {
  passage: PropTypes.string.isRequired
}
export default Game;