import { data } from '../../SpeakerData';
import { useState, useEffect } from 'react';

export const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure'
};

const useRequestSpeakers = (time) => {
    const [speakesData, setSpeakersData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState('');

    useEffect(() => {
        const timeout = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const delayFunc = async () => {
            try {
                await timeout(time);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setSpeakersData(data)
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        delayFunc();
    }, []);


    const onFavoriteToggle = (id) => {
        const found = speakesData.find((sp) => (sp.id === id));
        const newFound = { ...found, favorite: !found.favorite };
        const speakers = speakesData.map((sp) => (
            sp.id === id ? newFound : sp
        ));
        setSpeakersData(speakers);
    }

    return { speakesData, requestStatus, error, onFavoriteToggle };
}

export default useRequestSpeakers;