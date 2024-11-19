const Card = ({ championId, onCardClick }) => {
    return (
        <img
        className='card'
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`}
        alt={championId}
        onClick={() => onCardClick(championId)}
        />
    )
}

export default Card;