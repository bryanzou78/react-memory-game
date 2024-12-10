const Header = ({ gameStatus, score, onNormalReset, onExtremeReset }) => {
    return (
        <div className='header-container'>
            <h1>Memory Game</h1>
            {gameStatus === 'won' && (
                <div>
                    <h2>You won! Play again?</h2>
                    <button className='reset-btn normal-btn' onClick={onNormalReset}>Normal</button>
                    <button className='reset-btn extreme-btn' onClick={onExtremeReset}>Extreme</button>
                </div>
            )}
            {gameStatus === 'lost' && (
                <div>
                    <h2>Game Over! Your score was {score}. Try again?</h2>
                    <button className='reset-btn normal-btn' onClick={onNormalReset}>Normal</button>
                    <button className='reset-btn extreme-btn' onClick={onExtremeReset}>Extreme</button>
                </div>
            )}
            {gameStatus === 'playingNormal' && (
                <div>
                    <p>Click each champion only once</p>
                    <h2>Score: {score}</h2>
                    <button className='reset-btn normal-btn normal-btn-active' onClick={onNormalReset}>Normal</button>
                    <button className='reset-btn extreme-btn extreme-btn-inactive' onClick={onExtremeReset}>Extreme</button>
                </div>
            )}
            {gameStatus === 'playingExtreme' && (
                <div>
                    <p>League of Legends currently has 140+ champions. Click each champion only once. Game becomes more difficult the more champions you click, but there will always be at least one viable option until you win.</p>
                    <h2>Score: {score}</h2>
                    <button className='reset-btn normal-btn normal-btn-inactive' onClick={onNormalReset}>Normal</button>
                    <button className='reset-btn extreme-btn extreme-btn-active' onClick={onExtremeReset}>Extreme</button>
                </div>
            )}
        </div>
    )
}

export default Header;