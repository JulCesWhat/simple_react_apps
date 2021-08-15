const SpeakerAdd = ({ eventYear, insertRecord }) => {

    return (
        <a href="#" className="addSes">
            <i onClick={(e) => {
                e.preventDefault();
                const firstName = window.prompt("Enter first and last name", "");
                const firstLastArr = firstName.split(' ');
                insertRecord({
                    id: '9999',
                    first: firstLastArr[0],
                    last: firstLastArr[1],
                    sessions: [
                        {
                            id: '8888',
                            title: `New Session For ${firstLastArr[0]}`,
                            room: {
                                name: 'Mail Ball Room'
                            },
                            eventYear
                        }
                    ]
                });
            }}>+</i>
        </a>
    );
};

export default SpeakerAdd;