import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Button, Pressable } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts } from '../../../redux/action/index';

function Profile(props) {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const { currentUser } = props;
    useEffect(() => {
        const { currentUser, posts } = props;
        setUser(currentUser);
        setUserPosts(posts);
    }, [props.currentUser, props.posts])

    const onRefresh = () => {
        setRefreshing(true);

        props.fetchUser();
        props.fetchUserPosts();
        const { currentUser, posts } = props;
        setUser(currentUser);
        setUserPosts(posts);

        setRefreshing(false);
    };

    function countPosts(){
        return userPosts.length;
    }
    
    const Item = ({image}) => (
        <TouchableOpacity>
            <View style={styles.containerImage}>
                <Image 
                    source={{ uri: image }}
                    style={styles.imageStyle} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{flex: 1, marginTop: 40}}>
            <View style={styles.headerProfile}>
                <Text style={styles.textUserName}>
                    { currentUser.name }
                </Text>
            </View>
            <View style={styles.infoSection}>
                <View style={{}}>
                    <View style={styles.containerAvatar}>
                        <Image source={{ uri: currentUser.image }} style={{flex: 1, borderRadius: 40}} />
                    </View>
                    <Text style={styles.textName}>
                        { currentUser.name }
                    </Text>
                </View>
                <View style={styles.containerAdditionInfor}>
                    <View style={styles.itemInfor}>
                        <Text style={styles.textCount}>{countPosts()}</Text>
                        <Text>Posts</Text>
                    </View>
                    <View style={styles.itemInfor}>
                        <Text style={styles.textCount}>2</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={styles.itemInfor}>
                        <Text style={styles.textCount}>2</Text>
                        <Text>Following</Text>
                    </View>
                </View>
            </View>
            <View style={styles.containerBtnEdit}>
                <TouchableOpacity
                    style={styles.btnEdit}
                    onPress={() => {console.log("You have entered !")}}>
                    <Text style={{textAlign: "center", fontWeight: "bold"}}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList 
                    data={userPosts}
                    horizontal={false}
                    numColumns={3}
                    renderItem={({item}) => <Item image={item.downloadURL} />}
                    keyExtractor={userPosts.id}
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    infoSection: {
        flexDirection: "row",
        padding: 15,
    },
    imageSection: {
        flex: 1,
    },
    containerImage: {
        width: 120,
        height: 120,
    },
    imageStyle: {
        flex: 1,
        marginRight: 2,
        marginTop: 2,
        aspectRatio: 1/1,
    },
    containerAvatar: {
        width: 80, 
        height: 80, 
        borderRadius: 40,
    },
    headerProfile: {
        borderBottomWidth: 1,
        padding: 10
    },
    textUserName: {
        fontSize: 17,
        fontWeight : "bold"
    },
    textName: {
        paddingTop: 10,
        fontWeight: "bold"
    },
    containerAdditionInfor: {
        padding: 15,
        flexDirection: "row"
    },
    itemInfor: {
        padding: 15,
    },
    textCount: {
        textAlign: "center",
        fontWeight: "bold"
    },
    containerBtnEdit: {
        marginBottom: 20,
    },
    btnEdit: {
        borderWidth: 1,
        borderColor: "#A9A9A9",
        marginLeft: 10,
        marginRight: 10,
        padding: 8,
        borderRadius: 3,
    }
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);