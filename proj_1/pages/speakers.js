import SpeakersRenderProps from '../src/components/SpeakersRenderProps';

const Speakers = () => {
    return (
        <SpeakersRenderProps>
            {
                ({ speakers }) => (
                    <div>
                        {
                            speakers.map((sp) => (
                                <img key={sp.imageSrc} src={`/images/${sp.imageSrc}.jpg`} atl={sp.name} />
                            ))
                        }
                    </div>
                )
            }
        </SpeakersRenderProps>
    );
}
export default Speakers;