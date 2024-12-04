const Header = ({ gameStatus, score, onNormalReset, onExtremeReset }) => {
    return (
        <div className='header-container'>
            <h1>Memory Game</h1>
            {gameStatus === 'won' && (
                <h2>You won! Play again?</h2>
            )}
            {gameStatus === 'lost' && (
                <h2>Game Over! Your score was {score}. Try again?</h2>
            )}
            <button className='reset-btn normal-btn' onClick={onNormalReset}>Normal</button>
            <button className='reset-btn extreme-btn' onClick={onExtremeReset}>Extreme</button>
            {(gameStatus === 'playingNormal' || gameStatus === 'playingExtreme') && (
                    <h2>Score: {score}</h2>
            )}
        </div>
    )
}

export default Header;