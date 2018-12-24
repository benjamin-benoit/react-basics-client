import React, { Component } from "react";
import { Pane, Text, Table, Button } from "evergreen-ui";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import UpdateProject from "./UpdateProject";

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

  delete = async id => {
    const response = await fetch(`http://localhost:4242/api/project/${id}`, {
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
      alert("Project successfully deleted !");
      window.location.reload();
    }
  };

  render() {
    const { name } = this.state;
    const myProjects = this.state.projects.map((project, i) => (
      <Table.Row key={project.id}>
        <Table.TextCell flexBasis="70%" flexShrink={0} flexGrow={0}>
          {project.name}
        </Table.TextCell>
        <Table.TextCell>
          <Link to={{ pathname: '/update-project', state: { name: "test"} }} className="App-menu">
            <Button>Update</Button>
          </Link>
        </Table.TextCell>
        <Table.TextCell>
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => this.delete(project.id)}
          >
          Delete
          </Button>
        </Table.TextCell>
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
          <strong>
            Hello, {this.state.isConnected ? this.state.nickname : ""}
          </strong>
        </Text>
        <Table width="100%" margin="10px">
          <Table.Head>
            <Table.TextHeaderCell flexBasis="70%" flexShrink={0} flexGrow={0}>
              Project Name
            </Table.TextHeaderCell>
            <Table.TextHeaderCell>Update</Table.TextHeaderCell>
            <Table.TextHeaderCell>Delete</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>{myProjects}</Table.Body>
        </Table>
        <>
      <Router>
      <>
        <Route
          path="/update-project"
        />
        </>
      </Router>
      </>
      </Pane>
    );
  }
}
