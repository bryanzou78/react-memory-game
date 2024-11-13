import { useState } from 'react'
// import CardContainer from "./components/CardContainer"
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());
  // const numberOfCards = 5;

  const handleCardClick = (id) => {
    if (!clickedIds.has(id)) {
      setClickedIds((prev) => new Set(prev).add(id));
      setScore((prevScore) => prevScore + 1);
    }
  }

  const handleReset = () => {
    setScore(0);
    setClickedIds(new Set());
  }

  return (
    <>
      <div>
        <h1>Memory Game</h1>
        <p>Score: {score}</p>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => handleCardClick(1)}>1</button>
        <button onClick={() => handleCardClick(2)}>2</button>
        <button onClick={() => handleCardClick(3)}>3</button>
        <button onClick={() => handleCardClick(4)}>4</button>
        <button onClick={() => handleCardClick(5)}>5</button>
      </div>
    </>
  )
}

export default App
