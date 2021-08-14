import SpeakersToolbar from './SpeakersToolbar';
import SpeakersList from './SpeakersList';
import { useState } from 'react';

const Speakers = ({ data, theme, setTheme }) => {
    const [showSession, setShowSession] = useState(true);

    return (
        <>
            <SpeakersToolbar theme={theme} setTheme={setTheme} showSession={showSession} setShowSession={setShowSession} />
            <SpeakersList data={data} showSession={showSession} />
        </>
    );
}

export default Speakers;