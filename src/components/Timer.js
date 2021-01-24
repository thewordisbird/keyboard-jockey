import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ time }) => (
  <div className="App-timer">
    {Math.floor(time/60)}:{time % 60}
  </div>  
);
Timer.propTypes = {
  time: PropTypes.number
};

export default Timer;