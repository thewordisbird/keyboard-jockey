import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GameStatus from './GameStatus';
import PlayerStats from './PlayerStats'
import GamePassage from './GamePassage';
import GameInput from './GameInput';
import GameTimer from './GameTimer';

import useTimer from '../hooks/useTimer';
import GameStart from './GameStart';
import useCountDown from '../hooks/useCountdown';
// import useCountDown from '../hooks/useCountdown';

const Game = ({ passage }) => {
  const [gameState, setGameState] = useState({
    // validatedInput: '', // Input string that has been cleared on a space
    // activeInput:'', // Value shown in input
    input: '',
    validInput:  '',
    error: false,
    errorIdx: -1,
    inGame: false,
    startCountDown: false,
    startGame: false,
    finishGame: false,
    wordCount: 0,  
  })

  const handleStartCountDown = () => {
    setGameState(state => (
      {
        ...state,
        inGame: true,
        startCountDown: true
      }
    ))
  }

  const handleStartGame = () => (
    setGameState(state => (
      {
        ...state,
        startCountDown: false,
        startGame: true
      }
    ))
  )

  // const time = useTimer(gameState.finishGame)

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

  const handleInput = (e) => {
    console.log('handling input', e.target.value)
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

 // Reset Input
 useEffect(() => {
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

 // Finish game
 useEffect(() => {
   if (gameState.validInput + gameState.input === passage){
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
  return (
    <div className="App-game">
      {gameState.startCountDown && <GameStart onGameStart= {handleStartGame} />}
      {gameState.startGame && <GameTimer />}
      
      <div className="App-status">
        <GameStatus passageLength={passage.length} position={gameState.error ? gameState.errorIdx : gameState.validInput.length + gameState.input.length}>
          <i className="fas fa-truck-pickup fa-3x"/>
        </GameStatus>
        {/* <PlayerStats position={1} pace={Math.round(gameState.wordCount/(time/60))} /> */}
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