import React, { FC } from 'react';
import './App.scss';
import AppProvider from './context/AppContext';
import Home from './pages/Home';

const App: FC = () => (
  <div className="app-container">
    <AppProvider>
      <Home />
    </AppProvider>
  </div>

);

export default App;
