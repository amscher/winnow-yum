
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Middleware
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import reducers from './reducers';
import { getLoggedInUser } from './actions';

// redux related book keeping
const store = createStore(reducers, {} /* initial state */, applyMiddleware(thunk) /* store enhancer */);

// screen related book keeping
registerScreens(store, Provider);

export default class App {
	constructor() {
		// since react-redux only works on components, we need
		// to subscribe this class manually
		store.subscribe(this.onStoreUpdate.bind(this));
		store.dispatch(getLoggedInUser());
	}

	onStoreUpdate() {
		const { isAuthed } = store.getState().auth;
		const root = isAuthed ? 'after-login' : 'login'

		if (this.currentRoot != root) {
			this.currentRoot = root;
			this.startApp(root);
		}
	}

	startApp(root) {
		switch(root) {
			case 'login':
				Navigation.startSingleScreenApp({
					screen: {
						screen: 'cibo.LoginForm',
						title: 'login',
						navigatorStyle: {}
					}
				});
				return;
			case 'after-login':
				Navigation.startSingleScreenApp({
					screen: {
						screen: 'cibo.PersonalFeed',
						navigatorStyle: {},
						navigatorButtons: {
							leftButtons: [
								{
									title: 'Settings',
									id: 'settings'
								}
							]
						}
					},
					drawer: {
						left: {
							screen: 'cibo.SettingsMenu'
						}
					}
				});
				return;
			default:
				console.error('Unknown app root');
		}
	}
}
