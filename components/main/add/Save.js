import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Image, Button } from 'react-native';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { container } from '../../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../../redux/action/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

require('firebase/firestore');

function Save(props) {
    const [caption, setCaption] = useState("");
    const navigation = useNavigation();

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
                        .storage()
                        .ref()
                        .child(childPath)
                        .put(blob);
        
        const taskProgress = snapshot => {
            console.log(`transfered: ${snapshot.bytesTransferred}`);
        }
        const taskCompleted = snapshot => {
            task.snapshot.ref.getDownloadURL()
                .then((snapshot) => {
                    console.log(snapshot);
                    savePoastData(snapshot);
                })
                .catch(error => {
                    console.log(error);
                }) 
        }
        const taskError  = snapshot => {
            console.log(snapshot);
        }
        task.on('state_change', taskProgress, taskError, taskCompleted);

        const savePoastData = (downloadURL) => {
            firebase.firestore()
                .collection("posts")
                .doc(firebase.auth().currentUser.uid)
                .collection("userPosts")
                .add({
                    downloadURL,
                    caption,
                    creation: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(function() {
                    navigation.popToTop();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const { currentUser } = props;
    return (
        <View style={container.container}>
            <View style={{flexDirection: 'col', flex: 1}}>
                <View style={container.center}>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 15, paddingTop: 15}}>
                        <View style={{width: 42, height: 42}}>
                            <Image 
                                source={{ uri: currentUser.image}}
                                style={{flex: 1, borderRadius: 40}} />
                        </View>
                        <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                            {currentUser.name}
                        </Text>
                    </View>   
                    <TextInput
                        multiline
                        numberOfLines={4}
                        onChangeText={(textCaption) => setCaption(textCaption)}
                        placeholder='Write a caption...'>
                    </TextInput>
                </View>
                <View style={[container.center, styles.containerImage]}>
                    <Image 
                        source={{ uri: props.route.params.image }}
                        style={styles.imageSave} />
                </View>
                <View style={[container.container, {justifyContent: 'center'}]}>
                    <View style={{margin: 10}}>
                        <Button title="back" color={'red'} onPress={() => alert("Tính năng đang phát triển")} />
                    </View>
                    <View style={{margin: 10}}>
                        <Button title="save" color={'black'} onPress={uploadImage} />
                    </View>
                </View>
            </View>
        </View>
      )
};

const styles = StyleSheet.create({
    containerImage: {
        margin: 10,
        padding: 15,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 15,
    },
    imageSave: {
        flex: 1,
    },
    textInput: {
        paddingLeft: 15,
    }
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Save);