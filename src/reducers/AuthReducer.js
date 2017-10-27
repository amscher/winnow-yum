import {
	FB_LOGIN,
	FB_LOGIN_SUCCESS,
	LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	user: null,
	error: ""
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case FB_LOGIN:
			return { ...state, loading: true, error: '' };
		case FB_LOGIN_SUCCESS:
			return {
				...state /* future proofing state */,
				...INITIAL_STATE,
				user: action.payload
			};
		case LOGIN_FAIL:
			return {...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
