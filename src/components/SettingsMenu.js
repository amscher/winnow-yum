import { DrawerItems, SafeAreaView } from 'react-navigation';
import React, { Component } from 'react';
import { StyleSheet, Button, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class SettingsMenu extends Component {
	onLogout() {
		this.props.logoutUser();
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<View style={styles.button}>
							<Button
									onPress={this.onLogout.bind(this)}
									title="log out"/>
						</View>
					</SafeAreaView>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 16
  }
});



export default connect(null, { logoutUser })(SettingsMenu);
