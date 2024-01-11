import React, { Component, useState } from 'react'
import { View, Text, TextInput, Button, Image } from 'react-native'
import { container, form } from '../styles'
import firebase from 'firebase/compat';
import { Snackbar } from 'react-native-paper';

require('firebase/firestore');

export default function Register(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(true);

    const onSignUp = () => {
        if(username.length == 0 || name.length == 0 || password.length == 0 || email.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: 'Please fill out everything' });
            return;
        }
        if(password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: 'Password must be at least 6 characters' });
            return;
        }

        firebase.firestore()
            .collection('users')
            .where('username', '==', username)
            .get()
            .then((snapshot) => {
                if(!snapshot.exist) {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            if(snapshot.exist) {
                                return;
                            }

                            firebase.firestore()
                                .collection('users')
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    name,
                                    email,
                                    username,
                                    image: 'default',
                                    followingCount: 0,
                                    followersCount: 0,
                                })
                        })
                        .catch((error) => {
                            setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" });
                            console.log(error);
                        })
                }
            })
            .catch((error) => {
                setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" });
                console.log(error);
            })
    };

    return (
    <View style={container.center}>
        <View style={container.formCenter}>
            <View style={{alignItems: 'center', marginBottom: 50}}>
                <Image
                    source={require('../../assets/logo-Instagram.png')}
                    style={{width: 130, height: 50}}
                />
            </View>
            <TextInput
                style={form.textInput}
                placeholder='Username'
                onChangeText={(username) => setUsername(username)}
            />
            <TextInput
                style={form.textInput}
                placeholder='Name'
                onChangeText={(name) => setName(name)}
            />
            <TextInput
                style={form.textInput}
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                style={form.textInput}
                placeholder='Paassword'
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
            />
            
            <View style={form.button}>
                <Button
                    onPress={() => onSignUp()}
                    title="Sign Up"
                />
            </View>
        </View>
        <View 
            style={{marginBottom: 5, alignItems: 'center', borderTopWidth: 1, padding: 10}}
            >
            <Text onPress={() => props.navigation.navigate('Login')}>
                Already have an account? SignIn.
            </Text>
        </View>
        <Snackbar
            visible={isValid.boolSnack}
            duration={2000}
            onDismiss={() => setIsValid(false)}>
            {isValid.message}
        </Snackbar>
    </View>
    )
}
