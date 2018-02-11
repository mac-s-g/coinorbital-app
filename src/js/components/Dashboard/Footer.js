import React from "react"
import Styled from "styled-components"
import { List } from "semantic-ui-react"

import { theme } from "./../../constants"

const Footer = Styled.div`
  background-color: ${theme.colors.well_gray};
  height: ${theme.dash_footer_height};
  text-align: center;
  padding: 5px 5px 0 5px;
`

export default ({ requestContactMe, requestDonate, requestRoadmap }) => (
  <Footer>
    <List horizontal divided link>
      <List.Item as="a" onClick={requestContactMe}>
        Contact
      </List.Item>
      <List.Item as="a" onClick={requestDonate}>
        Donate
      </List.Item>
      <List.Item as="a" onClick={requestRoadmap}>
        Roadmap
      </List.Item>
    </List>
  </Footer>
)
