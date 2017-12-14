import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { fbLoginUser, authStateAuthenticated } from '../actions';


class LoginForm extends Component {

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.props.fbLoginUser}>
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

export default connect(mapStateToProps, { fbLoginUser, authStateAuthenticated })(LoginForm);
