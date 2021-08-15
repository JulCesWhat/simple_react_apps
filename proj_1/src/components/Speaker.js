import { useState, useContext } from 'react';
import { SpeakerFilterContext } from '../contexts/SpeakerFilterContext';
import { SpeakerProvider, SpeakerContext } from '../contexts/SpeakerContext';
import SpeakerDelete from './SpeakerDelete';

const Sessions = () => {
    const { eventYear } = useContext(SpeakerFilterContext);
    const { speaker: { sessions } } = useContext(SpeakerContext);

    return (
        <div className="sessionBox card h-250">
            {
                sessions
                    .filter((ses) => (ses.eventYear === eventYear))
                    .map((ses) => (
                        <Session key={ses.id} title={ses.title} room={ses.room.name} />
                    ))
            }
        </div>
    )
}

const Session = ({ title, room }) => {
    return (
        <span className="session w-100">
            {title} <strong>Room: {room}</strong>
        </span>
    )
}

const SpeakerImage = () => {
    const { speaker: { id, first, last } } = useContext(SpeakerContext);
    return (
        <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <img className="contain-fit" src={`/images/speaker-${id}.jpg`} width="300" alt={`${first}-${last}`} />
        </div>
    );
}

const SpeakerFavorite = () => {
    const { speaker, updateRecord } = useContext(SpeakerContext);
    const [inTrans, setInTrans] = useState(false);

    const callback = () => {
        setInTrans(false);
    };

    return (
        <div className="action padB1">
            <span onClick={() => {
                setInTrans(true);
                updateRecord({ ...speaker, favorite: !speaker.favorite }, callback);
            }}>
                <i className={speaker.favorite ? "fa fa-star orange" : "fa fa-star-o oragne"}></i>
                {" "}Favorite{" "}
                {inTrans ? <span className="fas fa-circle-notch fa-spin"></span> : null}
            </span>
        </div>
    )
}

const SpeakerDemographics = () => {
    const { speaker: { first, last, bio, company, twitterHandle } } = useContext(SpeakerContext);
    return (
        <div className="speaker-info">
            <div className="d-flex justifiy-content-between mb-3">
                <h3 className="text-truncate w-200">
                    {first} {last}
                </h3>
            </div>
            <SpeakerFavorite />
            <div>
                <p className="card-description">{bio}</p>
                <div className="social d-flex flex-row mt-4">
                    <div className="company">
                        <h5>Company</h5>
                        <h6>{company}</h6>
                    </div>
                    <div className="twitter">
                        <h5>Twitter</h5>
                        <h6>{twitterHandle}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Speaker = ({ item, updateRecord, insertRecord, deleteRecord }) => {
    const { showSessions } = useContext(SpeakerFilterContext);

    return (
        <SpeakerProvider speaker={item} updateRecord={updateRecord} insertRecord={insertRecord} deleteRecord={deleteRecord}>
            <div className="col-sx-12 col-sm-12 col-md-6 col-lg-4">
                <div className="card card-height p-4 mt-4">
                    <SpeakerImage />
                    <SpeakerDemographics />
                </div>
                {
                    showSessions ? <Sessions /> : null
                }
                <SpeakerDelete />
            </div>
        </SpeakerProvider>
    );
}

export default Speaker;