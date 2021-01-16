import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GameCountdown = ({ children, display }) => {
  return (
    <div className={`App-countdown ${display ? 'fadeIn' : 'fadeOut'}`}>
      { children }            
    </div>
  )
}
GameCountdown.propTypes ={
    children: PropTypes.node.isRequired,
    display: PropTypes.bool.isRequired
}
export default GameCountdown