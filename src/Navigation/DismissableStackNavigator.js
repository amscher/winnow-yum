import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

export default DismissableStackNavigator = (routes, options) => {
	const StackNav = StackNavigator(routes, options);

	return class DismissableStackNavigator extends Component {
		static router = StackNav.router;

		render() {
			const { state, goBack } = this.props.navigation;
			console.log(state);
			const props = {
				...this.props.screenProps,
				dismissKey: state.key,
				dismiss: () => goBack(state.key)
			};
			return (
				<StackNav
					navigation={this.props.navigation}
					screenProps={props}
				/>
			);
		}
	}
}
