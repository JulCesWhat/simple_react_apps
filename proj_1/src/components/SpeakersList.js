import Speaker from './Speaker';
import { data } from '../../SpeakerData';
import { useState } from 'react';


const SpeakersList = ({ showSession }) => {
    const [speakesData, setSpeakersData] = useState(data);


    const onFavoriteToggle = (id) => {
        const found = speakesData.find((sp) => (sp.id === id));
        const newFound = { ...found, favorite: !found.favorite };
        const speakers = speakesData.map((sp) => (
            sp.id === id ? newFound : sp
        ));
        setSpeakersData(speakers);
    }

    return (
        <div className="container speakers-list">
            <div className="row">
                {
                    speakesData.map((item) => {
                        return (
                            <Speaker key={item.id} item={item} showSession={showSession} onFavoriteToggle={() => (onFavoriteToggle(item.id))} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SpeakersList;