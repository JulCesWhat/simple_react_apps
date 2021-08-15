const SpeakersRenderProps = (props) => {
    const speakers = [
        { imageSrc: 'speaker-1124', name: 'Capi Vara' },
        { imageSrc: 'speaker-1530', name: 'Sashi Mato' },
        { imageSrc: 'speaker-10803', name: 'Tigri to' }
    ];
    return props.children({ speakers: speakers });
}
export default SpeakersRenderProps;