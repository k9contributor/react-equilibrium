import logo from './logo.svg';
import './App.css';
import Marco from './components/Marco';
import Polo from './components/Polo';

import Equilibrium, { useEquilibrium } from './equilibrium';

export default function App() {
    return (<Equilibrium.Provider value={useEquilibrium()}>
        <div className="App">
            <header className="App-header">
                <Marco />
                <Polo />
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
        </div>
    </Equilibrium.Provider>);
}