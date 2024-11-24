import { useState } from 'react';

const useGameLogic (champions) => {
    const [score, setScore] = useState(0);
    const [clickedIds, setClickedIds] = useState(new Set());
    const [gameStatus, setGameStatus] = useState('playing');
    const [imageOrder, setImageOrder] = useState([]);

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
        if (champions.length > 0) {
          setImageOrder(shuffleArray(champions).slice(0, 10));
        }
      }, [champions]);

    return { score, gameStatus, imageOrder, handleCardClick, handleReset };
}

export default useGameLogic;