import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { mealCreate } from '../actions';
import { Button, CardSection } from './common'

class MealCreate extends Component {

	handleMealCreate() {
		const { imagePath, time, geolocation } = this.props;
		this.props.mealCreate({ imagePath, time, geolocation },
				() => this.props.screenProps.dismiss());
	}

	render () {
		const imgPath = '' + this.props.imagePath;
		console.log(this.props);

		return (
			<View>
				<Image
					style={{ width: 200, height: 200 }}
					source={{ uri: this.props.imagePath }}
				/>
				<CardSection>
					<Button onPress={this.handleMealCreate.bind(this) /* because a callback, need this */} >
						ADD
					</Button>
				</CardSection>
			</View>
		);
	}
}

const mapStateToProps = ({ mealForm }) => {
	return mealForm;
};

export default connect( mapStateToProps, { mealCreate } )(MealCreate);
