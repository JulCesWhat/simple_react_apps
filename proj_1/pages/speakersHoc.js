import withData from '../src/components/withData';

const Speakers = ({ speakers }) => {
    return (
        <div>
            {
                speakers.map((sp) => (
                    <img key={sp.imageSrc} src={`/images/${sp.imageSrc}.jpg`} atl={sp.name} />
                ))
            }
        </div>
    );
}

export default withData(2)(Speakers);;