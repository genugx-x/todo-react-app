import React from "react";
import "./index.css";
import App from "./App";
import Login from "./login";
import { BrowserRouter as Router, Switch ,Route } from "react-router-dom"; // react-router-dom v6.0.0은 Switch 사용에 문제가 있음. v5.2.0 버전으로 설치

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright ⓒ "}
          Seongbeom's demo, {new Date().getFullYear()}
          {"."}
      </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        return(
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/">
                                <App />
                            </Route>
                        </Switch>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Router>
            </div>
        );
    }
}

export default AppRouter;