import * as React from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { MapContextProvider } from './context';
import { Auth0Provider } from "@auth0/auth0-react";


const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Auth0Provider 
            domain={process.env.AUTH0_DOMAIN}
            clientId={process.env.AUTH0_CLIENT_ID}
            authorizationParams={{ redirect_uri: window.location.origin }}>
            <MapContextProvider showMapValue={false} drawerValue={false} stationValue={null} stationsValue={null} screenSizeValue={{ width: window.innerWidth, height: window.innerHeight }}>
                <App />
            </MapContextProvider>
        </Auth0Provider>
    </React.StrictMode>, 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
