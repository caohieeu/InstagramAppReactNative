import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE } from "../constants";

const initState = {
    currentUser: null,
    posts: [],
    following: [],
}

export const user = (state = initState, action) => {
    switch(action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
            }
        case USER_POST_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts,
            }
        case USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                following: action.following,
            }
        default: 
            return {
                state
            }
    }
}
