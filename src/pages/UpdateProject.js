import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";

export default class UpdateProject extends Component {
  state = {
    id: "",
    name: ""
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name } = this.state;

    return (
      <Pane clearfix>
        <Pane
          elevation={1}
          float="left"
          backgroundColor="white"
          width="100%"
          height={240}
          margin={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <TextInputField
            label="Name"
            name="name"
            placeholder="Project name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <Button
            marginRight={16}
            appearance="primary"
            intent="success"
            onClick={this.createProject}
          >
            Create Project
          </Button>
        </Pane>
      </Pane>
    );
  }
}
