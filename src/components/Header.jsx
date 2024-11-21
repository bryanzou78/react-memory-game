const Header = ({ gameStatus, score, onReset }) => {
    return (
        <div>
            <h1>Memory Game</h1>
            {gameStatus === 'playing' && <h2>Score: {score}</h2>}
            {gameStatus === 'won' && (
            <div>
                <h2>You won!</h2>
                <button className='reset-btn' onClick={onReset}>Play Again</button>
            </div>
            )}
            {gameStatus === 'lost' && (
            <div>
                <h2>Game Over! Your score was {score}</h2>
                <button className='reset-btn' onClick={onReset}>Try Again</button>
            </div>
            )}
        </div>
    )
}

export default Header;