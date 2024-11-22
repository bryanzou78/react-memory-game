import { useState, useEffect } from 'react'

const useFetchChampions = () => {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
    const fetchChampionData = async () => {
        try {
            const response = await fetch(
                'https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json'
            );
            const data = await response.json();
            if (data && data.data) {
                setChampions(Object.keys(data.data));
            } else {
                console.error('Error: data is invalid or missing.');
            }
        } catch (error) {
            console.error('Error fetching champion data:', error);
        }
    }
        fetchChampionData();
    }, []);

    return champions;
}

export default useFetchChampions;