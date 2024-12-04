import Header from './components/Header'
import CardContainer from './components/CardContainer'
import useGameLogic from './hooks/useGameLogic'
import useFetchChampions from './hooks/useFetchChampions'

function App() {
  const champions = useFetchChampions();
  const { score, gameStatus, imageOrder, allFlipped, chosenBack, handleCardClick, handleNormalReset, handleExtremeReset } = useGameLogic(champions);

  return (
    <>
      <Header 
      score={score} 
      gameStatus={gameStatus} 
      onNormalReset={handleNormalReset}
      onExtremeReset={handleExtremeReset} 
      />
      {(gameStatus === 'playingNormal' || gameStatus === 'playingExtreme') && (
        <CardContainer 
        imageOrder={imageOrder} 
        onCardClick={handleCardClick}
        allFlipped={allFlipped}
        chosenBack={chosenBack}
        />
      )}
    </>
  )
}

export default App
