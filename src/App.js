import React from 'react';
import './App.css';
import { WeaponProvider } from './WeaponContext.js';
import TestData from './fetchInfo.js';


function App() {

    return (
        <WeaponProvider>
            <div className='App'>
                <TestData />
            </div>
        </WeaponProvider>
    );
}

export default App;
