import { NavigationActions } from 'react-navigation';

import NavigationStack from '../Navigation/NavigationStack';

import {
	IS_AUTHENTICATED,
	IS_NOT_AUTHENTICATED
} from '../actions/types';


const NavigationReducer = (state, action) => {
	let newState = undefined;
	console.log(state);
	switch (action.type) {
	  case IS_AUTHENTICATED:
	    newState = NavigationStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'main'}), state);
	    return newState || state;
	  case IS_NOT_AUTHENTICATED:
	  	newState = NavigationStack.router.getStateForAction(NavigationActions.reset({
	  		index: 0,
	  		actions: [ NavigationActions.navigate({ routeName: 'login' }) ]
	  	}));
	  	return newState || state;
		default:
			newState = NavigationStack.router.getStateForAction(action, state);
			console.log(newState);
			return newState || state;
	}
}

// error: Expect nav state to have routes and index... means that the state being passed to router.getStateForAction is not valid
// likely because it's a nested navigation, and the state object passed in as the previous state isn't valid

export default NavigationReducer;


