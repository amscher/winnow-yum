import React from 'react';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PersonalFeed from './components/PersonalFeed';
import MealCapture from './components/MealCapture';
import MealCreate from './components/MealCreate';


const RouterComponent = () => {
	return (
		<Router sceneStyle={{ /* can be used for global scene style */ }}>
			<Stack key="root" hideNavBar >
				<Scene key="loginFlow" initial>
					<Scene key="login" component={ LoginForm } title="Please Login" />
				</Scene>

				<Scene key="main" >
					<Scene
						key="personalFeed"
						component={ PersonalFeed }
						title="today"
						rightTitle="Add"
						onRight={ () => Actions.mealCreateFlow() }
						initial
					/>
					<Scene key="mealCreateFlow">
						<Scene key="mealCapture" component={ MealCapture } title="Take a Photo" />
						<Scene key="mealCreate" component={ MealCreate } title="Create Meal" />
					</Scene>
				</Scene>
			</Stack>
		</Router>
	);
};

export default RouterComponent;
