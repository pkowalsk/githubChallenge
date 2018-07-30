import React from 'react';
import Header from './common/Header';
import { Switch, Route } from 'react-router-dom';

import HomePage from './home/HomePage';
import UserPage from './user/UserPage';

class App extends React.Component {
	render() {
      return (
          <div className="container-fluid">
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/user/:login" component={UserPage} />
                <Route component={HomePage} />
            </Switch>
          </div>
      );
  }
}

export default App;
