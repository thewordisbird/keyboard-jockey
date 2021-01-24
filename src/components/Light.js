import React from 'react';
import PropTypes from 'prop-types';

const Light = ({ inCountdown, inGame, time }) => (
  <div className="Start-light-container">
    <div 
      className={`Start-light ${(inCountdown && time > 5) || (!inCountdown && !inGame) ? 'Start-light-red' : ''}`}>
    </div>
    <div 
      className={`Start-light ${inCountdown && time <= 5 && time > 0 ? 'Start-light-yellow': ''}`}>
    </div>
    <div 
      className={`Start-light ${(inCountdown && time === 0) || inGame ? 'Start-light-green' : ''}`}>
    </div>
  </div>
);
Light.propTypes = {
  inCountdown: PropTypes.bool.isRequired,
  inGame: PropTypes.bool.isRequired,
  time: PropTypes.number
};

export default Light;