import { useState, useEffect } from 'react';
import back1 from '../assets/CardBacks/back1.png';
import back2 from '../assets/CardBacks/back2.png';
import back3 from '../assets/CardBacks/back3.png';
import back4 from '../assets/CardBacks/back4.png';
import back5 from '../assets/CardBacks/back5.png';

const useGameLogic = (champions) => {
    const [score, setScore] = useState(0);
    const [extremeScores, setExtremeScores] = useState([]);
    const [clickedIds, setClickedIds] = useState(new Set());
    const [gameStatus, setGameStatus] = useState('playingNormal');
    const [imageOrder, setImageOrder] = useState([]);
    const [chosenBack, setChosenBack] = useState(null);
    const [allFlipped, setAllFlipped] = useState(false);

    
    const cardBackImages = [back1, back2, back3, back4, back5]
    const CARD_COUNT = 10;

    //Generic shuffle
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    const shuffleImages = () => {
        //Shuffle for normal mode to keep same cards
        if (gameStatus === 'playingNormal') {
            setImageOrder((prevOrder) => shuffleArray(prevOrder));
            return;
        }
        if (gameStatus === 'playingExtreme') {
            let newShuffle = shuffleArray(champions).slice(0, CARD_COUNT);
            //Check if new shuffle has cards that have all been clicked
            if (newShuffle.every((champion) => clickedIds.has(champion.id))) {
                //If so, then randomly replace one card with a random unclicked champion
                const unclickedChampions = champions.filter((champion) => !clickedIds.has(champion.id));
                if(unclickedChampions > 0) {
                    const randomIndex = Math.floor(Math.random() * CARD_COUNT);
                    const newChampion = unclickedChampions[Math.floor(Math.random() * unclickedChampions.length)];
                    newShuffle[randomIndex] = newChampion;
                }
            }
            setImageOrder(newShuffle);
        }
    }

    const handleCardClick = (championId) => {
        if(clickedIds.has(championId)) {
            if(gameStatus === 'playingExtreme') {
                setExtremeScores((prev) => [...prev, score]);
            }
            setGameStatus('lost');
            return;
        }
        //Choose random card back for all cards after a click
        const randomBack = cardBackImages[Math.floor(Math.random() * cardBackImages.length)];
        setChosenBack(randomBack);
        //Immediate state updates
        setClickedIds((prev) => {
            const updatedClickedIds = new Set(prev).add(championId);
            if (gameStatus === 'playingExtreme' && updatedClickedIds.size === champions.length) {
                setGameStatus('won');
            }
            return updatedClickedIds;
        })
        setScore((prevScore) => {
            const newScore = prevScore + 1;
            if(gameStatus === 'playingNormal' && newScore === CARD_COUNT) {
                setGameStatus('won');
            } 
            return newScore;
        })
        //Add .is-flipped class to trigger animation
        setAllFlipped(true);
        setTimeout(() => {
            //Shuffle images when cards are on back
            shuffleImages();
            const cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                card.classList.remove('is-flipped');
                card.classList.add('reset-animation');
            });
            //Remove .reset-animation after animation
            setTimeout(() => {
                cards.forEach((card) => card.classList.remove('reset-animation'));
                setAllFlipped(false);
            }, 500);
        }, 500)
    }
    const handleNormalReset = () => {
        setScore(0);
        setClickedIds(new Set());
        setGameStatus('playingNormal');
        setImageOrder(shuffleArray(champions).slice(0, CARD_COUNT));
        setAllFlipped(false);
    }

    const handleExtremeReset = () => {
        setScore(0);
        setClickedIds(new Set());
        setGameStatus('playingExtreme');
        setImageOrder(shuffleArray(champions).slice(0, CARD_COUNT));
        setAllFlipped(false);
    }

    //Initialize image order after data fetch and champions get passed to App
    useEffect(() => {
        if (champions.length > 0) {
            setImageOrder(shuffleArray(champions).slice(0, CARD_COUNT));
        }
    }, [champions]);

    const highScore = extremeScores.reduce((highest, current) => (current > highest ? current : highest), extremeScores[0]);

    return { score, highScore, gameStatus, imageOrder, allFlipped, chosenBack, handleCardClick, handleNormalReset, handleExtremeReset };
}

export default useGameLogic;