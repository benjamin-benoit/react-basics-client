import React from "react";
import { Pane, Text } from "evergreen-ui";

const Home = () => (
  <Pane
    elevation={1}
    float="left"
    backgroundColor="white"
    width="100%"
    height={240}
    margin="auto"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Text size={300}>
      <strong>Hello, welcome on Sanji, you can login or register if you want manage your projects.</strong>
    </Text>
  </Pane>
);

export default Home;
