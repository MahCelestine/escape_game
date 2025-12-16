// components/HUD.jsx
import React from 'react';
import Timer from './Timer';
import MoneyCount from './MoneyCount';

function HUD({
    timeLeft = 0,
    isRunning = false,
    isFinished = false,
    items = [],
    formatTime,
    onStart = () => {}
}) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>
            {/* Section Timer */}
            <div style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                padding: "1%",
                borderRadius: "5px",
                minWidth: "200px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Timer 
                    timeLeft={timeLeft}
                    isRunning={isRunning}
                    isFinished={isFinished}
                    formatTime={formatTime}
                    onStart={onStart}
                />
            </div>
            
            {/* Section MoneyCount */}
            <MoneyCount items={items} />
        </div>
    );
}

export default HUD;