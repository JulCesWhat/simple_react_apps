
function withData(maxSpeakersToShow) {
    return (Component) => {
        const speakers = [
            { imageSrc: 'speaker-1124', name: 'Capi Vara' },
            { imageSrc: 'speaker-1530', name: 'Sashi Mato' },
            { imageSrc: 'speaker-10803', name: 'Tigri to' }
        ];
        return () => {
            const limit = speakers.slice(0, maxSpeakersToShow);
            return <Component speakers={limit}></Component>
        }
    }
}

export default withData;