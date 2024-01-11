import { USER_STATE_CHANGE } from '../constants/index';

const initState = {
    currentUser: null,
}

export const user = (state = initState, action) => {
    switch(action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
            }
        default:
            return state;
    } 
}
