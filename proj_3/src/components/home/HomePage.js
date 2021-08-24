import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="jumbotron">
            <h1>Plu Add</h1>
            <p>Reac...</p>
            <Link to="about" className="btn btn-primary btn-lg">
                Learn more
            </Link>
        </div>
    );
}

export default HomePage;