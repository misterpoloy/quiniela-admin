import API from '../constants/axios';
import * as types from '../actions/types';

export function setAuth(isAuthenticated) {
    return {
        type: types.SET_AUTH,
        isAuthenticated
    };
}
export function setError(isError) {
    return {
        type: types.SET_ERROR,
        isError
    };
}

// POST_LOGIN
export function login(body) {
    return dispatch => {
        API.post('login', {
            ...body
        })
            .then(response => {
                console.log(response);
                if (response.data.status === 'fail') {
                    dispatch(setError(true));
                } else {
                    const user = response.data;
                    localStorage.setItem('PrensaTokenAdmin', user.api_token);
                    localStorage.setItem('PrensaUserIdAdmin', user.id);
                    dispatch(setAuth(true));
                }
            }).catch(e => {
                console.log('Error login": ' + e);
                dispatch(setError(true));
            });
    };
}

// POST_LOGIN
export function logout() {
    return dispatch => {
        localStorage.clear();
        dispatch(setAuth(false));
    };
}
