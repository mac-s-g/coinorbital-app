import React from "react"
import { Container, Icon, Message, Segment } from "semantic-ui-react"

import LogoName from "./../../Logo/Name"

import { theme } from "./../../../constants"

export default () => (
  <div>
    <Message size="big" attached>
      <div>
        <Icon
          pull="right"
          name="trophy"
          size="large"
          style={{ color: theme.colors.gold, marginRight: "8px" }}
        />
        Welcome to <LogoName />!
      </div>
    </Message>
    <Segment attached>
      <Container>
        <p>Looks like you're just getting started.</p>
        <p>Get the ball rolling by logging a couple of transactions.</p>
      </Container>
    </Segment>
  </div>
)
