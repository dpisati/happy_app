import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import OrphanageCreated from './pages/OrphanageCreated';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/orphanage-created" component={OrphanageCreated} />
                <Route path="/orphanages/:id" component={Orphanage} />

                <Route path="/auth/login" component={Login} />
                <Route path="/auth/register" component={Register} />
                
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;