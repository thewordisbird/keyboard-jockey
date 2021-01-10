import React, {useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const GameTimer = ({seconds}) => (
  <div className="App-timer">
    {Math.floor(seconds/60)}:{seconds % 60}
  </div>  
)
GameTimer.propTypes = {
  seconds: PropTypes.number.isRequired
}


export default GameTimer;