import axios from "axios";
import * as data from "../../screens/data.json";

export const GET_MOVIES = 'GET_MOVIES';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';


// const API_URL = 'YOUR_API_URL';
// const API_KEY = 'YOUR_API_KEY';
// const PARAMS = 'YOUR_URL_PARAMS';
// const BASE_URL = `${API_URL}?api_key=${API_KEY}&${PARAMS}`;

export const getMovies = () => {
    try {
        return async dispatch => { 
            const res = data;
            if(res.results) {
                dispatch({
                    type: GET_MOVIES,
                    payload: res.results,
                });
                // console.log(res.results)
            } else {
                console.log('Unable to fetch');
            }
        };
    }catch(error) {
        console.log(error)
    }
};

export const addFavorites = movie => dispatch => { 
    dispatch({
        type: ADD_FAVORITE_ITEM,
        payload: movie
    });
};

export const removeFavorite = movie => dispatch => {
    dispatch({
        type: REMOVE_FAVORITE_ITEM,
        payload: movie
    });
};



