import  React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import rootReducer from './redux/reducers'
import MainScreen from './components/Main'

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store);
import firebase from "firebase/compat/app";
const firebaseConfig = {
    apiKey: "AIzaSyCgGOezUWNZa30IU_9iRVXcEe4ME0IYFM4",
    authDomain: "instagram-dev-6a42f.firebaseapp.com",
    projectId: "instagram-dev-6a42f",
    storageBucket: "instagram-dev-6a42f.appspot.com",
    messagingSenderId: "1098759962739",
    appId: "1:1098759962739:web:8feeea824f46d7dd15ea06",
    measurementId: "G-W6JJ9R3EDY"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  async componentDidMount() {
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
          this.setState({
            loaded: true,
            loggedIn: false,
          })
        } else {
          this.setState({
            loaded: true,
            loggedIn: true,
          })
        }
      })
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    const { loaded, loggedIn} = this.state;
    if(!loaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      )
    }
    if(!loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" navigation={this.props.navigation} component={RegisterScreen} />
          <Stack.Screen name="Login" navigation={this.props.navigation} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  };
}