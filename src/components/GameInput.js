import React from 'react';
import PropTypes from 'prop-types';

const GameInput = ({ display, error }) => (
<div className="App-passage-input">
  <input className={error ? 'Input-error' : ''} type="text" value={display} readOnly/>
</div>
)
GameInput.propTypes = {
  display: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
}
export default GameInput;