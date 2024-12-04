import { useState, useEffect } from 'react';
import back1 from '../assets/CardBacks/back1.png';
import back2 from '../assets/CardBacks/back2.png';
import back3 from '../assets/CardBacks/back3.png';
import back4 from '../assets/CardBacks/back4.png';
import back5 from '../assets/CardBacks/back5.png';

const useGameLogic = (champions) => {
    const [score, setScore] = useState(0);
    const [clickedIds, setClickedIds] = useState(new Set());
    const [gameStatus, setGameStatus] = useState('playingNormal');
    const [imageOrder, setImageOrder] = useState([]);
    const [chosenBack, setChosenBack] = useState(null);
    const [allFlipped, setAllFlipped] = useState(false);

    
    const cardBackImages = [
      back1, back2, back3, back4, back5
    ]

    //Generic shuffle
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    //Shuffle for normal mode to keep same cards
    const shuffleImages = () => {
        setImageOrder((prevOrder) => shuffleArray(prevOrder));
    }

    const handleCardClick = (championId) => {
        if(clickedIds.has(championId)) {
            setGameStatus('lost');
            return;
        }
        //Choose random card back for all cards after a click
        const randomBack = cardBackImages[Math.floor(Math.random() * cardBackImages.length)];
        setChosenBack(randomBack);
        //Immediate state updates
        setClickedIds((prev) => new Set(prev).add(championId));
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          if(newScore === 10) {
            setGameStatus('won');
          } 
          return newScore;
        })
        //Add .is-flipped class to trigger animation
        setAllFlipped(true);
        //Outer setTimeout to replace .is-flipped with .reset-animation
        setTimeout(() => {
          shuffleImages();
            document.querySelectorAll('.card').forEach((card) => {
                card.classList.remove('is-flipped');
                card.classList.add('reset-animation');
            })
            //Inner setTimeout to remove .reset-animation after animation
            setTimeout(() => {
                document.querySelectorAll('.card').forEach((card) => {
                    card.classList.remove('reset-animation');
                });
                setAllFlipped(false);
            }, 500);
          

        }, 1000)

    }

    const handleNormalReset = () => {
        setScore(0);
        setClickedIds(new Set());
        setGameStatus('playingNormal');
        setImageOrder(shuffleArray(champions).slice(0, 10));
    }

    const handleExtremeReset = () => {
        setScore(0);
        setClickedIds(new Set());
        setGameStatus('playingExtreme');
        setImageOrder(shuffleArray(champions).slice(0, 10));
    }

    //Initialize image order after data fetch and champions get passed to App
    useEffect(() => {
        if (champions.length > 0) {
            setImageOrder(shuffleArray(champions).slice(0, 10));
        }
      }, [champions]);

    return { score, gameStatus, imageOrder, allFlipped, chosenBack, handleCardClick, handleNormalReset, handleExtremeReset };
}

export default useGameLogic;