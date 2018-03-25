import React from "react"
import Styled from "styled-components"

import ContentComponent from "./ContentComponent"

import { theme } from "./../../constants"

const Link = Styled.span`
  color: ${theme.colors.blue};
`

export default ({ location }) => (
  <ContentComponent header="face it, you're lost" subHeader="View Not Found">
    <div>
      <span>Double-check your path: </span>
      <Link>{location.pathname + location.search}</Link>
    </div>
  </ContentComponent>
)
