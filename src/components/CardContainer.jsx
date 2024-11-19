import Card from './Card'

const CardContainer = ({ imageOrder, onCardClick}) => {
    return (
        <div className='card-container'>
              {imageOrder.map((championId) => (
                <Card
                    key={championId}
                    championId={championId}
                    onCardClick={onCardClick}
                  />
              ))}
            </div>
    )
}

export default CardContainer;