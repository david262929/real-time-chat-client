import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Join}/>
            <Route path="/chat" exact  component={Chat}/>
            <Redirect to="/" />
        </Switch>
    )
}