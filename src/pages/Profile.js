import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";
import jwt from "jsonwebtoken";
import { Redirect, Link } from "react-router-dom";

export default class SignUp extends Component {
  state = {
    nickname: localStorage.nickname,
    email: localStorage.email,
    password: null,
    password_confirmation: null
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  update = async () => {
    const { nickname, email } = this.state;
    const { token } = jwt.decode(localStorage.getItem("token"));
    const { uuid } = jwt.decode(localStorage.getItem("token"));
    if (this.state.nickname === "" || this.state.password === "") {
      alert("Each field is required.");
    } else {
      const response = await fetch(`http://localhost:4242/api/user/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token")
        },
        method: "PUT",
        body: JSON.stringify(this.state)
      });
      const json = await response.json();
      if (json.err) {
        alert(json.err);
      } else {
        alert("User updated.");
        localStorage.nickname = nickname;
        localStorage.email = email;
      }
    }
  };

  delete = async () => {
    const { uuid } = jwt.decode(localStorage.getItem("token"));
    const response = await fetch(`http://localhost:4242/api/user/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("token")
      },
      method: "DELETE",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    if (json.error) {
      return this.setState({
        open_snack: true,
        variant: "error",
        msg: json.error
      });
    } else {
      localStorage.clear();
      alert("User successfully deleted !");
      window.location.reload();
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
              <strong>Update profile</strong>
            </Text>
          </Pane>

          <TextInputField
            label="Nickname"
            name="nickname"
            value={nickname}
            placeholder="Sanji"
            onChange={this.handleChange}
          />
          <TextInputField
            label="Email"
            name="email"
            value={email}
            placeholder="sanji@op.co"
            onChange={this.handleChange}
          />

          <TextInputField
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={this.handleChange}
          />

          <TextInputField
            label="Password confirmation"
            name="password_confirmation"
            value={password_confirmation}
            type="password"
            onChange={this.handleChange}
          />

          <Button
            marginRight={16}
            appearance="primary"
            intent="success"
            onClick={this.update}
          >
            Update
          </Button>

          <Link to="/dashboard" className="App-menu">
            <Button
              marginRight={16}
              appearance="primary"
              intent="danger"
              onClick={this.delete}
            >
              Delete my account
            </Button>
          </Link>
        </Pane>
      </Pane>
    );
  }
}
