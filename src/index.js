import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reducers from './reducers';
import thunk from 'redux-thunk';

import App from './components/app';
import Login from './components/login';
import Wrapper from './components/wrapper';

//firebase listoner action
import { startListeningToAuth } from './actions/auth_actions'; 

// A super-simple logger
var logger = store => next => action => {
	console.log('dispatching', action.type,action)
	var result = next(action)
	console.log('next state', store.getState())
	return result
}

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
let store = createStoreWithMiddleware(reducers);

//on touch tap initialization for material ui
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Wrapper}>
        <IndexRoute component={Login} />
        <Route path="calendar" component={App} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));


// setup Firebase listeners
setTimeout(function(){
	store.dispatch( startListeningToAuth() )
  //store.dispatch( actions.startListeningToAuth() );
	//store.dispatch( actions.startListeningToQuotes() );
}, 100);