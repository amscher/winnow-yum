import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';

import {
	MEAL_CAPTURE,
	MEAL_CAPTURE_SUCCESS,
	MEAL_CATPURE_FAILURE,
	MEAL_CREATE,
	MEAL_CREATE_SUCCESS,
	MEALS_FETCH_SUCCESS,
	GET_LOCATION_SUCCESS
} from './types.js';

export const mealCapture = (camera, callbackFn) => {
	return (dispatch) => {
		dispatch({ type: MEAL_CAPTURE, payload: null });

		camera.capture()
			.then((data) => {
				dispatch({ type: MEAL_CAPTURE_SUCCESS, payload: { data: data, time: new Date() } } );
				navigator.geolocation.getCurrentPosition((pos) => dispatch({ type: GET_LOCATION_SUCCESS, payload: pos }));
				callbackFn();
			})
			.catch((err) => {
				dispatch({ type: MEAL_CAPTURE_FAILURE, payload: null });
				console.log(err)
			});  // TODO: do something with this error?
	}
}

export const mealCreate = ({ imagePath, time, geolocation }, onSuccessFn) => {
	return (dispatch) => {
		dispatch({ type: MEAL_CREATE });
		const { currentUser } = firebase.auth();

		//Add photo to firebase storage
		firebase.storage().ref(`/users/${currentUser.uid}/images/${time}`)
			.put(imagePath)
			.then(snapshot => {
				var downloadImgPath = snapshot.downloadURL;
				console.log(downloadImgPath);
				// Add meal to firebase
				firebase.database().ref(`/users/${currentUser.uid}/meals`)
					.push({ imagePath: downloadImgPath, time, geolocation })
					.then(() => {
						dispatch({ type: MEAL_CREATE_SUCCESS });
						onSuccessFn(); // returns to personal feed screen
					});
			})
			.catch(err => console.log(err)) // TODO: do something with this error?

	}
}

export const mealsFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		// Anytime new data is available, at any point in app lifecycle, it will automatically dispatch call this function...
		// This is a watch function
		firebase.database().ref(`/users/${currentUser.uid}/meals`)
			.on('value', snapshot => { // Snapshot is object that describes the data
				dispatch({ type: MEALS_FETCH_SUCCESS, payload: snapshot.val() })
			});
	}
}

