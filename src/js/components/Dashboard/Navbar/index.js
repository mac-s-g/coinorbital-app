import React from "react"
import Styled from "styled-components"
import { Icon, Menu, Segment } from "semantic-ui-react"

import Login from "./Login"
import Logout from "./Logout"
import Logo from "./../../Logo/"
import HeartBeat from "./../../Animations/HeartBeat"
import LogoName from "./../../Logo/Name"

import { theme } from "./../../../constants"

const HeaderContainer = Styled.div`
  background-color: ${theme.colors.blue} !important;
  padding: 0 !important;
  border-radius: 0px !important;
  height: ${theme.dash_nav_height};
  margin: 0px !important;

  & > .menu {
    height: ${theme.dash_nav_height};
  }

  & .menu > .item {
    margin: 0 !important;
    padding: 0 2em !important;
    border-radius: 0px !important;
    height: 100%;
    font-size: 18px;
    font-weight: 300 !important;
  }
`

const NavbarName = Styled.span`
  margin-left: 6px;
`

const ImgBeat = Styled.a`
  &:hover img {
    animation: ${HeartBeat} 2.4s infinite linear;
  }
`

export default ({ auth, navigateTo }) => (
  <Segment as={HeaderContainer} inverted>
    <Menu inverted secondary>
      <Menu.Item as={ImgBeat} header onClick={e => navigateTo("/")}>
        <Logo size={20} />
        <NavbarName>
          <LogoName inverted />
        </NavbarName>
      </Menu.Item>
      {!auth.isAuthenticated() && <Login login={auth.login} />}
      {auth.isAuthenticated() && <Logout auth={auth} />}
    </Menu>
  </Segment>
)
