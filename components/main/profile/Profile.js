import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    FlatList, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../../../redux/action/index';
import firebase from 'firebase/compat';

function Profile(props) {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(false);

    const updateUserData =() => {
        if(props.route.params.uid === firebase.auth().currentUser.uid) {
            const { currentUser, posts } = props;
            setUser(currentUser);
            setUserPosts(posts);
            setLoading(false);
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if(snapshot.exists) {
                        setUser({ uid: props.route.params.uid, ...snapshot.data() });
                    }
                    setLoading(false);
                })
                
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "desc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        let id = doc.id;
                        let data = doc.data();
                        return {
                            id,
                            ...data
                        }
                    })
                    setUserPosts(posts);
                })
            if(props.following.indexOf(props.route.params.uid) > -1) {
                setFollowing(true);
            }
            else {
                setFollowing(false);
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        updateUserData();
    }, [props.route.params.uid, props.currentUser, props.posts, props.following])

    const onRefresh = () => {
        setRefreshing(true);
        props.fetchUser();
        props.fetchUserPosts();
        updateUserData();
        setRefreshing(false);
    };

    function onFollow() {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(user.uid)
            .set({})
    }

    function onUnFollow() {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(user.uid)
            .delete()
    }

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

    if(loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color={'black'} />
            </View>
        )
    }

    else if(user == null) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    User not found
                </Text>
            </View>
        )
    }
    else {
        return (
            <View style={{flex: 1, marginTop: 40}}>
                <View style={styles.headerProfile}>
                    <Text style={styles.textUserName}>
                        { user.username }
                    </Text>
                </View>
                <View style={styles.infoSection}>
                    <View style={{width: 100}}>
                        <View style={styles.containerAvatar}>
                            <Image 
                                source={{ uri: user.image }} 
                                style={styles.imageAvatar} />
                        </View>
                        <Text style={styles.textName}>
                            { user.name }
                        </Text>
                    </View>
                    <View style={styles.containerAdditionInfor}>
                        <View style={styles.itemInfor}>
                            <Text style={styles.textCount}>{countPosts()}</Text>
                            <Text style={styles.titleItem}>Posts</Text>
                        </View>
                        <View style={styles.itemInfor}>
                            <Text style={styles.textCount}>2</Text>
                            <Text style={styles.titleItem}>Followers</Text>
                        </View>
                        <View style={styles.itemInfor}>
                            <Text style={styles.textCount}>2</Text>
                            <Text style={styles.titleItem}>Following</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.containerBtnEdit}>
                    {props.route.params.uid == firebase.auth().currentUser.uid ? 
                    <TouchableOpacity
                        style={styles.btnEdit}
                        onPress={() => {console.log("You have entered !")}}>
                        <Text style={{textAlign: "center", fontWeight: "bold"}}>Edit Profile</Text>
                    </TouchableOpacity> : 
                    <View style={{flexDirection: 'row', justifyContent: 'space-around' }}>
                        {following ? 
                            (<TouchableOpacity
                                    style={[styles.btnInteract, following ? styles.borderGreen:null]}
                                    onPress={() => onUnFollow()}>
                                <Text style={styles.btnFollowing}>Following</Text>
                            </TouchableOpacity>
                            )
                        :
                            (<TouchableOpacity
                                    style={[styles.btnInteract, following ? styles.borderGreen:null]}
                                    onPress={() => onFollow()}>
                                <Text style={styles.btnFollow}>Follow</Text>
                            </TouchableOpacity>)}
                        <TouchableOpacity
                            style={styles.btnInteract}
                            onPress={() => {console.log("You have entered !")}}>
                            <Text style={{textAlign: "center", fontWeight: "bold"}}>Message</Text>
                        </TouchableOpacity>
                    </View>
                        }
                </View>
                <View style={styles.containerListPosts}>
                    {countPosts() <= 0 ? 
                        <Text style={{textAlign: 'center', color: '#A9A9A9'}}>
                            No images yet
                        </Text>: null
                    }
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
    }
};

const styles = StyleSheet.create({
    infoSection: {
        flexDirection: "row",
        padding: 15,
    },
    imageSection: {
        flex: 1,
    },
    containerListPosts: {
        flex: 1,
        marginLeft: 2,
    },
    containerImage: {
        width: 130,
        height: 130,
        flex: 1,
    },
    imageStyle: {
        flex: 1,
        marginTop: 2,
        aspectRatio: 1/1,
    },
    containerAvatar: {
        width: 80, 
        height: 80, 
        borderRadius: 40,
    },
    imageAvatar: {
        flex: 1,
        borderRadius: 40
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
        padding: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    itemInfor: {
        padding: 10,
    },
    textCount: {
        textAlign: "center",
        fontWeight: "bold"
    },
    titleItem: {
        fontSize: 15,
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
    },
    btnInteract: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 3,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
    },
    btnFollow: {
        textAlign: "center", 
        fontWeight: "bold"
    },
    btnFollowing: {
        textAlign: "center", 
        fontWeight: "bold",
        color: "#32CD32",
    },
    borderGreen: {
        borderColor: "#32CD32"
    }
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
