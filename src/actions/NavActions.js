import { NavigationActions } from 'react-navigation';

export const launchMealAddFlow = (dispatch) => {
	return (dispatch) => {
		console.log("launching meal add")
		dispatch(NavigationActions.navigate({ routeName: 'MealCreateStack' }));
	}
}

export const returnFromMealCreation = (dispatch) => {
	NavigationActions.goBack('MealCreateStack')
}
