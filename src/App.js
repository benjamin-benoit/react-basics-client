import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Pane, Heading, Button } from "evergreen-ui";
import jwt from "jsonwebtoken";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CreateProject from "./pages/CreateProject";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    user: null,
    isConnected: false
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isConnected: true });
      this.setState({ user: jwt.decode(localStorage.getItem("token")) });
    }
  }

  handleUser = user => {
    this.setState({ user, isConnected: true });
  };

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    localStorage.removeItem("uuid");
    window.location.reload();
  }

  render() {
    const { user, isConnected } = this.state;

    return (
      <Router>
        <>
          <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
            <Pane flex={1} alignItems="center" display="flex">
              <Link to="/" className="App-menu">
                <Heading size={600}>Sanji</Heading>
              </Link>
            </Pane>
            {!isConnected && (
              <>
                <Link to="/sign-in" className="App-menu">
                  <Button marginRight={16}>Login</Button>
                </Link>
                <Link to="/sign-up" className="App-menu">
                  <Button marginRight={16} appearance="primary">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            {isConnected && (
              <>
                <Link to="/dashboard" className="App-menu">
                  <Button marginRight={16}>Dashboard</Button>
                </Link>
                <Link to="/create-project" className="App-menu">
                  <Button marginRight={16}>Create Project</Button>
                </Link>
                <Link to="/profile" className="App-menu">
                  <Button marginRight={16}>Profile</Button>
                </Link>
                <Link to="/dashboard" className="App-menu">
                  <Button
                    marginRight={16}
                    appearance="primary"
                    intent="danger"
                    onClick={this.logout}
                  >
                    Logout
                  </Button>
                </Link>
              </>
            )}
          </Pane>
          <Route exact path="/" component={Home} />
          <Route
            path="/sign-in"
            component={() => {
              return !isConnected ? (
                <SignIn connect={this.handleUser} />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
          <Route
            path="/sign-up"
            component={() => {
              return !isConnected ? (
                <SignUp connect={this.handleUser} />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
          {isConnected && (
            <>
              <Route path="/profile" component={() => <Profile />} />
              <Route
                path="/create-project"
                component={() => <CreateProject />}
              />
              <Route
                path="/dashboard"
                component={() => <Dashboard isConnected={isConnected} />}
              />
            </>
          )}
        </>
      </Router>
    );
  }
}

export default App;
