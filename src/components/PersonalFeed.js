import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { mealsFetch } from '../actions';
import { Button, CardSection } from './common';
import MealListItem from './MealListItem';

class PersonalFeed extends Component {
	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this.props.mealsFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component
		// will be rendered with
		// this.props is still the old set of props
		this.createDataSource(nextProps);
	}


	pushAddMeal = () => {
		this.props.navigator.push({ screen: 'cibo.MealCapture' });
	}

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
  }

	onNavigatorEvent(event) {
		if (event.type == 'NavBarButtonPress') {
			if (event.id == 'settings') {
				this.toggleDrawer();
			}
		}
	}

	createDataSource({ meals }) {
		let sortedMeals = meals.sort((a, b) => {
			if (a.time < b.time) return 1;
			if (a.time > b.time) return -1;
			return 0;
		});
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(sortedMeals);
	}

	renderRow(meal) {
		return <MealListItem meal={meal} />;
	}

	render () {
		return (
			<View>
				<CardSection>
					<Button onPress={this.pushAddMeal}>
						Add
					</Button>
				</CardSection>
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	const meals = _.map(state.meals, (val, uid) => {
		return { ...val, uid };
	});
	return { meals };
}

export default connect(mapStateToProps, { mealsFetch })(PersonalFeed);
