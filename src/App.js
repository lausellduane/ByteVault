import React, { Component } from 'react';
import './App.css';
import '@patternfly/react-core/dist/styles/base.css'
import PageLayoutDefaultNav from './components/nav_bar/nav_bar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageLayoutDefaultNav />
      </div>
    );
  }
}

export default App;
