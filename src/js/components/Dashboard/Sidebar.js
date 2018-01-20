import React from "react"
import Styled from "styled-components"
import { Divider, Grid, Icon } from "semantic-ui-react"
import { rgba } from "polished"

import { theme } from "./../../constants"

const SidebarContainer = Styled.div`
  background-color: ${theme.colors.dash_sidebar};
`
const SidebarGrid = Styled.div`
  margin: 0 !important;
  height: 100%;
  overflow: hidden;
`
const SidebarGridColumn = Styled.div`
  padding: 0 !important;
`
const Sidebar = Styled.div`
  background-color: ${theme.colors.dash_sidebar};
  width: 100%;
  display: inline-block;
`
const ContentContainer = Styled.div`
  width: 100%;
  overflow: auto;
  background-color: ${theme.colors.dash_content};
  min-height: calc(100vh - ${theme.dash_nav_height}) !important;
`

const SidebarButton = Styled.div`
  position: relative;
  padding: 0.67em 2em;
  cursor: pointer;
  transition: all 0s ease;
  font-weight: 600;
  color: #444;
  border-radius: 0 3px 3px 0;
  font-size: 16px;

  &:first-child {
    margin: 0.33em 0 0 0;
  }

  &:hover {
    background-color: ${rgba(theme.colors.inverted, 0.5)};
    color: white;

    & i.icon {
      opacity: 1 !important;
    }
  }
`

const SidebarCaret = Styled.i`
  position: absolute;
  left: 10px;
  width: 0 !important;
  opacity: ${({ selected }) => (selected ? 1 : 0)} !important;
  color: ${theme.colors.inverted};
`

const grid_width = {
  sidebar: {
    largeScreen: 3,
    computer: 5,
    tablet: 6,
    mobile: 16
  },
  content: {
    largeScreen: 13,
    computer: 11,
    tablet: 10,
    mobile: 16
  }
}

const selected = (router, path) =>
  router.location && router.location.pathname === path

export default ({ router, children, navigateTo, requestNewTransaction }) => (
  <SidebarContainer>
    <Grid as={SidebarGrid}>
      <Grid.Column {...grid_width.sidebar} as={SidebarGridColumn}>
        <Sidebar>
          <SidebarItem
            selected={selected(router, "/dashboard")}
            onClick={e =>
              !selected(router, "/dashboard") ? navigateTo("/dashboard") : null}
            label="Overview"
          />
          <SidebarItem
            selected={selected(router, "/dashboard/watch-list")}
            onClick={e =>
              !selected(router, "/dashboard/watch-list")
                ? navigateTo("/dashboard/watch-list")
                : null}
            label="Coin Watch List"
          />
          <SidebarItem
            onClick={requestNewTransaction}
            label="Record a Transaction"
          />
        </Sidebar>
        <Divider horizontal>My Wallets</Divider>
      </Grid.Column>
      <Grid.Column {...grid_width.content} as={SidebarGridColumn}>
        <ContentContainer>{children}</ContentContainer>
      </Grid.Column>
    </Grid>
  </SidebarContainer>
)

const SidebarItem = props => (
  <SidebarButton {...props}>
    <Icon as={SidebarCaret} selected={props.selected} name="angle right" />
    {props.label}
  </SidebarButton>
)
