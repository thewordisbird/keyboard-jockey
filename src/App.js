import StatusBar from './components/StatusBar';
import Passage from './components/Passage';
import './App.css';;

const PASSAGE = "this is a test passage for keyboard jockey!"
function App() {
  return (
    <div className="App">
     <StatusBar><i className="fas fa-truck-pickup fa-3x"></i></StatusBar>
     <Passage passage={PASSAGE}/>
    </div>
  );
}

export default App;
