import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div>
            <h1>About</h1>
            <p>About stuff...</p>
            <Link to="home" className="btn btn-primary btn-lg">
                Learn more
            </Link>
        </div>
    );
}

export default AboutPage;