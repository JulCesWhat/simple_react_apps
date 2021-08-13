import { data } from '../SpeakerData';

const IndexPage = () => {
    return (
        <div className="container speakers-list">
            <div className="row">
                {
                    data.map((item) => {
                        const { id, bio, first, last, favorite, twitterHandle, company, sessions } = item
                        return (
                            <div key={id} className="col-sx-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="card card-height p-4 mt-4">
                                    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
                                        <img className="contain-fit" src={`/images/speaker-${id}.jpg`} width="300" alt={`${first}-${last}`} />
                                    </div>
                                    <div className="speaker-info">
                                        <div className="d-flex justifiy-content-between mb-3">
                                            <h3 className="text-truncate w-200">
                                                {first} {last}
                                            </h3>
                                        </div>
                                        <div>
                                            <p>{bio}</p>
                                        </div>
                                    </div>
                                    <div className="sessionBox card h-250">
                                        <span className="session w-100">
                                            {sessions[0].title} <strong>Room: {sessions[0].room.name}</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default IndexPage;