import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { CardSection } from './common';

class MealListItem extends Component {
	render() {
		const { imagePath, time } = this.props.meal;

		return (
			<CardSection>
				<Image
					style={{ width: 100, height: 100 }}
					source={{ uri: imagePath }}
				/>
				<Text>{ time }</Text>
			</CardSection>
		);
	}
}

export default MealListItem;
