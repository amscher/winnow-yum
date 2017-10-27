import {
	MEAL_CREATE,
	MEAL_CREATE_SUCCESS,
	MEAL_CAPTURE_SUCCESS,
	GET_LOCATION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	imagePath: '',
	time: '',
	geolocation: null,
	attemptingCreation: false
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case MEAL_CREATE:
			return { ...state, attemptingCreation: true }
		case MEAL_CREATE_SUCCESS:
			return { ...INITIAL_STATE }
		case MEAL_CAPTURE_SUCCESS:
			return { ...state, imagePath: action.payload.data.path, time: action.payload.time }
		case GET_LOCATION_SUCCESS:
			return { ...state, geolocation: action.payload }
		default:
			return state;
	}
};
