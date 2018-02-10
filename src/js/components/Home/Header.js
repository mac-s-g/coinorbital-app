import React from "react"
import Styled from "styled-components"
import { Container, Header, Icon, Menu, Segment } from "semantic-ui-react"

import Logo from "./../Logo"

import { project_info, theme, links } from "./../../constants"

const HeaderContainer = Styled.div`
  padding: 1em 0em;
  background-color: ${theme.colors.inverted} !important;
  height: 100vh;
  position: relative;
`
const HeaderContent = Styled.div`
  padding: 30vh 0em 18em 0em;
`
const HeaderLabel = Styled.div`
  font-size: 36px;
  margin-bottom: 0.33em;
`
const MenuContainer = Styled.div`
  border-color: ${theme.colors.inverted} !important;
`

const BottomBar = Styled.div`
  position: absolute;
  color: black;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 4em;
  background-color: ${theme.colors.dash_sidebar};
`

export default ({ navigateTo }) => (
  <Segment inverted textAlign="center" vertical as={HeaderContainer}>
    <Container>
      <Menu inverted pointing secondary size="large" as={MenuContainer}>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={e => navigateTo("/dashboard")}>
          Dashboard
        </Menu.Item>
      </Menu>
    </Container>

    <Container text>
      <HeaderContent>
        <HeaderLabel>{project_info.name}</HeaderLabel>
        <Logo size={100} />
      </HeaderContent>
    </Container>

    <BottomBar />
  </Segment>
)
