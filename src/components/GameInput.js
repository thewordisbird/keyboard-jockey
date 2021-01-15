
import PropTypes from 'prop-types';

const GameInput = ({ input, error, handleInput }) => {
 
  return (
<div className="App-passage-input">
  <input type="text" autoFocus={true} value={input} onChange={(e) => handleInput(e)}/>
</div>
)}
GameInput.propTypes = {
  input: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired
}
export default GameInput;