import React from "react"
import Styled from "styled-components"
import { Container, Grid, Header, List, Segment } from "semantic-ui-react"

import { project_info, theme } from "./../../constants"

const grid_width = {
  gutter: {
    largeScreen: 4,
    computer: 4,
    tablet: 2,
    mobile: 1
  },
  links: {
    largeScreen: 2,
    computer: 2,
    tablet: 4,
    mobile: 5
  },
  call_to_action: {
    largeScreen: 6,
    computer: 6,
    tablet: 8,
    mobile: 9
  }
}

const FooterContainer = Styled.div`
  padding: 5em 0em !important;
  background-color: ${theme.colors.inverted} !important;
`

export default ({ requestContactMe, requestDonate, requestRoadmap }) => (
  <Segment inverted vertical as={FooterContainer}>
    <Container textAlign="center">
      <Grid inverted>
        <Grid.Row>
          <Grid.Column {...grid_width.gutter} />
          <Grid.Column {...grid_width.links}>
            <List link inverted>
              <List.Item as="a" onClick={requestContactMe}>
                Contact Me
              </List.Item>
              <List.Item as="a" onClick={requestDonate}>
                Donate
              </List.Item>
              <List.Item as="a" onClick={requestRoadmap}>
                Roadmap
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column {...grid_width.call_to_action}>
            <Header as="h4" inverted>
              {project_info.name}
            </Header>
            <p>{project_info.description_brief}</p>
          </Grid.Column>
          <Grid.Column {...grid_width.gutter} />
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)
