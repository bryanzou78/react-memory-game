import { useState, useEffect } from 'react'
import CardContainer from "./components/CardContainer"
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [gameStatus, setGameStatus] = useState('playing');
  const [imageOrder, setImageOrder] = useState([]);
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

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const shuffleImages = () => {
    setImageOrder((prevOrder) => shuffleArray(prevOrder));
  }

  
  const handleCardClick = (championId) => {
    if(clickedIds.has(championId)) {
      setGameStatus('lost');
      return;
    }

    setClickedIds((prev) => new Set(prev).add(championId));

    setScore((prevScore) => {
      const newScore = prevScore + 1;
      if(newScore === 10) {
        setGameStatus('won');
      }
      return newScore;
    });

    shuffleImages();
  }
  
  const handleReset = () => {
    setScore(0);
    setClickedIds(new Set());
    setGameStatus('playing');
    setImageOrder(shuffleArray(champions).slice(0, 10));
  }
  
  useEffect(() => {
    fetchChampionData();
  }, []);

  useEffect(() => {
    if (champions.length > 0) {
      setImageOrder(shuffleArray(champions).slice(0, 10));
    }
  }, [champions]);


  return (
    <>
      <div>
        <h1>Memory Game</h1>
        {gameStatus === 'playing' && (
          <div>
            <h2>Score: {score}</h2>
            <CardContainer imageOrder={imageOrder} onCardClick={handleCardClick}/>
          </div>
        )}
        {gameStatus === 'won' && (
          <div>
            <h2>You won!</h2>
            <button className='reset-btn' onClick={handleReset}>Play Again</button>
          </div>
        )}
        {gameStatus === 'lost' && (
          <div>
            <h2>Game Over! Your score was {score}</h2>
            <button className='reset-btn' onClick={handleReset}>Try Again</button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
