import React from "react"
import Styled from "styled-components"
import { Header } from "semantic-ui-react"

import CoinLogo from "./../CoinLogo/"
import Logo from "./../Logo/Alternate"

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

const LogoComponent = Styled.div`
  margin: 6px 10px 0 0;
  display: inline-block;
`

export default ({ header, subHeader, children, coinSymbol, logo }) => (
  <MainComponent>
    {header ? (
      <Header as="h1">
        {logo ? (
          <LogoComponent>
            <Logo size="45px" />
          </LogoComponent>
        ) : null}
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
