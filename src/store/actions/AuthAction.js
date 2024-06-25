import axios from 'axios'
export const LOGIN  = "LOGIN";
export const LOGOUT = "LOGOUT";
export const FIRST_TIME_LOGIN = "FIRST_TIME_LOGIN";

export const firstTimeLogin = () => dispatch => {
    dispatch({
        type: FIRST_TIME_LOGIN
    })
}

export const login = (user) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: user
    });
    
};

export const logout = () =>  dispatch =>{
    dispatch({
        type: LOGOUT,
    })
}