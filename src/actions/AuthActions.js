import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { NavigationActions } from 'react-navigation';
import {
	FB_LOGIN,
	FB_LOGIN_SUCCESS,
	LOGIN_FAIL,
	IS_AUTHENTICATED,
	IS_NOT_AUTHENTICATED,
	LOG_OUT
} from './types';

const FB_LOGIN_BEHAVIOR = Platform.OS === 'ios' ? 'web' : 'native_with_fallback';

export const getLoggedInUser = () => {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				dispatch({ type: IS_AUTHENTICATED, payload: user });
			} else {
				dispatch({ type: IS_NOT_AUTHENTICATED });
			}
		});
	};
};

// helper
const handleLoginCancelled = (dispatch) => {
	console.log("cancelled");
	dispatch({ type: LOGIN_FAIL, payload: "" });
};

// helper
const handleFirebaseLoginFail = (dispatch, error) => {
	console.log(`Login fail with: ${error.messsage}`);
	dispatch({ type: LOGIN_FAIL, payload: error });
	// TODO: Handle errors from firebase.auth().signInWithCredential
}

// helper
const handleFirebaseLoginSuccess = (dispatch, currentUser) => {
	if (currentUser === 'cancelled') {
		console.log('Login cancelled');
	} else {
		// now signed in
		console.warn(JSON.stringify(currentUser.toJSON()));
		dispatch({ type: FB_LOGIN_SUCCESS, payload: currentUser });
	}
}

export const fbLoginUser = () => {
	return (dispatch) => {
		dispatch({ type: FB_LOGIN });
		LoginManager.setLoginBehavior(FB_LOGIN_BEHAVIOR); // Enables changing of email addresses
		LoginManager
			.logInWithReadPermissions(['public_profile', 'email'])
			.then(
				(result) => {
					console.log("trying to login");
					if (result.isCancelled == true) {
						handleLoginCancelled(dispatch, "");
						return;
					}

					console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
					AccessToken.getCurrentAccessToken()
						.then(data => {
							console.log('Retrieved FB accessToken, getting credential');
							// create a new firebase credential with the token and login with firebase
							const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
							return firebase.auth().signInWithCredential(credential);
						})
						.then((currentUser) => {
							handleFirebaseLoginSuccess(dispatch, currentUser);
						})
						.catch((error) => { handleFirebaseLoginFail(dispatch, error) });
				},
				(error) => {
					console.log("Facebook login fail with error: " + error);
					dispatch({ type: LOGIN_FAIL, payload: error });
				}
			);
	};
};

export const authStateAuthenticated = (user) => {
	return (dispatch) => {
		dispatch({ type: IS_AUTHENTICATED, payload: user });
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		// TODO: Handle errors
		LoginManager.logOut();
		firebase.auth().signOut()
			.then(dispatch({ type: LOG_OUT }));
	}
}
