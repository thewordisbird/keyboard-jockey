import Game from './components/Game';
import './App.css'
;

const PASSAGE = "this is a test passage for keyboard jockey!"
function App() {
  return (
    <div className="App">
     <Game passage={PASSAGE}/>
     
    </div>
  );
}

export default App;
