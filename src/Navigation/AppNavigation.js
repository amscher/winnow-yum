import React, { Component } from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import NavigationStack from "./NavigationStack";
import * as ActionCreators from "../actions";

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    props.getLoggedInUser();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigationState } = this.props;
    if (navigationState.index <= 1) {
      BackHandler.exitApp();
      return;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { navigationState, dispatch, isLoggedIn } = this.props;

    const navigation = addNavigationHelpers({
      dispatch,
      state: navigationState
    });

    return ( <NavigationStack navigation={navigation} /> );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isAuthed,
    navigationState: state.nav
  };
};

// TODO: understand how/why this works
const mapDispatchToProps = dispatch => {
  return Object.assign({dispatch: dispatch}, bindActionCreators(ActionCreators, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
