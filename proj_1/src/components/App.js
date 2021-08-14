import Header from './Header';
import Speakers from './Speakers';
import Layout from './Layout'

const App = () => {
    return (
        <Layout initialTheme={'light'}>
            <Header />
            <Speakers />
        </Layout>
    )
}

export default App;