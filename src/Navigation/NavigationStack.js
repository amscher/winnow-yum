import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Platform } from 'react-native';

import DismissableStackNavigator from './DismissableStackNavigator';
import LoginForm from '../components/LoginForm';
import MealCapture from '../components/MealCapture';
import MealCreate from '../components/MealCreate';
import PersonalFeed from '../components/PersonalFeed';
import SettingsMenu from '../components/SettingsMenu';
import LoadingScreen from '../components/LoadingScreen';

// TODO: add style
const defaultHeader = {
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginLeft: Platform.OS === 'ios' ? -10 : 10
  },
  headerTintColor: 'white',
  headerBackTitle: null
}

const MealCreateStack = DismissableStackNavigator({
	mealCapture: { screen: MealCapture },
	mealCreate: { screen: MealCreate }
}, {
	navigationOptions: {
		header: null
	}
});

const HomeStack = StackNavigator({
	personalFeed: {
		screen: PersonalFeed,
		navigationOptions: ({navigation}) => ({
			headerLeft: <Icon name="menu" size={25} onPress={() => navigation.navigate('DrawerToggle') }/>,
		})
	}
}, {
	headerMode: 'screen',
  initialRouteName: 'personalFeed',
  navigationOptions: {
    ...defaultHeader
  }
});

const MainDrawerStack = DrawerNavigator({
	homeStack: { screen: HomeStack }
}, {
	contentComponent: SettingsMenu,
});

const MainNavigator = StackNavigator({
	mealCreateStack: { screen: MealCreateStack },
	mainDrawerStack: {
		screen: MainDrawerStack,
		navigationOptions: {
			header: null
		}
	}
}, {
	mode: 'modal',
	initialRouteName: 'mainDrawerStack',
	navigationOptions: {
		gesturesEnabled: false
	}
})

const LoginNavigator = StackNavigator({
	login: { screen: LoginForm }
}, {
	headerMode: 'float',
	initialRouteName: 'login'
});

const NavigationStack = StackNavigator({
	loading: { screen: LoadingScreen },
	login: { screen: LoginNavigator },
	main: { screen: MainNavigator }
}, {
	headerMode: 'none',
	title: 'Main',
	initialRouteName: 'loading'
});

export default NavigationStack;
