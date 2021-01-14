
import PropTypes from 'prop-types';

const GameInput = ({ display, error, handleInput }) => {
 
  return (
<div className="App-passage-input">
  <input className={error ? 'Input-error' : ''} type="text" value={display} readOnly/>
  <input type="text" autoFocus={true} onChange={(e) => handleInput(e)}/>
</div>
)}
GameInput.propTypes = {
  display: PropTypes.string,
  error: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired
}
export default GameInput;