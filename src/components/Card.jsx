const Card = ({ championId, onCardClick }) => {
    return (
        <div>
            <img
                className='card'
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`}
                alt={championId}
                onClick={() => onCardClick(championId)}
            />
            <h2>
                {championId}
            </h2>
        </div>
    )
}

export default Card;