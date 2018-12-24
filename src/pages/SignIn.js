import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";
import jwt from "jsonwebtoken";

export default class SignIn extends Component {
  state = {
    nickname: "",
    password: ""
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    if (this.state.nickname === "" || this.state.password === "") {
      alert("Each field is required.");
    } else {
      const response = await fetch("http://localhost:4242/api/auth/login", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state)
      });

      const json = await response.json();
      if (json.error) {
        alert(json.error.message);
      } else {
        this.props.connect(json.data.user);
        localStorage.setItem("token", json.meta.token);
        localStorage.setItem(
          "nickname",
          jwt.decode(localStorage.getItem("token")).nickname
        );
        localStorage.setItem(
          "email",
          jwt.decode(localStorage.getItem("token")).email
        );
        localStorage.setItem(
          "uuid",
          jwt.decode(localStorage.getItem("token")).uuid
        );
      }
    }
  };

  render() {
    const { nickname, email, password, password_confirmation } = this.state;

    return (
      <Pane clearfix>
        <Pane
          elevation={1}
          backgroundColor="white"
          width={420}
          height={600}
          margin="auto"
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
