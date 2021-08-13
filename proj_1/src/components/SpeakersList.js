import Speaker from './Speaker';

const SpeakersList = ({ data }) => {

    return (
        <div className="container speakers-list">
            <div className="row">
                {
                    data.map((item) => {
                        return (
                            <Speaker key={item.id} item={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SpeakersList;