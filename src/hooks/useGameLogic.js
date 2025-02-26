import { useReducer, useEffect, useRef, useMemo, useCallback } from 'react';
import back1 from '../assets/CardBacks/back1.png';
import back2 from '../assets/CardBacks/back2.png';
import back3 from '../assets/CardBacks/back3.png';
import back4 from '../assets/CardBacks/back4.png';
import back5 from '../assets/CardBacks/back5.png';

//Generic shuffle, moved to top level outside useGameLogic component as a helper function
const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const initialState = {
    score: 0,
    extremeScores: [],
    clickedIds: new Set(),
    gameStatus: 'playingNormal',
    imageOrder: [],
    chosenBack: null,
    allFlipped: false,
    champions: [],
};

const CARD_COUNT = 10;

const gameReducer = (state, action) => {
    switch(action.type) {
        case 'CLICK_CARD': {
            const {championId, randomBack} = action.payload;

            if (state.clickedIds.has(championId)) {
                return {
                    ...state,
                    gameStatus: 'lost',
                    extremeScores: 
                    state.gameStatus === 'playingExtreme'? [...state.extremeScores, state.score] : state.extremeScores
                }
            }
            const newClickedIds = new Set(state.clickedIds).add(championId);
            const newScore = state.score + 1;
            const hasWon = (state.gameStatus === 'playingNormal' && newScore === CARD_COUNT) || 
                           (state.gameStatus === 'playingExtreme' && newClickedIds.size === state.champions.length);
            return {
                ...state,
                clickedIds: newClickedIds,
                score: newScore,
                gameStatus: hasWon ? 'won': state.gameStatus,
                chosenBack: randomBack,
                allFlipped: true,
            }
        }

        case 'SHUFFLE_CARDS':
            return {
                ...state,
                imageOrder: action.payload,
            };

        case 'RESET_NORMAL_GAME':
            return {
                ...initialState,
                imageOrder: action.payload,
                champions: state.champions,
            }

        case 'RESET_EXTREME_GAME':
            return {
                ...initialState,
                gameStatus: 'playingExtreme',
                imageOrder: action.payload,
                extremeScores: state.extremeScores,
                champions: state.champions,
            }

        case 'FLIP_CARDS_BACK':
            return {
                ...state,
                allFlipped: false,
            }
            
        default:
            return state;
    };
};



const useGameLogic = (champions) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const championsRef = useRef(champions);

    const cardBackImages = useMemo(() => [back1, back2, back3, back4, back5], []);

    const handleCardClick = (championId) => {
        //Choose random card back for all cards after a click
        const randomBack = cardBackImages[Math.floor(Math.random() * cardBackImages.length)];
        dispatch({type: 'CLICK_CARD', payload: {championId, randomBack}})
    }

    const shuffleImagesRef = useRef(() => {});

    useEffect(() => {
        shuffleImagesRef.current = () => {
            //Shuffle for normal mode to keep same cards
            if (state.gameStatus === 'playingNormal') {
                dispatch({type: 'SHUFFLE_CARDS', payload: shuffleArray(state.imageOrder)});
                return;
            }
            else if (state.gameStatus === 'playingExtreme') {
                let newShuffle = shuffleArray(championsRef.current).slice(0, CARD_COUNT);
                //Check if new shuffle has cards that have all been clicked
                if (newShuffle.every((champion) => state.clickedIds.has(champion.id))) {
                    //If so, then randomly replace one card with a random unclicked champion
                    const unclickedChampions = championsRef.current.filter((champion) => !state.clickedIds.has(champion.id));
                    if(unclickedChampions.length > 0) {
                        const randomIndex = Math.floor(Math.random() * CARD_COUNT);
                        const newChampion = unclickedChampions[Math.floor(Math.random() * unclickedChampions.length)];
                        newShuffle[randomIndex] = newChampion;
                    }
                }
                dispatch({type: 'SHUFFLE_CARDS', payload: newShuffle});
            }
        }
    }, [state.clickedIds, state.gameStatus, state.imageOrder])

    
    const handleNormalReset = () => {
        const shuffled = shuffleArray(championsRef.current).slice(0, CARD_COUNT);
        dispatch({type: 'RESET_NORMAL_GAME', payload: shuffled});
    }

    const handleExtremeReset = () => {
        const shuffled = shuffleArray(championsRef.current).slice(0, CARD_COUNT);
        dispatch({type: 'RESET_EXTREME_GAME', payload: shuffled});
    }
    
    const flipTimeoutRef = useRef(null);

    useEffect(() => {
        if(state.allFlipped) {
            flipTimeoutRef.current = setTimeout(() => {
                if(!state.allFlipped) return;
                shuffleImagesRef.current();
                //Shuffle images when cards are on back
                const cards = document.querySelectorAll('.card');
                cards.forEach((card) => {
                    card.classList.remove('is-flipped');
                    card.classList.add('reset-animation');
                });
                //Remove .reset-animation after animation
                setTimeout(() => {
                    cards.forEach((card) => card.classList.remove('reset-animation'));
                    dispatch({type: 'FLIP_CARDS_BACK'})
                }, 500);
            }, 500);

            return () => clearTimeout(flipTimeoutRef.current);
        }
    }, [state.allFlipped]);


    //Initialize image order after data fetch and champions get passed to App
    useEffect(() => {
        if (champions.length > 0) {
            championsRef.current = champions;
            dispatch({type: 'SHUFFLE_CARDS', payload: shuffleArray(champions).slice(0, CARD_COUNT)})
        }
    }, [champions]);

    const highScore = state.extremeScores.length > 0 
        ? Math.max(...state.extremeScores) 
        : 0; 

    return { 
        score: state.score, 
        highScore, 
        gameStatus: state.gameStatus, 
        imageOrder: state.imageOrder, 
        allFlipped: state.allFlipped, 
        chosenBack: state.chosenBack, 
        handleCardClick, 
        handleNormalReset,
        handleExtremeReset,
    };
};

export default useGameLogic;