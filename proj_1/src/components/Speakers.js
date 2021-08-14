import SpeakersToolbar from './SpeakersToolbar';
import SpeakersList from './SpeakersList';
import { SpeakerFilterProvider } from '../contexts/SpeakerContext';

const Speakers = () => {
    return (
        <SpeakerFilterProvider startingShowSessions={true}>
            <SpeakersToolbar />
            <SpeakersList />
        </SpeakerFilterProvider>
    );
}

export default Speakers;