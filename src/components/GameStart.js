import React, { useState } from 'react'
import useCountDown from '../hooks/useCountdown'
import GameTimer from './GameTimer'
import './StartGame.css'

const GameStart = ({ onGameStart }) => {
    const time = useCountDown(10)
    return (
        <>
        <div className="App-start-game">
            <div className="Start-light-container">
                <div className={`Start-light ${time > 5 ? 'Start-light-red': ''}`}></div>
                <div className={`Start-light ${time <= 5 && time > 0  ? 'Start-light-yellow': ''}`}></div>
                <div className={`Start-light ${time === 0 ? 'Start-light-green': ''}`}></div>
            </div>
            <div className="Start-countdown">
            <GameTimer seconds={time}/>
            </div>
            
        </div>
        
        
        </>

    )
}

export default GameStart