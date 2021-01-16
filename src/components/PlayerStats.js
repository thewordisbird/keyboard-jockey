import React from 'react';
import PropTypes from 'prop-types';

const PlayerStats = ({ position, pace }) =>(
  <div className="App-player-stats">
    {pace} WPM
  </div>
)
PlayerStats.propTypes ={
  position: PropTypes.number.isRequired,
  pace: PropTypes.number.isRequired
}

export default PlayerStats;