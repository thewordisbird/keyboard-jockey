import React, {useState, useEffect } from 'react';

// Components
import Timing from './Timing';
import Board from './Board';
import GameStatus from './GameStatus';
// Custome Hooks
import useWebsocket from '../hooks/useWebsocket';
import useTimer from '../hooks/useTimer';
import useCountDown from '../hooks/useCountdown';
// Other (tmp data for development)
import passages from '../test-passages';

// Set globals
const WEBSOCKET_ENDPOINT = "localhost:3001";
const COUNTDOWN_TIMER = 10;
const INITIAL_STATE = {
  id: '',
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
const mockPlayers = [
  {
    id: 0,
    alias: 'thewordisbird',
    avitar: '',
    progress: 0,// The character of the string the player is it
    pace: 0,
  },
  {
    id: 1,
    alias: 'player 2',
    avitar: '',
    progress: 0,// The character of the string the player is it
    pace: 0,
  },
  {
    id: 2,
    alias: 'player 3',
    avitar: '',
    progress: 0,// The character of the string the player is it
    pace: 0,
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
  const {clientId, players, globalGameState, updatePlayer, updateGlobalGameState, joinGame } = useWebsocket(WEBSOCKET_ENDPOINT);
  const { countDownTime, startCountDown } = useCountDown();
  const { time, startTimer, stopTimer } = useTimer();

  // *** Side Effects ***
  // Initialize Player
  useEffect(() => {
    setGameState(gameState => (
      {
        ...gameState,
        id: clientId
      }
    ))
  }, [clientId])

  // Start the game when the countdown finishes
  useEffect(() => {
    if (countDownTime === 0) {
      console.log('Starting Game')
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
    if ('input' in gameState) {
      console.log('Input Triggered Effect')
      // Input word completion
      const clearValidWord = () => {
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
      };

      if (players) {        
        const player = players.filter(player => player.id === gameState.id)[0]
        console.log('Player Before:', player)
         const updatedPlayer = {
          ...player,
          progress: gameState.validInput.length,
          wordCount: gameState.wordCount
        }
        console.log('Player After:', updatedPlayer)
        updatePlayer(updatedPlayer)
      }
      
      clearValidWord();
      // udpatePlayers();
      // emitPlayerStatus(); 
  }
  
}, [gameState.input ])

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
    /* Starts the game and emits the message thru the websocket */
    // Fetch data from server
    mockFetch()
    .then(passage => {
      joinGame();
      startCountDown(COUNTDOWN_TIMER);
      setGameState(gameState => (
        {
          ...gameState,
          inCountdown: true,
          passage: passage.passage
        }
      
      ));
      
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
          <GameStatus 
            players={players || []} 
            passageLength={gameState.passage.length} />

          {
            (gameState.inCountdown || gameState.inGame || gameState.playerFinished) &&
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