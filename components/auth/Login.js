import React, { Component, useState } from 'react'
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native'
import { container, form } from '../styles'
import firebase from 'firebase/compat';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    const onSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    setIsValid(true);
                })
                .catch((error) => {
                    setIsValid(false);
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
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                style={form.textInput}
                placeholder='Paassword'
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
            />
            <Text style={styles.textError}>
                {isValid ? "" : "Email or password is incorrect"}
            </Text>

            <View style={form.button}>
                <Button
                    onPress={() => onSignIn()}
                    title="Sign In"
                />
            </View>
        </View>
        <View 
            style={{marginBottom: 5, alignItems: 'center', borderTopWidth: 1, padding: 10}}
            >
            <Text onPress={() => props.navigation.navigate('Register')}>
                Don't have an account? SignUp.
            </Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    textError: {
        color: 'red',
        marginTop: 8,
        marginBottom: 10,
    }
})