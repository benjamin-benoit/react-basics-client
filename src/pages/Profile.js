import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";
import jwt from "jsonwebtoken";

export default class SignUp extends Component {
  state = {
    nickname: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  componentDidMount(){
    if(localStorage.getItem('token'))
    {
      this.setState({nickname: jwt.decode(localStorage.getItem('token')).password_digest});
      this.setState({email: jwt.decode(localStorage.getItem('token')).password_digest});
    }
  }

  update = async () => {
    console.log(jwt.decode(localStorage.getItem('token')));
    console.log(this.state.password);
    console.log(this.state.password_confirmation);
    if (!this.state.password) {
      this.setState({password: jwt.decode(localStorage.getItem('token')).password});
      this.setState({password_confirmation: jwt.decode(localStorage.getItem('token')).password_confirmation});
        console.log(this.state.password);
        console.log(this.state.password_confirmation);

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
          height={600}
          margin={24}
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
        </Pane>
      </Pane>
    );
  }
}
