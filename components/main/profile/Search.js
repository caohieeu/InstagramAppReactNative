import { DocumentSnapshot } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { queryUsersByUsername } from '../../../redux/action/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Profile } from './Profile'

const Search = (props) => {
    const [users, setUsers] = useState([]);

    const Item = ({data}) => {
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile", { uid: data.id, username: undefined })}>
                <View style={styles.itemUser}>
                    <View style={styles.itemContainerImage}>
                        <Image 
                            source={{ uri: data.image}}
                            style={styles.itemImage} />
                    </View>
                    <View style={styles.itemText}>
                        <Text style={{fontWeight: 'bold'}}>
                            {data.username}
                        </Text>
                        <Text style={{opacity: 0.4}}>
                            {data.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.safeArea}>
            <View style={{borderBottomWidth: 1, borderColor: '#A9A9A9'}}>
                <TextInput
                    placeholder='Search'
                    style={styles.searchInput}
                    selectionColor={"#A9A9A9"}
                    onChangeText={async (txtSearch) => {
                        console.log(txtSearch);
                        await props.queryUsersByUsername(txtSearch).then(users => {
                            setUsers(users);
                        })
                    }}>
                </TextInput>
            </View>
            <View>
                <FlatList 
                    data={users}
                    renderItem={({item}) => <Item data={item} />}
                    keyExtractor={users.id}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: 39,
    },
    searchInput: {
        height: 38,
        margin: 10,
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#DCDCDC',
    },
    itemContainerImage: {
        width: 50,
        height: 50,
    },
    itemImage: {
        borderRadius: 40,
        flex: 1,
    },
    itemUser: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 9,
    },
    itemText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    }

});

const mapDispatchToProps = (dispatch) => bindActionCreators({queryUsersByUsername}, dispatch);

export default connect(null, mapDispatchToProps)(Search);