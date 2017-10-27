import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import { FB_LOGIN, FB_LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export const fbLoginUser = () => {
	return (dispatch) => {
		dispatch({ type: FB_LOGIN });

		LoginManager
			.logInWithReadPermissions(['public_profile', 'email'])
		  .then((result) => {
		    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
		    // get the access token
		    return AccessToken.getCurrentAccessToken();
		  })
		  .then(data => {
		  	console.log(`Retrieved accessToken, getting credential`)
		    // create a new firebase credential with the token
		    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

		    // login with credential
		    return firebase.auth().signInWithCredential(credential);
		  })
		  .then((currentUser) => {
		    if (currentUser === 'cancelled') {
		      console.log('Login cancelled');
		    } else {
		      // now signed in
		      console.warn(JSON.stringify(currentUser.toJSON()));
		      dispatch({ type: FB_LOGIN_SUCCESS, payload: currentUser });
		      Actions.main();
		    }
		  })
		  .catch((error) => {
		    console.log(`Login fail with: ${error}`);
		    loginUserFail(dispatch, error);
		  });
	};
};

export const loginUserFail = (dispatch, error) => {
	dispatch({ type: LOGIN_FAIL, paylod: error });
};
