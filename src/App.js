import Game from './components/Game';
// import './App.css';
import './style.css'
// import useWebsocket from './hooks/useWebsocket';


function App() {
  // const {clientId, players} = useWebsocket(WEBSOCKET_ENDPOINT);
  return (
    <div className="App">
     <Game/>
    </div>
  );
}

export default App;
