
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import withAuth from './withAuth';

const Header = ({ loggedInUser, setLoggedInUser }) => {
    const { theme } = useContext(ThemeContext);

    const LoggedIn = ({ loggedInUser, setLoggedInUser }) => {
        return (
            <div>
                <span>Logged in as {loggedInUser}</span>
                <button className="btn btn-secondary"
                    onClick={() => (setLoggedInUser(''))}>Logout</button>
            </div>
        );
    };

    const NotLoggedIn = ({ setLoggedInUser }) => {
        return (
            <div>
                <button className="btn btn-secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        const userName = window.prompt('Enter Login Name:', '');
                        setLoggedInUser(userName);
                    }}>Login</button>
            </div>
        );
    };

    return (
        <div className="padT4 padB4">
            <div className="container mobile-container">
                <div className="d-flex justify-content-between">
                    <div>
                        <img src="/images/SVCCLogo.png" alt="VSCC Home Page" />
                    </div>
                    <div className="light">
                        <h4 className="header-title">Silicon Valley</h4>
                    </div>
                    <div className={theme === 'light' ? '' : 'text-info'}>
                        {
                            loggedInUser ?
                                <LoggedIn loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}></LoggedIn> :
                                <NotLoggedIn setLoggedInUser={setLoggedInUser}></NotLoggedIn>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Header);