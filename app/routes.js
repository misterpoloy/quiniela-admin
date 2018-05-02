import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Welcome from './containers/WelcomeContainer';
import CountriesContainer from './containers/CountriesContainer';
import GroupsContainer from './containers/GroupsContainer';
import SuperQuiniela from './containers/SuperQuinielasContainer';
import AddGame from './containers/AddGame';

export default (
	<Switch>
		<Route exact path="/" component={()=>(<CountriesContainer/>)} /> // Until I upload the Welcome
        <Route path="/countries" component={()=>(<CountriesContainer/>)} />
        <Route path="/groups" component={()=>(<GroupsContainer/>)} />
        <Route path="/super" component={()=>(<SuperQuiniela/>)} />
        <Route path="/add" component={()=>(<AddGame/>)} />
	</Switch>
);
