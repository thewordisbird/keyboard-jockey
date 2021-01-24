import React from 'react';
import PropTypes from 'prop-types';

const PlayerInput = ({ input, error, handleInput }) => (
<div className="App-passage-input">
  <input className={`form-control ${error && 'is-invalid'}`} type="text" autoFocus={true} value={input} onChange={(e) => handleInput(e)}/>
</div>
);
PlayerInput.propTypes = {
  input: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired
};

export default PlayerInput;