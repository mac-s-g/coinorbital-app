import React from "react"
import { Icon, Message, Segment } from "semantic-ui-react"

import LogoName from "./../../Logo/Name"

import { theme, project_info } from "./../../../constants"

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
      <div>
        <p>Looks like you're just getting started.</p>
        <p>Get the ball rolling by logging a couple of transactions.</p>
      </div>
    </Segment>
  </div>
)
