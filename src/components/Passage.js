import React, {useState, useEffect} from 'react';

const Passage = ({ passage }) => {
  const [typedInput, setTypedInput] = useState('')
  /*
  The current state must know the current index to be evaluated,
  the current word -> This is displayed as entered in the input:
    if the current character in the word is correct and an error has not been thrown:
      enter the letter in the input
      highlight the passage in green upto that index

    if the word is correct on the space press :
      clear the word from the input
      highlight the space
    if the character entered is incorrect:
      set the error index to the first instance of an error
      highlight the passage red
      highlight the input box red
    
    Required State Items:
      current_index -> used to validate the current input key
      current_word -> displayed in the text box
      error -> boolean true if error thrown
      error_index -> index that error was made
      

  }
  */
  const [error, setError] = useState(() => ({error: false, errorIndex: passage.length}))

  useEffect(() => {
    // Create event listener to monitor keydown event on keyboard
    window.addEventListener('keydown', (e) => setTypedInput(cur => cur + e.key))
    return () => {
      window.removeEventListener('keydown', (e) => setTypedInput(cur => cur + e.key))
    }
  }, [])

  useEffect(() => {
    const validateTypedKey = () => {

      if (passage.slice(0, typedInput.length) !== typedInput && !error.error){
        setError(
          {
            error: true,
            errorIndex: typedInput.length - 1
          }
        )
    }}

    validateTypedKey()
  }, [passage, error, typedInput])
  

  const getValidText = () => {
    return (
      <div>
        {error.error
      ? (
        <>
        <span className="Valid-text">{passage.slice(0, error.errorIndex)}</span>
        <span className="Invalid-text">{passage.slice(error.errorIndex, typedInput.length)}</span>
        {passage.slice(typedInput.length)}
        </>
      )
      : (
        <>
        <span className="Valid-text">{passage.slice(0, typedInput.length)}</span>
        {passage.slice(typedInput.length)}
        </>
      )     } 
      </div>
      
      
      )
  }
  

  return (
    <div className="App-passage">
      <div className="App-passage-text">
        {getValidText()}
      </div>
      <div className="App-passage-input">
        <input type="text"/>
      </div>
      
    </div>
  )
}

export default Passage;