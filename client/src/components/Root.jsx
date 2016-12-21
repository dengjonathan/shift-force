import * as React from 'react';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';

import App from './App';
import Main from './Main';
import About from './About';

export default () => (
  <div>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Main}/>
        <Route path='/about' component={About}/>
      </Route>
    </Router>
  </div>
);
