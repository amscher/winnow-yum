import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import { mealCapture } from '../actions';

class MealCapture extends Component {

	onCameraCapture() {
		this.props.mealCapture(this.camera, () => this.goToMealCreate());
	}

	goToMealCreate() {
		this.props.navigator.push({ screen: 'cibo.MealCreate' })
	}


	render () {
		return (
			<View style={styles.container}>
				<Camera
					ref={ (cam) => { this.camera = cam; }}
					style={styles.preview}
					aspect={Camera.constants.Aspect.fill}
					captureTarget={Camera.constants.CaptureTarget.disk}
				>
				  	<Text style={styles.capture} onPress={this.onCameraCapture.bind(this)}>[CAPTURE]</Text>
	    	</Camera>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { mealCapture })(MealCapture);
