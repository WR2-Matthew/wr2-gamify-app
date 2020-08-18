import React from 'react';
import Nav from './ponents/Nav/Nav'
import './App.css';
import routes from './routes';
function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
