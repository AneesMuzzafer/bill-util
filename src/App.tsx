import Navigation from './Routes/Navigation';
import { store } from './state/store';
import { Provider } from 'react-redux'

function App() {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
}

export default App;
