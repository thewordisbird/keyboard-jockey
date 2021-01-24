import React from 'react';
import PropTypes from 'prop-types';
// Components
import PlayerResult from './PlayerResult';
import Light from './Light';
import Timer from './Timer';

const Timing = ({ inCountdown, inGame, playerFinished, handleStart, time, pace }) => (
  <div className="Timing">
    {
      playerFinished
        ? <>
            <PlayerResult 
              time={time}
              pace={pace}
            />
            <button className="btn btn-primary" onClick={handleStart}>Play Again!</button>
          </>
        : <>
            <Light 
              inCountdown={inCountdown} 
              inGame={inGame}
              time={time} 
            />
            { (inCountdown || inGame)
              ? <Timer time={time} />
              : <button className="btn btn-primary" onClick={handleStart}>Start Game!</button>
            }
          </>
    }      
  </div>
);
Timing.propTypes = {
  inCountdown: PropTypes.bool.isRequired,
  inGame: PropTypes.bool.isRequired,
  playerFinished: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  time: PropTypes.number,
  pace: PropTypes.number
};

export default Timing;