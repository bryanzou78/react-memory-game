import { useState } from 'react'
// import CardContainer from "./components/CardContainer"
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [isGameOver, setIsGameOver] = useState(false);
  // const numberOfCards = 5;

  const handleCardClick = (id) => {
    if(clickedIds.has(id)) {
      setIsGameOver(true);
      return;
    }
    
    if (!clickedIds.has(id)) {
      setClickedIds((prev) => new Set(prev).add(id));
      setScore((prevScore) => prevScore + 1);
    }
  }

  const handleReset = () => {
    setScore(0);
    setClickedIds(new Set());
    setIsGameOver(false);
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
            <button onClick={() => handleCardClick(1)} disabled={isGameOver}>1</button>
            <button onClick={() => handleCardClick(2)}>2</button>
            <button onClick={() => handleCardClick(3)}>3</button>
            <button onClick={() => handleCardClick(4)}>4</button>
            <button onClick={() => handleCardClick(5)}>5</button>
          </div>
          )
}
      </div>
    </>
  )
}

export default App
