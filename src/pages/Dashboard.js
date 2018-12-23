import React, { Component } from "react";
import { Pane, Text } from "evergreen-ui";

export default class Dashboard extends Component {
  state = {
    projects: "",
  };

  render() {
    const { name } = this.state;
    return (
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
        <Text>
          <strong>Dashboard</strong>
        </Text>
        <Text size={300}>
          <strong>Hello, {localStorage.nickname}</strong>
        </Text>
        <Pane>
        <p>

        </p>
        </Pane>
      </Pane>
    );
  }
}

// const Dashboard = ({ nickname }) => (
//   <Pane
//     elevation={1}
//     float="left"
//     backgroundColor="white"
//     width="100%"
//     height={240}
//     margin={0}
//     display="flex"
//     justifyContent="center"
//     alignItems="center"
//     flexDirection="column"
//   >
//     <Text>
//       <strong>Dashboard</strong>
//     </Text>
//     <Text size={300}>
//       <strong>Hello, {localStorage.nickname ? localStorage.nickname : nickname}</strong>
//     </Text>
//     <Pane>
//     <p>
//
//     </p>
//     </Pane>
//   </Pane>
// }

// export default Dashboard;
