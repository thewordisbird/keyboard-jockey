import React from 'react';
import PropTypes from 'prop-types';

import Passage from './Passage'
import PlayerInput from './PlayerInput'

const Board = ({ passage, inputLength, error, errorIdx, input, handleInput}) => (
  <div className="App-passage">
    <Passage passage={passage} inputLength={inputLength} error={error} errorIdx={errorIdx} />
    <PlayerInput  input={input} error={error} handleInput={handleInput} /> 
  </div>
);
Board.propTypes = {
  passage: PropTypes.string.isRequired,
  inputLength: PropTypes.number.isRequired,
  error: PropTypes.bool.isRequired,
  errorIdx: PropTypes.number.isRequired,
  input: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired
};

export default Board;