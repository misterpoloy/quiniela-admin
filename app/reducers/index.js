import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import theme from './theme';
import authAdmin from './authAdmin';
import settings from './settings';

const rootReducer = combineReducers({
    theme,
    authAdmin,
    settings,
    routing
});

export default rootReducer;
