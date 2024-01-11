import firebase from "firebase/compat"
import { USER_STATE_CHANGE } from '../constants/index';

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists) {
                    dispatch({ type: 'USER_STATE_CHANGE', currentUser: snapshot.data() });
                }
                else {
                    console.log('error when fetching user');
                }
            })
    })
}