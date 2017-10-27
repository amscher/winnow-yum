import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MealFormReducer from './MealFormReducer';
import MealReducer from './MealReducer'

export default combineReducers({
	auth: AuthReducer,
	mealForm: MealFormReducer,
	meals: MealReducer
});
