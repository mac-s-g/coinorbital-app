import React from "react"
import Styled from "styled-components"
import { Container, Header, Icon, Menu, Segment } from "semantic-ui-react"
import { rgba } from "polished"

import CoinChart from "./CoinChart"
import HeartBeat from "./../../Animations/HeartBeat"
import Login from "./Login"
import Logout from "./Logout"
import Logo from "./../../Logo/"
import LogoName from "./../../Logo/Name"

import { theme, links } from "./../../../constants"

const HEADER_OPACITY = 0.9

const HeaderContainer = Styled.div`
  padding: 1em 0em;
  background-color: ${rgba(theme.colors.blue, HEADER_OPACITY)} !important;
  height: 100vh;
  position: relative;
`
const ChartContainer = Styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  height: calc(100vh - 4em);
`
const HeaderContent = Styled.div`
  padding-top: calc(30vh - 4em);
`
const HeaderLabel = Styled.div`
  font-size: 36px;
  margin-bottom: 0.33em;
`
const MenuContainer = Styled.div`
  border-color: ${rgba(theme.colors.blue, 0)} !important;
`

const BottomBar = Styled.div`
  position: absolute;
  color: black;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 4em;
  background-color: ${theme.colors.well_gray};
`

const LearnMore = Styled.span`
  position: absolute;
  right: 5px;
  font-size: 18px;
  color: ${theme.colors.blue};
  top: 18px;
  cursor: pointer;
  & span {
    margin-right: 6px;
  }
`

const ImgBeat = Styled.a`
  &:hover img {
    animation: ${HeartBeat} 2.4s infinite linear;
  }
`

const IconBeat = Styled.i`
  animation: ${HeartBeat} 2.4s infinite linear;
`

const SignUp = Styled.div`
  margin-top: 1em;
  cursor: pointer;
  padding: 0.3em;
  font-size: 1.1em;
  color: ${theme.colors.white};
  &:hover {
    font-weight: bold;
  }
`

export default ({ navigateTo, clearUserState, auth, ...props }) => (
  <div>
    <ChartContainer>
      <CoinChart {...props} symbol="BTC" />
    </ChartContainer>

    <Segment inverted textAlign="center" vertical as={HeaderContainer}>
      <Container>
        <Menu inverted pointing secondary size="large" as={MenuContainer}>
          <Menu.Item as="a" onClick={e => navigateTo("/dashboard")}>
            {!auth.isAuthenticated() ? "Demo" : null} Dashboard
          </Menu.Item>
          {!auth.isAuthenticated() && <Login login={auth.login} />}
          {auth.isAuthenticated() && (
            <Logout auth={auth} clearUserState={clearUserState} />
          )}
        </Menu>
      </Container>

      <Container text>
        <HeaderContent>
          <HeaderLabel>
            <LogoName inverted />
          </HeaderLabel>
          <ImgBeat>
            <Logo size={100} />
          </ImgBeat>
          {!auth.isAuthenticated() && (
            <SignUp onClick={e => auth.login()}>Sign Up</SignUp>
          )}
        </HeaderContent>
      </Container>

      <BottomBar>
        <LearnMore
          onClick={e => {
            const issueListDOMComponent = document.querySelector(
              ".index-content"
            )
            if (issueListDOMComponent) {
              issueListDOMComponent.scrollIntoView({
                behavior: "smooth",
                block: "start"
              })
            }
          }}
        >
          <span>Learn More</span>
          <Icon as={IconBeat} name="arrow down circle" />
        </LearnMore>
      </BottomBar>
    </Segment>
  </div>
)
