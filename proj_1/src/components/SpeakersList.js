import Speaker from './Speaker';
import ReactPlaceHolder from 'react-placeholder';
import useRequestRest, { REQUEST_STATUS } from '../hooks/useRequestRest';
import { data } from '../../SpeakerData';
import { useContext } from 'react';
import { SpeakerFilterContext } from '../contexts/SpeakerFilterContext';
import SpeakerAdd from './SpeakerAdd';

const SpeakersList = () => {
    const {
        data: speakersData,
        requestStatus,
        error,
        updateRecord,
        insertRecord,
        deleteRecord
    } = useRequestRest();
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
                <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
                <div className="row">
                    {
                        speakersData
                        .filter((sp) => (sp.first.toLowerCase().includes(searchQuery)) || sp.last.toLowerCase().includes(searchQuery))
                        .filter((sp) => (sp.sessions.some((ses) => (ses.eventYear === eventYear))))
                        .map((item) => {
                            return (
                                <Speaker key={item.id}
                                    item={item}
                                    updateRecord={updateRecord}
                                    insertRecord={insertRecord}
                                    deleteRecord={deleteRecord} />
                            )
                        })
                    }
                </div>
            </ReactPlaceHolder>
        </div>
    );
}

export default SpeakersList;