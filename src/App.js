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
import Projects from "./pages/Projects";

import logo from "./logo.svg";
import "./App.css";

// localStorage.setItem("TEST", "HELLO");

class App extends Component {
  state = {
    user: null,
    isConnected: false
  };

  componentDidMount(){
    if(localStorage.getItem('token'))
    {
      this.setState({isConnected: true});
      this.setState({user: jwt.decode(localStorage.getItem('token'))});
      // localStorage.setItem("nickname", jwt.decode(localStorage.getItem('token')).nickname);
      // localStorage.setItem("email", jwt.decode(localStorage.getItem('token')).email);
      // localStorage.setItem("uuid", jwt.decode(localStorage.getItem('token')).uuid);
    }
    // if(localStorage.getItem('user')){
    //   this.setState({user: localStorage.getItem('user')});
    // }
  }

  handleUser = user => {
    this.setState({ user, isConnected: true });
  };

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
    localStorage.removeItem('uuid');
    window.location.reload();
  }

  render() {
    const { user, isConnected } = this.state;
    // console.log(localStorage.getItem('token'));
    // if(isConnected)
    // console.log(user.nickname);
    // let userData = jwt.decode(localStorage.getItem('token'));
    // console.log(userData.nickname)

    return (
      <Router>
      <>
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
      <Pane flex={1} alignItems="center" display="flex">
      <Link to="/" className="App-menu">
      <Heading size={600}>Sanji server+react bootstrap</Heading>
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
        <Link to="/projects" className="App-menu">
        <Button marginRight={16}>My Projects</Button>
        </Link>
        <Link to="/profile" className="App-menu">
        <Button marginRight={16}>Profile</Button>
        </Link>
        <Link to="/dashboard" className="App-menu">
        <Button marginRight={16} appearance="primary" intent="danger" onClick={this.logout}>Logout</Button>
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
          <Redirect to="/dashboard" />
        );
      }}
      />
      <Route
      path="/sign-up"
      component={() => {
        return !isConnected ? (
          <SignUp connect={this.handleUser} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
      />
      {isConnected && (
        <>
        <Route
        path="/profile"
        component={() => <Profile />}
        />
        <Route
        path="/projects"
        component={() => <Projects />}
        />
        <Route
        path="/dashboard"
        component={() => <Dashboard nickname={user.nickname} />}
        />
        </>
      )}
      </>
      </Router>
    );
  }
}

export default App;

// 1. GERER LA PERSISTENCE DE DONNEES -
// A. ENREGISTRER LE TOKEN HANDLE USER
// B. RECUPERER QUAND REFRESH
// C. REMOVE TOKEN ON LOGOUT

// 2. CREER PAGE PROFILE USER + EDIT + REMOVE

// 3. CREER USER PROJECT(S) + EDIT + REMOVE
