import React from "react"
import { Icon, Menu } from "semantic-ui-react"
import Styled from "styled-components"

import HeartBeat from "./../../Animations/HeartBeat"

const IconBeat = Styled.a`
  &:hover .icon {
    animation: ${HeartBeat} 2.4s infinite linear;
  }
`

export default ({ login }) => (
  <Menu.Item header position="right" onClick={login}>
    <Icon style={{ marginRight: "8px" }} name="user circle outline" />
    Login
  </Menu.Item>
)
