
import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { fetchUser } from '../redux/action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        try {
            const { currentUser } = this.props;

            if(currentUser == undefined) {
                return (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={'black'} />
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text>
                            Name: {currentUser.name}
                        </Text>
                        <Text>
                            Email: {currentUser.email}
                        </Text>
                    </View>
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
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);