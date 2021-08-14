import Speaker from './Speaker';
import ReactPlaceHolder from 'react-placeholder';
import useRequestDelay, { REQUEST_STATUS } from '../hooks/useRequestDelay';
import { data } from '../../SpeakerData';
import { useContext } from 'react';

const SpeakersList = () => {
    const {
        data: speakersData,
        requestStatus,
        error,
        updateRecord
    } = useRequestDelay(2000, data);

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
                        speakersData.map((item) => {
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