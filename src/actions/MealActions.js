import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
	MEAL_CAPTURE_SUCCESS,
	MEAL_CREATE,
	MEAL_CREATE_SUCCESS,
	MEALS_FETCH_SUCCESS,
	GET_LOCATION_SUCCESS
} from './types.js';

export const mealCapture = (camera) => {
	console.log("meal capture action")
	return (dispatch) => {
		camera.capture()
			.then((data) => {
				console.log(data);
				dispatch({ type: MEAL_CAPTURE_SUCCESS, payload: { data: data, time: new Date() } } );
				Actions.mealCreate();
				navigator.geolocation.getCurrentPosition((pos) => dispatch({ type: GET_LOCATION_SUCCESS, payload: pos }));
			})
			.catch(err => console.log(err));
	}
}

export const mealCreate = ({ imagePath, time, geolocation }) => {

	return (dispatch) => {
		dispatch({ type: MEAL_CREATE });
		const { currentUser } = firebase.auth();

		//Add photo to firebase storage
		firebase.storage().ref(`/users/${currentUser.uid}/images/${time}`)
			.put(imagePath)
			.then(snapshot => {
				console.log(snapshot);
				var downloadImgPath = snapshot.downloadURL;
				// Add meal to firebase
				firebase.database().ref(`/users/${currentUser.uid}/meals`)
					.push({ imagePath: downloadImgPath, time, geolocation })
					.then(() => {
						dispatch({ type: MEAL_CREATE_SUCCESS })
						Actions.popTo("personalFeed")
						// OR Actions.personalFeed({ type: 'reset' })
					});
			})
			.catch(err => console.log(err))

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

