import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";
import jwt from "jsonwebtoken";

export default class SignIn extends Component {
  state = {
    nickname: "majdi",
    password: "majditoumi"
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    console.log(this.state);
    if (this.state.nickname==='' || this.state.password==='') {
      alert("Each field is required.")
    } else {
      const response = await fetch("http://localhost:4242/api/auth/login", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state)
      });

      const json = await response.json();
      if(json.error){
        console.log(json.error.message);
        alert(json.error.message)
      }
      else {
        this.props.connect(json.data.user);
        localStorage.setItem("token", json.meta.token);
        localStorage.setItem("nickname", jwt.decode(localStorage.getItem('token')).nickname);
        localStorage.setItem("email", jwt.decode(localStorage.getItem('token')).email);
        localStorage.setItem("uuid", jwt.decode(localStorage.getItem('token')).uuid);
        // localStorage.setItem("user", this.state);
      }
    }
  };

  render() {
    const { nickname, email, password, password_confirmation } = this.state;

    return (
      <Pane clearfix>
      <Pane
      elevation={1}
      float="left"
      backgroundColor="white"
      width={420}
      height={420}
      margin={24}
      padding={24}
      >
      <Pane marginBottom={42}>
      <Text>
      <strong>Sign In</strong>
      </Text>
      </Pane>

      <TextInputField
      label="Nickname"
      name="nickname"
      value={nickname}
      placeholder="Sanji"
      onChange={this.handleChange}
      required
      />

      <TextInputField
      label="Password"
      name="password"
      value={password}
      type="password"
      onChange={this.handleChange}
      required
      />

      <Button
      marginRight={16}
      appearance="primary"
      intent="success"
      onClick={this.login}
      >
      Login
      </Button>
      </Pane>
      </Pane>
    );
  }
}
