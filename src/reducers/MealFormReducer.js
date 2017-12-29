import {
	MEAL_CREATE,
	MEAL_CREATE_SUCCESS,
	MEAL_CAPTURE,
	MEAL_CAPTURE_SUCCESS,
	MEAL_CAPTURE_FAILURE,
	GET_LOCATION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	imagePath: '',
	time: '',
	geolocation: null,
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case MEAL_CREATE:
			return { ...state, loading: true }
		case MEAL_CREATE_SUCCESS:
			return { ...INITIAL_STATE }
		case MEAL_CAPTURE:
			return { ...state, loading: true }
		case MEAL_CAPTURE_SUCCESS:
			return { ...state, loading: false, imagePath: action.payload.data.path, time: action.payload.time }
		case MEAL_CAPTURE_FAILURE:
			return { ...state, loading: false }
		case GET_LOCATION_SUCCESS:
			return { ...state, geolocation: action.payload }
		default:
			return state;
	}
};
