import React from 'react';
import PropTypes from 'prop-types';
import PlayerStats from './PlayerStats';

const PlayerResult = ({ pos, time, pace }) => (
    <div className="Player-result">
        1<br/><span className="Player-result-label">Position</span>
      <hr/>
        { time }<br/><span className="Player-result-label">Time</span>
      <hr/>
        { pace }<br/><span className="Player-result-label">W.P.M</span>
      <hr/>

    </div>
  );
PlayerStats.propTypes = {
  pos: PropTypes.number,
  time: PropTypes.number,
  pace: PropTypes.number
};

export default PlayerResult;