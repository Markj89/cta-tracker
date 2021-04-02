import React from 'react';
import Map from './components/Map.js';
import { hot } from 'react-hot-loader';

import './styles/index.scss';

function App() {
  return (
    <main>
      <article className="App">
        <Map />
      </article>
    </main>
  );
}

export default hot(module)(App);
