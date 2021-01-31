import React, {useState, useEffect } from 'react';
// Components
import Timing from './Timing';
import Board from './Board';
import GameStatus from './GameStatus';
// Custome Hooks
import useTimer from '../hooks/useTimer';
import useCountDown from '../hooks/useCountdown';
// Other (tmp data for development)
import passages from '../test-passages';

// Set globals
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
  const [players, setPlayers] = useState([]);

  // Custom Hooks
  const { countDownTime, startCountDown } = useCountDown();
  const { time, startTimer, stopTimer } = useTimer();

  // *** Side Effects ***
  // Initialize Player
  useEffect(() => {
    console.log('In init effect')
    // Set id to websocket id once implemented
    const id = '123qwe';
    setGameState(
      {
        ...INITIAL_STATE,
        id: id
      }
    );
    // Once websocket is implemented, the initial state will be pulled from the server
    // to bring in any player regisered before the client. Then add the client
    // to the array and re-emit
    setPlayers(() => {
      const clientPlayer = {
        id: id,
        alias: '',
        avitar: '',
        progress: 0,// The character of the string the player is it
        wordCount: 0,
      };
      const updatedPlayers = [...mockPlayers, clientPlayer];
      return (
       [
         ...updatedPlayers
       ]
      )
    })
  }, []);

  // Start the game when the countdown finishes
  useEffect(() => {
    if (countDownTime === 0) {
      console.log('Starting Countdown')
      startTimer()
      setGameState(state => (
        {
          ...state,
          inCountdown: false,
          inGame: true
        }
      ))
    }
  }, [countDownTime, startTimer])

  

  useEffect(() => {
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

  const udpatePlayers = () => {
    setPlayers (players => {
      console.log('updating player informateion')
      const playerIndex = players.findIndex(player => {
        return player.id === gameState.id;
      })
      const updatedPlayer = {
        ...players[playerIndex],
        progress: gameState.validInput.length,
        wordCount: gameState.wordCount
      }
      const updatedPlayers = [...players];
      console.log('BEFORE:', updatedPlayers)
      updatedPlayers[playerIndex] = updatedPlayer;
      console.log('AFTER:', updatedPlayers)
      return (
        [
          ...updatedPlayers
        ]
      );
    })
  }
  clearValidWord();
  udpatePlayers();
  // emitPlayerStatus(); 
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
    // Fetch data from server
    mockFetch()
    .then(passage => {
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
            players={players} 
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