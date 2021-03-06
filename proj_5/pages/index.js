import axios from 'axios';
import React from 'react';
import Link from 'next/link';

class Index extends React.Component {

    static async getInitialProps() {
        return axios.get('http://localhost:4000/speakers')
            .then((res) => {
                return {
                    hasErrored: false,
                    speakerData: res.data
                };
            }).catch((error) => {
                return {
                    hasErrored: true,
                    message: error.message
                };
            });
    }

    constructor(props) {
        super(props);
        this.state = {
            hasErrored: props.hasErrored,
            message: props.message,
            speakerData: props.speakerData || []
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Link href="/sessions">
                    <a>SESSIONS</a>
                </Link>
                <ul>
                {
                    this.state.speakerData && this.state.speakerData.map((s) => {
                        return <li key={s.id}>{s.firstName} {s.lastName}</li>
                    })
                }
            </ul>
            </div>
        );
    }
}

export default Index;