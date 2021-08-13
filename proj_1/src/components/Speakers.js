import { data } from '../../SpeakerData';
import SpeakersList from './SpeakersList';
import Header from './Header';
import SpeakersToolbar from './SpeakersToolbar';

const Expeakers = () => {
    return (
        <div className="container-fluid">
            <Header />
            <SpeakersToolbar />
            <SpeakersList data={data} />
        </div>
    )
}

export default Expeakers;