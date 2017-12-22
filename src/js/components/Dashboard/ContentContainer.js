import React from "react"
import Styled from "styled-components"
import { Header } from "semantic-ui-react"

import { theme } from "./../../constants"

const MainContainer = Styled.div`
  background-color: ${theme.colors.dash_content};
  width: 100%;
  padding: 3em 2em;
`
const PageContent = Styled.div`
  padding: 1em 0em;
`

export default ({ header, subHeader, children }) => (
  <MainContainer>
    {header ? (
      <Header
        as="h1"
        content={header}
        subheader={subHeader ? subHeader : null}
      />
    ) : null}
    <PageContent>{children}</PageContent>
  </MainContainer>
)
