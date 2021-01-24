import React from 'react';
import PropTypes from 'prop-types';

const Passage = ({ passage, inputLength, error, errorIdx }) => (
  <div className="App-passage-text">
    { 
      error
        ? (
          <>
            <span style={{background: 'lightgreen'}}>{passage.slice(0, errorIdx)}</span>
            <span style={{background: 'lightpink'}}>{passage.slice(errorIdx, inputLength)}</span>
          </>
        )
        : (
          <span style={{background: 'lightgreen'}}>{passage.slice(0, inputLength)}</span>
        )
    }
    {passage.slice(inputLength)}
  </div>
) 
Passage.propTypes = {
  passage: PropTypes.string.isRequired,
  inputLength: PropTypes.number.isRequired,
  error: PropTypes.bool.isRequired,
  errorIdx: PropTypes.number.isRequired
};

export default Passage;
  