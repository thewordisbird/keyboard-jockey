import { findAllByTestId } from '@testing-library/react';
import React, { useState, useEffect, useRef} from 'react';
import { io } from 'socket.io-client';

const useWebsocket = (Endpoint) => {
  // console.log('in useWebsocket')
  const [clientId, setClientId]= useState('no Id');
  const [players, setPlayers] = useState();
  const socket = useRef(null);

  // Initialize Connection
  useEffect(() => {
    socket.current = io(Endpoint);
    socket.current.on('NewPlayer', data => {
      setClientId(data.playerId)
      setPlayers(data.players)
    });

    socket.current.on('updatedPlayers', data => {
      console.log('EMITTING Updated Player', data)
      console.log('Updated Players:', data)
      setPlayers(data)
    })

    return () => {
      socket.current.disconnect();
    }
  }, [Endpoint])


  const updatePlayer = (updatedPlayer) => {
    socket.current.emit('updatePlayer', updatedPlayer)
  }

  return {clientId: clientId, players: players, updatePlayer: updatePlayer}
};

export default useWebsocket;