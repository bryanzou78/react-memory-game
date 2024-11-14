import { useState, useEffect } from 'react'
// import CardContainer from "./components/CardContainer"
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [isGameOver, setIsGameOver] = useState(false);
  const [buttonOrder, setButtonOrder] = useState([1, 2, 3, 4, 5]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const shuffleButtons = () => {
    setButtonOrder(shuffleArray([1, 2, 3, 4, 5]));
  }

  useEffect(() => {
    shuffleButtons();
  }, []);

  const handleCardClick = (id) => {
    if(clickedIds.has(id)) {
      setIsGameOver(true);
      return;
    }
    
      setClickedIds((prev) => new Set(prev).add(id));
      setScore((prevScore) => prevScore + 1);
      shuffleButtons();
  }

  const handleReset = () => {
    setScore(0);
    setClickedIds(new Set());
    setIsGameOver(false);
    shuffleButtons();
  }

  return (
    <>
      <div>
        <h1>Memory Game</h1>
        {isGameOver ? (
          <div>
            <h2>Game Over! Your score was {score}</h2>
            <button onClick={handleReset}>Reset</button>
          </div>
        ) : (
          <div>
            <p>Score: {score}</p>
            <button onClick={handleReset}>Reset</button>
            {buttonOrder.map((id) => (
              <button key={id} onClick={() => handleCardClick(id)} disabled={isGameOver}>
                {id}
              </button>
            ))}
          </div>
          )
}
      </div>
    </>
  )
}

export default App
