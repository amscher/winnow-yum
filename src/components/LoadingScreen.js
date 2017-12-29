import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner } from './common';

class LoadingScreen extends Component {
	render () {
		return (
			<View style={styles.containerStyle}>
				<Spinner size="large" />
			</View>
		);
	}
};

const styles = {
	containerStyle: {
		flex: 1,
		alignContent: 'center'
	}
};

export default LoadingScreen;
