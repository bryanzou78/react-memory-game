const Card = ({ championId, onCardClick, allFlipped, chosenBack}) => {
    return (
        <div
            className={`card${allFlipped ? ' is-flipped' : ''}`}
            onClick={() => !allFlipped && onCardClick(championId)}
        >
            <div className='card-inner'>
                <div className='card-front'>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`}
                        alt={championId}
                    />
                    <h2>
                        {championId}
                    </h2>
                </div>
                <div className='card-back'>
                    <img 
                        src={chosenBack}
                        alt='Card Back'
                    />
                </div>
            </div>
        </div>
    )
}

export default Card;