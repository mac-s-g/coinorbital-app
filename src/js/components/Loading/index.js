import React from "react"
import { Container, Loader } from "semantic-ui-react"
import Styled from "styled-components"
import { rgba } from "polished"

import Logo from "./../Logo/Name"

import { theme } from "./../../constants"

const LoadingComponent = Styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${rgba(theme.colors.blue, 0.9)};
`

export default () => (
  <LoadingComponent>
    <Container textAlign="center">
      <Loader active inverted size="large">
        <Logo style={{ fontSize: "28px" }} inverted />
      </Loader>
    </Container>
  </LoadingComponent>
)
