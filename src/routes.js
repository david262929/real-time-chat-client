import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Join />
            </Route>
            <Route path="/chat" exact>
                <Chat />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}