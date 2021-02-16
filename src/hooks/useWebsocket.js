import React, { useState, useEffect, useRef} from 'react';
import { io } from 'socket.io-client';

const useWebsocket = (Endpoint) => {
  // console.log('in useWebsocket')
  const [clientId, setClientId]= useState('no Id');
  const [players, setPlayers] = useState();
  const [globalGameState, setGlobalGameState] = useState();
  const socket = useRef(null);

  // Initialize Connection
  useEffect(() => {
    socket.current = io(Endpoint);

    socket.current.on('newPlayer', data => {
      setClientId(data.playerId)
      setPlayers(data.players)
    });

    socket.current.on('updatedPlayers', data => {
      console.log('EMITTING Updated Player', data)
      console.log('Updated Players:', data)
      setPlayers(data)
    })

    socket.current.on('updateGlobalGameState', data => {
      console.log('EMITTING Updated Global Game State', data)
      setGlobalGameState(data)
    })

    return () => {
      socket.current.disconnect();
    }
  }, [Endpoint])


  const updatePlayer = (updatedPlayer) => {
    socket.current.emit('updatePlayer', updatedPlayer)
  }

  const updateGlobalGameState = (updatedGlobalGameState) => {
    socket.current.emit('updateGlobalGameState', updatedGlobalGameState)
  }

  const startGlobalGame = () => {
    socket.current.emit('startGlobalGame')
  }

  return {
    clientId: clientId, 
    players: players, 
    globalGameState: globalGameState, 
    updatePlayer: updatePlayer,
    updateGlobalGameState: updateGlobalGameState
  }
};

export default useWebsocket;