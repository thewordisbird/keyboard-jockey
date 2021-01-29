import React, {useState, useEffect } from 'react';

import Timing from './Timing';
import PlayerStatus from './PlayerStatus';
import PlayerStats from './PlayerStats'
import Board from './Board';

import useTimer from '../hooks/useTimer';
import useCountDown from '../hooks/useCountdown';

import passages from '../test-passages';
import GameStatus from './GameStatus';

// Set globals
const COUNTDOWN_TIMER = 10;
const INITIAL_STATE = {
  input: '',
  validInput:  '',
  error: false,
  errorIdx: -1,
  inCountdown: false,
  inGame: false,
  playerFinished: false,
  wordCount: 0,
  passage:''  
};

// Mock Players
const players = [
  {
    id: 0,
    alias: 'thewordisbird',
    avitar: '',
    progress: 0,// The character of the string the player is it
    pace: 0,
    local: true
  },
  {
    id: 1,
    alias: 'player 2',
    avitar: '',
    progress: 0,// The character of the string the player is it
    pace: 0,
    local: false
  },
  {
    id: 2,
    alias: 'player 3',
    avitar: '',
    progress: 0,// The character of the string the player is it
    pace: 0,
    local: false
  },
  {
    id: 3,
    alias: 'player 4',
    avitar: '',
    progress: 0,// The character of the string the player is it
    pace: 0,
    local: false
  },
]

const mockFetch = () => {
  return new Promise(
    (resolve, reject) => {
        setTimeout(() => {
        resolve(passages[Math.floor(Math.random() * passages.length)]) 
      }, 1000);
    }
  );
};

const Game = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);

  // Custom Hooks
  const { countDownTime, startCountDown, countDownStatus } = useCountDown();
  const { time, startTimer, stopTimer } = useTimer();

  // *** Side Effects ***
  useEffect(() => {
    // Start the game when the countdown finishes
    if (countDownTime === 0) {
      console.log('starting timer')
      startTimer()
      setGameState(state => (
        {
          ...state,
          inCountdown: false,
          inGame: true
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
  if (gameState.inGame && (gameState.validInput + gameState.input === gameState.passage)){
    stopTimer()
    setGameState(state => (
      {
        ...state,
        input: '',
        validInput: state.validInput + state.input,
        inCountdown: false,
        inGame: false,
        playerFinished: true,
        wordCount: state.wordCount + 1
      }
    ))
  }
}, [gameState.input])

// *** Handlers ***
  const handleStartCountDown = () => {
    // Fetch data from server
    mockFetch()
    .then(passage => {
      startCountDown(COUNTDOWN_TIMER);
      setGameState(
        {
          ...INITIAL_STATE,
          inCountdown: true,
          passage: passage.passage
        }
      );
    });
  };

  const handleInput = (e) => {
    if (gameState.inGame){
      if (validateInput(e.target.value)) {      
        setGameState(state => (
          {
            ...state,
            input: e.target.value,
            error: false,
            errorIdx: -1          
          }
        ));
      } else {
        // Error
        setGameState(state => (
          {
            ...state,
            input: e.target.value,
            error: true,
            errorIdx: state.errorIdx === -1 ? findError(e.target.value) : state.errorIdx
          }
        ));
      }
    }
  };

  // *** Helpers ***
 const validateInput = (inputString) => {
   const insepectFrom = gameState.validInput.length
    if (gameState.passage.slice(insepectFrom, insepectFrom + inputString.length) !== inputString) {
      return false;
    } else {
      return true;
    }
  };

  const findError = (inputString) => {
    // Find error. Because the user could move around in the input,
    // it might not be the last character, but it will be in the last word.
    let idx = gameState.validInput.length + inputString.length;
    while (gameState.passage.slice(gameState.validInput.length, idx) === inputString.slice(0,idx)) {
      idx++;
    }
    return idx - 1;
  };

  

  return (
    <div className="container">
      <div className="App-game">
        <div className="App-sidebar">
          <Timing  
            inCountdown={gameState.inCountdown}
            inGame={gameState.inGame}
            playerFinished={gameState.playerFinished} 
            handleStart={handleStartCountDown} 
            time={gameState.inCountdown ? countDownTime : time}
            pace={Math.round(gameState.wordCount * 60/time)}
          />
        </div>
        <div className="App-main">
          <GameStatus players={players} passageLength={gameState.passage.length} />

          {(gameState.inCountdown || gameState.inGame || gameState.playerFinished) &&
            <Board 
              passage={gameState.passage} 
              inputLength={gameState.validInput.length + gameState.input.length} 
              input={gameState.input} 
              error={gameState.error}
              errorIdx={gameState.errorIdx}
              handleInput={handleInput}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Game;