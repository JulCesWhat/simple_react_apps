
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
    const { theme } = useContext(ThemeContext);

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
                        Hello Capi
                        <span><a href="#">sing-out</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;