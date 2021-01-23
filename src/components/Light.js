import React from 'react';
import PropTypes from 'prop-types';

const Light = ({ inCountdown, time }) => (
  <div className="Start-light-container">
    <div className={`Start-light ${(inCountdown && time > 5) || !time ? 'Start-light-red' : ''}`}></div>
    <div className={`Start-light ${inCountdown && time <= 5 && time > 0  ? 'Start-light-yellow': ''}`}></div>
    <div className={`Start-light ${(inCountdown && time === 0) || (!inCountdown && time) ? 'Start-light-green' : ''}`}></div>
  </div>
)
Light.propTypes = {
    time: PropTypes.number
}
export default Light;