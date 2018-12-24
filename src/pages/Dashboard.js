import React, { Component } from "react";
import { Pane, Text, Table } from "evergreen-ui";

export default class Dashboard extends Component {
  state = {
    isConnected: this.props.isConnected,
    nickname: localStorage.nickname,
    projects: []
  };

  componentDidMount() {
    this.getAllProjects();
    this.state.nickname = localStorage.nickname;
  }

  getAllProjects = async () => {
    if (localStorage.token) {
      const { token } = localStorage;
      const response = await fetch("http://localhost:4242/api/project/", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
          "Content-Type": "application/json"
        },
        method: "GET"
      });

      const json = await response.json();
      if (json.error) {
        alert(json.error);
      } else {
        this.setState({ projects: json.data });
      }
    }
  };

  render() {
    const { name } = this.state;
    const myProjects = this.state.projects.map((project, i) => (
      <Table.Row key={project.id}>
        <Table.TextCell>{project.name}</Table.TextCell>
      </Table.Row>
    ));
    return (
      <Pane
        elevation={1}
        float="left"
        backgroundColor="white"
        width="100%"
        height="auto"
        margin={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text>
          <strong>Dashboard</strong>
        </Text>
        <Text size={300}>
          <strong>Hello, {this.state.isConnected ? this.state.nickname : ""}</strong>
        </Text>
        <Table width="100%" margin="10px">
          <Table.Head>
            <Table.TextHeaderCell>Project Name</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>{myProjects}</Table.Body>
        </Table>
      </Pane>
    );
  }
}
