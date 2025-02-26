import Card from './Card'

const CardContainer = ({ imageOrder, onCardClick, allFlipped, chosenBack}) => {
    return (
        <div className={`card-container${allFlipped ? ' disabled' : ''}`}>
              {imageOrder.map((championId, index) => (
                <Card
                    key={index}
                    championId={championId}
                    onCardClick={onCardClick}
                    allFlipped={allFlipped}
                    chosenBack={chosenBack}
                />
            ))}
        </div>
    )
}

export default CardContainer;