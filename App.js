import  React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './redux/reducers';
import MainScreen from './components/Main';
import CameraScreen from './components/main/add/Camera';
import SaveScreen from './components/main/add/Save';
import SearchScreen from './components/main/profile/Search'

const store = createStore(rootReducer, applyMiddleware(thunk));

import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyCgGOezUWNZa30IU_9iRVXcEe4ME0IYFM4",
  authDomain: "instagram-dev-6a42f.firebaseapp.com",
  databaseURL: "https://instagram-dev-6a42f-default-rtdb.firebaseio.com",
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Add" component={CameraScreen} />
              <Stack.Screen name="Save" navigation={this.props.navigation} component={SaveScreen} />
              <Stack.Screen name="Search" navigation={this.props.navigation} component={SearchScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    )
  };
}