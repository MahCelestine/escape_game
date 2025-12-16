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
    // Ajouter une vérification
    if (typeof formatTime !== 'function') {
        console.error('formatTime is not a function in HUD component');
        // Fonction de secours
        const fallbackFormatTime = (ms) => {
            if (ms <= 0) return "00:00";
            const totalSeconds = Math.floor(ms / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };
        formatTime = fallbackFormatTime;
    }

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