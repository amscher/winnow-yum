import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Card, CardSection, Button, Spinner } from './common';
import { fbLoginUser } from '../actions';


class LoginForm extends Component {
	onFbLoginUser() {
		// call action creator to update state
		this.props.fbLoginUser();
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onFbLoginUser.bind(this)}>
				Facebook Login
			</Button>
		);
	}

	render() {
		return (
			<View>
				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>

				<Card>
					<CardSection>
						{this.renderButton()}
					</CardSection>
				</Card>
			</View>
		);
	}
}


const styles = {
	errorTextStyle: {
		fontSize: 20,
		color: 'red'
	}
};

const mapStateToProps = ({ auth }) => {
	const { error, loading } = auth;

	return { error, loading };
};

export default connect(mapStateToProps, { fbLoginUser })(LoginForm);
