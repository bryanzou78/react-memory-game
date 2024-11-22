import { useState, useEffect } from 'react'
import Header from './components/Header'
import CardContainer from './components/CardContainer'
import useGameLogic from './hooks/useGameLogic'

function App() {
  const { score, gameStatus, imageOrder, handleCardClick, handleReset } = useGameLogic(champions);

  const [champions, setChampions] = useState([]);

  const fetchChampionData = async () => {
    try {
      const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json');
      const data = await response.json();
      console.log(data);
      if (data && data.data) {
        const championList = Object.keys(data.data);
        setChampions(championList);
        console.log(championList);
      } else {
        console.error('Error: data is invalid or missing.');
      }
    } catch (error) {
      console.error('Error fetching champion data:', error);
    }
  }

  
  useEffect(() => {
    fetchChampionData();
  }, []);


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
