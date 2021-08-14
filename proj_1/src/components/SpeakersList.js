import Speaker from './Speaker';
import ReactPlaceHolder from 'react-placeholder';
import useRequestSpeakers, { REQUEST_STATUS } from '../hooks/useRequestSpeakers';

const SpeakersList = ({ showSession }) => {

    const {
        speakesData,
        requestStatus,
        error,
        onFavoriteToggle
    } = useRequestSpeakers(2000);

    if (requestStatus === REQUEST_STATUS.FAILURE) return (
        <div className="text-danger">
            Error <b>Loading data failied {error}</b>
        </div>
    );

    // if (isLoading) return (<div>Loading...</div>);

    return (
        <div className="container speakers-list">
            <ReactPlaceHolder
                type="media"
                rows="15"
                className="speakerslist-placeholder"
                ready={requestStatus === REQUEST_STATUS.SUCCESS}>
                <div className="row">
                    {
                        speakesData.map((item) => {
                            return (
                                <Speaker key={item.id} item={item} showSession={showSession} onFavoriteToggle={() => (onFavoriteToggle(item.id))} />
                            )
                        })
                    }
                </div>
            </ReactPlaceHolder>
        </div>
    );
}

export default SpeakersList;