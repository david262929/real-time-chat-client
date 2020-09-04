import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <h1>Join</h1>
            </Route>
            <Route path="/chat" exact>
                <h1>Chat</h1>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}