import React from 'react';
import { View, Text } from 'react-native';

const Profile = ({ route }) => {
    const currentUser = route.params;
    const { currentUser: { name, email } } = currentUser;
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>
                Name: {name}
            </Text>
            <Text>
                Email: {email}
            </Text>
        </View>
    )
};

export default Profile;