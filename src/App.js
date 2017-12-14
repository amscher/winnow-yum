import { AppRegistry, View, Text } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Middleware
import reducers from './reducers';
import { getLoggedInUser } from './actions';
import AppNavigation from './Navigation/AppNavigation';

// redux related book keeping
const store = createStore(reducers, {} /* initial state */, applyMiddleware(thunk) /* store enhancer */);

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppNavigation />
			</Provider>
		);
	}
}

AppRegistry.registerComponent('cibo', () => Root);
