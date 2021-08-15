import Header from './Header';
import Speakers from './Speakers';
import Layout from './Layout'
import { AuthProvider } from '../contexts/AuthContext';

const App = () => {
    return (
        <AuthProvider initialLoggedInUser={'Ronald'}>
            <Layout initialTheme={'light'}>
                <Header />
                <Speakers />
            </Layout>
        </AuthProvider>
    )
}

export default App;