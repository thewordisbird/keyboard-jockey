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

    // socket.current.on('testServer', message => {
    //   console.log(message)
    // })
    // socket.current.onevent(message=> {
    //   console.log(message)
    // })
    socket.current.on('updateGame', data => {
      console.log('updateGame: ', JSON.parse(data))
    })

    socket.current.on('message', data => {
      console.log(data)
    })

    return () => {
      socket.current.disconnect();
    }
  }, [Endpoint])

  // useEffect(() => {
  //   setInterval(()=>{
  //     console.log('emitting test')
  //     socket.current.emit('testClient', 'Ground control to major tom')
  //   },2000)
  // })
  const joinGame = () => {
    console.log('emmiting to joinGame')
    socket.current.emit('joinGame')
  }

  const updateGameState = (updatedPlayer) => {
    socket.current.emit('updatePlayer', updatedPlayer)
  }

  const updateGlobalGameState = (updatedGlobalGameState) => {
    socket.current.emit('updateGlobalGameState', updatedGlobalGameState)
  }

  // const startGlobalGame = () => {
  //   socket.current.emit('startGlobalGame')
  // }

  return {
    clientId: clientId, 
    players: players, 
    globalGameState: globalGameState, 
    joinGame: joinGame,
  }
};

export default useWebsocket;