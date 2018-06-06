import React from "react"
import { Icon, Menu } from "semantic-ui-react"
import Styled from "styled-components"

import MobileOnly from "./../../Responsive/MobileOnly"
import NonMobileContent from "./../../Responsive/NonMobileContent"

const LogoutComponent = Styled.a`
  font-size: 1.07142857rem !important;
`

export default ({ login }) => (
    <Menu.Item as={LogoutComponent} header position="right" onClick={login}>
        <Icon name="google" />
        <Icon name="facebook" />
        <MobileOnly>
            <Icon name="user circle outline" />
        </MobileOnly>
        <NonMobileContent>Login</NonMobileContent>
    </Menu.Item>
)
