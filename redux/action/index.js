import firebase from "firebase/compat"
import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE } from '../constants/index';

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists) {
                    dispatch({ type: "USER_STATE_CHANGE", currentUser: snapshot.data() });
                }
                else {
                    console.log("error when fetching user");
                }
            })
    })
}   

export function fetchUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "desc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map((doc) => {
                    let data = doc.data();
                    let id = doc.id;
                    return {
                        id,
                        ...data
                    }
                })
                dispatch({ type: 'USER_POST_STATE_CHANGE', posts});
            })
    })
}