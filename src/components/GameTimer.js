import React, {useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const GameTimer = ({ time }) => (
  <div className="App-timer">
    {Math.floor(time/60)}:{time % 60}
  </div>  
)
GameTimer.propTypes = {
  time: PropTypes.number.isRequired
}


export default GameTimer;