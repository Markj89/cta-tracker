import * as React from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { MapContextProvider } from './context';


const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <MapContextProvider showMapValue={false} drawerValue={false} stationValue={null} stationsValue={null} screenSizeValue={{ width: window.innerWidth, height: window.innerHeight }}>
            <App />
        </MapContextProvider>
    </React.StrictMode>, 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
