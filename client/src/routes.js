import React from 'react'
import { Route, BrowserRouter,Switch } from "react-router-dom";
import Home from './views/Home'
import Admin from './views/Admin'



const Routes = () => (
  <BrowserRouter>
     <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/admin" component={Admin}/>
      </Switch>
  </BrowserRouter>
)


export default Routes;
