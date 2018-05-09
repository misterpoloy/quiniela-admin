import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Welcome from './containers/WelcomeContainer';
import CountriesContainer from './containers/CountriesContainer';
import GroupsContainer from './containers/GroupsContainer';
import SuperQuiniela from './containers/SuperQuinielasContainer';
import AddGame from './containers/AddGame';
import Welcome from './containers/Login';
export default (
	<Switch>
        <Route exact path="/" component={()=>(<Welcome/>)} /> // Until I upload the Welcome
        <Route path="/countries" component={()=>(<CountriesContainer/>)} />
        <Route path="/groups" component={()=>(<GroupsContainer/>)} />
        <Route path="/super" component={()=>(<SuperQuiniela/>)} />
        <Route path="/add" component={()=>(<AddGame/>)} />
	</Switch>
);
