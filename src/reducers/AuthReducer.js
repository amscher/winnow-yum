import firebase from 'react-native-firebase';

import {
	IS_AUTHENTICATED,
	IS_NOT_AUTHENTICATED,
	FB_LOGIN,
	FB_LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOG_OUT
} from '../actions/types';

const INITIAL_STATE = {
	isAuthed: undefined,
	loading: false,
	user: null,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case IS_AUTHENTICATED:
			return { ...state, isAuthed: true, user: action.payload };
		case IS_NOT_AUTHENTICATED:
			return { ...state, isAuthed: false };
		case FB_LOGIN:
			return { ...state, loading: true, error: '' };
		case FB_LOGIN_SUCCESS:
			return {
					...state /* future proofing state */,
					...INITIAL_STATE,
					user: action.payload,
					isAuthed: true
				};
		case LOGIN_FAIL:
			return {
					...state,
					loading: false,
					error: action.payload,
					isAuthed: false
				};
		case LOG_OUT:
			return { INITIAL_STATE }
		default:
			return state;
	}
};
