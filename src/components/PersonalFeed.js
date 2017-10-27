import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { mealsFetch } from '../actions';
import MealListItem from './MealListItem';

class PersonalFeed extends Component {
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

	createDataSource({ meals }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(meals);
	}

	renderRow(meal) {
		return <MealListItem meal={meal} />;
	}

	render () {
		console.log(this.props);
		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
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
