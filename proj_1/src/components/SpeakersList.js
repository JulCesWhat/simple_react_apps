import Speaker from './Speaker';

const SpeakersList = ({ data, showSession }) => {

    return (
        <div className="container speakers-list">
            <div className="row">
                {
                    data.map((item) => {
                        return (
                            <Speaker key={item.id} item={item} showSession={showSession} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SpeakersList;