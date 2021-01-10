import React from 'react';
import PropTypes from 'prop-types';

const GamePassage = ({ passage, inputLength, error, errorIndex }) => (
    <div className="App-passage-text">
      { 
        error
          ? (
            <>
              <span style={{background: 'lightgreen'}}>{passage.slice(0, errorIndex)}</span>
              <span style={{background: 'lightpink'}}>{passage.slice(errorIndex, inputLength)}</span>
            </>
          )
          : (
            <span style={{background: 'lightgreen'}}>{passage.slice(0, inputLength)}</span>
          )
      }
      {passage.slice(inputLength)}
    </div>
) 
GamePassage.propTypes = {
  passage: PropTypes.string.isRequired,
  inputLength: PropTypes.number.isRequired,
  error: PropTypes.bool.isRequired,
  errorIndex: PropTypes.number.isRequired
}
export default GamePassage
  