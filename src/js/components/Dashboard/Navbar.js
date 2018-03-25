import React from "react"
import Styled from "styled-components"
import { Icon, Menu, Segment } from "semantic-ui-react"

import Logo from "./../Logo/"

import { project_info, theme } from "./../../constants"

const HeaderContainer = Styled.div`
  background-color: ${theme.colors.inverted} !important;
  padding: 0 !important;
  border-radius: 0px !important;
  height: ${theme.dash_nav_height};
  margin: 0px !important;

  & .menu {
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

  & .icon {
    margin-right: 1em !important;
  }
`

const NavbarName = Styled.span`
  margin-left: 6px;
`

export default ({ navigateTo }) => (
  <Segment as={HeaderContainer} inverted>
    <Menu inverted secondary>
      <Menu.Item
        as="a"
        header
        onClick={e => navigateTo("/")}
        onMouseOver={e => (e.target.children[0].id = "logo-pulse")}
        onMouseLeave={e => (e.target.children[0].id = "")}
      >
        <Logo size={20} />
        <NavbarName>{project_info.name}</NavbarName>
      </Menu.Item>
    </Menu>
  </Segment>
)
