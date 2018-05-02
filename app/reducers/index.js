import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import theme from './theme';

const rootReducer = combineReducers({
    theme,
    routing
});

export default rootReducer;
