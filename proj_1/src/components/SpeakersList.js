import Speaker from './Speaker';
import ReactPlaceHolder from 'react-placeholder';
import useRequestDelay, { REQUEST_STATUS } from '../hooks/useRequestDelay';
import { data } from '../../SpeakerData';
import { useContext } from 'react';
import { SpeakerFilterContext } from '../contexts/SpeakerFilterContext';

const SpeakersList = () => {
    const {
        data: speakersData,
        requestStatus,
        error,
        updateRecord
    } = useRequestDelay(2000, data);
    const { eventYear, searchQuery } = useContext(SpeakerFilterContext);

    if (requestStatus === REQUEST_STATUS.FAILURE) return (
        <div className="text-danger">
            Error <b>Loading data failied {error}</b>
        </div>
    );

    return (
        <div className="container speakers-list">
            <ReactPlaceHolder
                type="media"
                rows="15"
                className="speakerslist-placeholder"
                ready={requestStatus === REQUEST_STATUS.SUCCESS}>
                <div className="row">
                    {
                        speakersData
                        .filter((sp) => (sp.first.toLowerCase().includes(searchQuery)) || sp.last.toLowerCase().includes(searchQuery))
                        .filter((sp) => (sp.sessions.some((ses) => (ses.eventYear === eventYear))))
                        .map((item) => {
                            return (
                                <Speaker key={item.id}
                                    item={item}
                                    onFavoriteToggle={(doneCallback) => (updateRecord({ ...item, favorite: !item.favorite }, doneCallback))} />
                            )
                        })
                    }
                </div>
            </ReactPlaceHolder>
        </div>
    );
}

export default SpeakersList;