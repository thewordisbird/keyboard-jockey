import React from 'react';
import PlayerStatus from './PlayerStatus';

const GameStatus = ({ players, passageLength }) => {
  console.log(players)
  return (
    <div className="App-game-status">
      { players.map(player => (
        <PlayerStatus key={player.id} player={player} passageLength={passageLength} >
          {player.avitar === '' ? <i className="fas fa-truck-pickup fa-3x"/> : <img src={player.avitar} />}          
        </PlayerStatus>
      ))}
      
    </div>
    
  )
};
export default GameStatus; 