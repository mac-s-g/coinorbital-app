import React from "react"
import Styled from "styled-components"
import { Container, Header, Icon, Menu, Segment } from "semantic-ui-react"

import { project_info, theme, links } from "./../../constants"

const HeaderContainer = Styled.div`
  padding: 1em 0em;
  background-color: ${theme.colors.inverted} !important;
`
const HeaderContent = Styled.div`
  padding: 14em 0em 18em 0em;
`
const HeaderLabel = Styled.div`
  font-size: 36px;
  margin-bottom: 0.33em;
`
const MenuContainer = Styled.div`
  border-color: ${theme.colors.inverted} !important;
`
const Logo = Styled.i`
  color: ${theme.colors.logo};
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
        <Menu.Item
          position="right"
          as="a"
          href={links.github}
          target="_blank"
          style={{ padding: "0.33em" }}
        >
          <Icon name="github" size="big" />
        </Menu.Item>
      </Menu>
    </Container>

    <Container text>
      <HeaderContent>
        <HeaderLabel>{project_info.name}</HeaderLabel>
        <Icon name="angle double left" size="big" as={Logo} />
        <Icon name="id card outline" size="huge" as={Logo} />
        <Icon name="angle double right" size="big" as={Logo} />
      </HeaderContent>
    </Container>
  </Segment>
)
