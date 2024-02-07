
import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../redux/action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedScreen from './main/post/Feed';
import CameraScreen from './main/add/Camera';
import ProfileScreen from './main/profile/Profile';
import SearchScreen from './main/profile/Search';
import ChatScreen from './main/chat/Chat';
import ChatListScreen from './main/chat/ChatList';
import firebase from 'firebase/compat';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null);
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }

    render() {
        try {
            const { currentUser, posts } = this.props;

            if(currentUser === undefined) {
                return (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={'black'} />
                    </View>
                )
            } else {
                return (
                    <Tab.Navigator 
                        initialRouteName="Feed"
                        
                        labeled={false}
                        tabBarOptions={{
                            showIcon: true,
                            indicatorStyle: {
                                opacity: 0,
                            },
                        }}
                        barStyle={{ backgroundColor: '#ffffff'}}
                        >
                        <Tab.Screen 
                            name="Feed" 
                            component={FeedScreen}
                            options={{
                                tabBarIcon: ({ color, size, focused }) => (
                                    <MaterialCommunityIcons 
                                        name="home" 
                                        color={focused ? "black" : color} 
                                        size={26} />
                                ),
                            }} />
                        <Tab.Screen 
                            name="Search" 
                            component={SearchScreen}
                            options={{
                                tabBarIcon: ({ color, size, focused }) => (
                                    <MaterialCommunityIcons 
                                        name="magnify" 
                                        color={focused ? "black" : color} 
                                        size={26}
                                         />
                                ),
                            }} />
                        <Tab.Screen
                            listeners={({ navigation }) => ({
                                tabPress: event => {
                                    event.preventDefault();
                                    navigation.navigate("Add");
                                }
                            })}
                            name="MainAdd" 
                            component={EmptyScreen}
                            options={{
                                tabBarIcon: ({ color, size, focused }) => (
                                    <MaterialCommunityIcons 
                                        name="plus-box" 
                                        color={focused ? "black" : color}
                                        size={26} />
                                ),
                            }} />
                        <Tab.Screen 
                            name="ChatScreen"
                            component={ChatListScreen}
                            options={{
                                tabBarIcon: ({ color, size, focused }) => (
                                    <MaterialCommunityIcons 
                                        name="send" 
                                        color={focused ? "black" : color} 
                                        size={24}
                                        style={{ transform: [{ rotate: '-30deg' }] }}
                                        />
                                ),
                            }}/>
                        <Tab.Screen 
                            name="Profile" 
                            component={ProfileScreen}
                            listeners={({ navigation }) => ({
                                tabPress: event => {
                                    event.preventDefault;
                                    navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid });
                                }
                            })}
                            options={{
                                tabBarIcon: ({ color, size, focused }) => (
                                    <MaterialCommunityIcons 
                                        name="account-circle" 
                                        color={focused ? "black" : color}
                                        size={26} />
                                ),
                            }} />
                    </Tab.Navigator>
                )
            }
        }
        catch (error) {
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text>Some thing went wrong</Text>
            </View>
        }
    }
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);