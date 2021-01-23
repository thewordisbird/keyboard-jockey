import React from 'react';
import PropTypes from 'prop-types';

const GameLight = ({ time }) => (
  <div className="Start-light-container">
    <div className={`Start-light ${(time > 5) ? 'Start-light-red': ''}`}></div>
    <div className={`Start-light ${time <= 5 && time > 0  ? 'Start-light-yellow': ''}`}></div>
    <div className={`Start-light ${time === 0 ? 'Start-light-green': ''}`}></div>
  </div>
)
GameLight.propTypes = {
    time: PropTypes.number.isRequired
}
export default GameLight;