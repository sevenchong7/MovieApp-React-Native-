import { FIRST_TIME_LOGIN, LOGIN, LOGOUT } from "../actions/AuthAction";

const initialState = {
    isLogin: false,
    user: {}
}

function authReducer(state = initialState, action){
    switch (action.type) {
        case LOGIN:
            return {
                ...state, 
                isLogin: true,
                user: action.payload
                
            };
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                user: null
            }
        default:
            return state;
        }
}

export default authReducer;