import * as types from '../actions/types';

const initialState = {
    isAuthenticated: false,
    isError: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isError: false
            };
        case types.SET_ERROR:
            return {
                ...state,
                isAuthenticated: action.user,
                isError: action.isError
            };
        default:
            return state;
    }
};
