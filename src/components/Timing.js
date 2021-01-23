import React from 'react';
// Components
import Light from './Light';
import Timer from './Timer';

const Timing = ({ inCountdown, inGame, handleStart, time }) => {
  return (
    <div className="Timing">
      <Light inCountdown={inCountdown} time={time} />
      { inCountdown || inGame
        ? <Timer time={time} />
        : <button className="btn btn-primary" onClick={handleStart}>Start Game!</button>
      }
    </div>
  );
};

export default Timing;