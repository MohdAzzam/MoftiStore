import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

export default function PrivateRoute({ component: Component, ...props }) {
    const { user } = useContext(GlobalContext.Context);
    const path = props.computedMatch.path;
    
    let userNotAllow = false;

    if (path !== "login" || path !== "register") {
        userNotAllow = true;
    }

    return (
        <Route
            {...props}
            render={(renderProps) =>
                !user && userNotAllow ? (
                    <Redirect
                        to={{
                            pathname: "/login",
                            search: `?ref=${document.URL}`
                        }}
                    />
                ) : (
                    <Component {...renderProps} />
                )
            }
        />
    );
}