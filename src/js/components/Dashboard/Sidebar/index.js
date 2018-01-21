import React, { Component } from "react"
import Styled from "styled-components"
import { Divider, Grid } from "semantic-ui-react"

import SidebarItem from "./SidebarItem"

import { theme } from "./../../../constants"

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

export default class extends Component {
  componentWillMount() {
    this.props.fetchWallets()
  }

  isSelected = (router, path) =>
    router.location &&
    router.location.pathname + router.location.search === path

  render() {
    const {
      router,
      wallets,
      children,
      navigateTo,
      requestCreateWallet
    } = this.props

    return (
      <SidebarContainer>
        <Grid as={SidebarGrid}>
          <Grid.Column {...grid_width.sidebar} as={SidebarGridColumn}>
            <Sidebar>
              <SidebarItem
                selected={this.isSelected(router, "/dashboard")}
                onClick={e =>
                  !this.isSelected(router, "/dashboard")
                    ? navigateTo("/dashboard")
                    : null}
                label="Overview"
              />
              <SidebarItem
                selected={this.isSelected(router, "/dashboard/watch-list")}
                onClick={e =>
                  !this.isSelected(router, "/dashboard/watch-list")
                    ? navigateTo("/dashboard/watch-list")
                    : null}
                label="Coin Watch List"
              />
              <Divider horizontal>My Wallets</Divider>
              {Object.keys(wallets.by_name).map(name => (
                <SidebarItem
                  key={name}
                  selected={this.isSelected(
                    router,
                    `/dashboard/wallet?name=${encodeURIComponent(name)}`
                  )}
                  onClick={e =>
                    !this.isSelected(
                      router,
                      `/dashboard/wallet?name=${encodeURIComponent(name)}`
                    )
                      ? navigateTo(
                          `/dashboard/wallet?name=${encodeURIComponent(name)}`
                        )
                      : null}
                  label={name}
                />
              ))}
              <SidebarItem
                onClick={requestCreateWallet}
                label="Create a Wallet"
                actionItem
              />
            </Sidebar>
          </Grid.Column>
          <Grid.Column {...grid_width.content} as={SidebarGridColumn}>
            <ContentContainer>{children}</ContentContainer>
          </Grid.Column>
        </Grid>
      </SidebarContainer>
    )
  }
}
