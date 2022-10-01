import React, { Component } from 'react';
import './App.css';
import '@patternfly/react-core/dist/styles/base.css'
import PageLayoutDefaultNav from './components/nav_bar/nav_bar';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DashboardWrapper } from './components/wrapper'; 

const queryClient = new QueryClient()

class App extends Component {
  render() {
    return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <DashboardWrapper mainContainerId="main-content-page-layout-default-nav"/>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    );
  }
}

export default App;
