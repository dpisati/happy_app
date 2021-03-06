import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import UpdateOrphanage from './pages/UpdateOrphanage';
import OrphanageCreated from './pages/OrphanageCreated';
import OrphanageDeleted from './pages/OrphanageDeleted';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Waiting from './pages/Waiting';
import Admin from './pages/Admin';
import { UserProvider } from './context/UserContext';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <UserProvider>
                    <Route path="/" exact component={Landing} />
                    <Route path="/app" component={OrphanagesMap} />

                    <Route path="/orphanages/create" exact component={CreateOrphanage} />
                    <Route path="/orphanages/admin" exact component={Admin} />
                    <Route path="/orphanages/id/:id"  component={UpdateOrphanage} />
                    <Route path="/orphanages/:id" component={Orphanage} />
                    <Route path="/orphanage/orphanage-created" exact component={OrphanageCreated} />
                    <Route path="/orphanage/orphanage-deleted" exact component={OrphanageDeleted} />

                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/register" component={Register} />
                    
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/dashboard/waiting" component={Waiting} />
                </UserProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;