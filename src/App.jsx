import Header from './components/Header'
import CardContainer from './components/CardContainer'
import useGameLogic from './hooks/useGameLogic'
import useFetchChampions from './hooks/useFetchChampions'

function App() {
  const champions = useFetchChampions();
  const { score, gameStatus, imageOrder, handleCardClick, handleReset } = useGameLogic(champions);

  return (
    <>
      <Header score={score} gameStatus={gameStatus} onReset={handleReset} />
      {gameStatus === 'playing' && (
        <CardContainer imageOrder={imageOrder} onCardClick={handleCardClick}/>
      )}
    </>
  )
}

export default App
