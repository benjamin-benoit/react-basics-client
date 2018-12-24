import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";

export default class CreateProject extends Component {
  state = {
    name: ""
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  createProject = async () => {
    if (this.state.name === "") {
      alert("Name of project is required.");
    } else {
      const response = await fetch("http://localhost:4242/api/project/add", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state)
      });

      const json = await response.json();
      if (json.err) {
        alert(json.err);
      } else {
        alert(json.msg);
        this.setState({ name: "" });
      }
    }
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
