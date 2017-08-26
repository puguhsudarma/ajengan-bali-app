import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import AppNavigator from '../routers/';

class App extends Component {
  constructor(props) {
    super(props);
    this._onBackPress = this._onBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  _onBackPress() {
    const { dispatch, nav, customNav } = this.props;
    if (customNav.drawerOpen) {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'DrawerClose',
      });
      return true;
    }

    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={
        addNavigationHelpers({ dispatch, state: nav })
      }
      />
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape().isRequired,
  customNav: PropTypes.shape().isRequired,
};

export default connect(state => ({ nav: state.nav, customNav: state.customNav }))(App);
