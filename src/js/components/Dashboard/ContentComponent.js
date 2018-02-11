import React from "react"
import Styled from "styled-components"
import { Header } from "semantic-ui-react"

import CoinLogo from "./../CoinLogo/"

import { theme } from "./../../constants"

const MainComponent = Styled.div`
  background-color: ${theme.colors.white};
  width: 100%;
  padding: 3em 2em;
`
const PageContent = Styled.div`
  padding: 1em 0em;
  font-size: 1.14285714rem;
`

export default ({ header, subHeader, children, coinSymbol }) => (
  <MainComponent>
    {header ? (
      <Header as="h1">
        {coinSymbol ? <CoinLogo symbol={coinSymbol} size="big" /> : null}
        <Header.Content>
          {header}
          <Header.Subheader>{subHeader ? subHeader : null}</Header.Subheader>
        </Header.Content>
      </Header>
    ) : null}
    <PageContent>{children}</PageContent>
  </MainComponent>
)
