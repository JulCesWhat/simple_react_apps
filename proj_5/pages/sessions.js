import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

class Index extends React.Component {

    static async getInitialProps() {
        return axios.get('http://localhost:4000/sessions')
            .then((res) => {
                return {
                    hasErrored: false,
                    sessionsData: res.data
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
            sessionsData: props.sessionsData
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.sessionsData && this.state.sessionsData.map((s) => {
                            return <li key={s.id}>{s.title} {s.id}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
} 

Index.propTypes = {};
Index.defaultProps = {};

export default Index;