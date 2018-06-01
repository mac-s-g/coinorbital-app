import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Divider, Grid } from "semantic-ui-react"
import { rgba } from "polished"

import SidebarItem from "./SidebarItem"

import { theme } from "./../../../constants"

const SidebarContainer = Styled.div`
  background-color: ${theme.colors.well_gray};
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
  background-color: ${theme.colors.well_gray};
  height: 100%;
  width: 100%;
  display: inline-block;
  border-right: 1px solid ${rgba(theme.colors.inverted, 0.2)};

  @media (max-width: 768px) {
    ${({ mobileExpanded }) =>
      mobileExpanded
        ? "display: inline-block; margin-top: -0.33em;"
        : "display: none !important;"}
  }
`
const ContentContainer = Styled.div`
  width: 100%;
  overflow: auto;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${rgba(theme.colors.inverted, 0.2)};
  min-height: calc(
    /* +1 px for border bottom */
    100vh - ${theme.dash_nav_height} - ${theme.dash_footer_height} - 1px
  ) !important;
`

const MenuToggle = Styled.div`
  text-align: right;
  padding: 0.33em 0;
  border-right: 1px solid ${rgba(theme.colors.inverted, 0.2)};
  border-bottom: 1px solid ${rgba(theme.colors.well_gray, 0.2)};

  @media (min-width: 768px) {
    display: none !important;
  }
`

const grid_width = {
  sidebar: {
    largeScreen: 3,
    computer: 4,
    tablet: 5,
    mobile: 16
  },
  content: {
    largeScreen: 13,
    computer: 12,
    tablet: 11,
    mobile: 16
  }
}

export default class extends Component {
  state = { mobile_expanded: false }

  isSelected = (router, path) =>
    router.location &&
    router.location.pathname + router.location.search === path

  render() {
    const {
      router,
      wallets,
      children,
      navigateTo,
      requestCreateWallet,
      requestCreateTransaction
    } = this.props
    const { mobile_expanded } = this.state

    return (
      <SidebarContainer>
        <MenuToggle>
          <Button
            icon="content"
            onClick={e => this.setState({ mobile_expanded: !mobile_expanded })}
          />
        </MenuToggle>
        <Grid as={SidebarGrid}>
          <Grid.Column {...grid_width.sidebar} as={SidebarGridColumn}>
            <Sidebar mobileExpanded={mobile_expanded}>
              <SidebarItem
                selected={this.isSelected(router, "/dashboard")}
                onClick={e => {
                  !this.isSelected(router, "/dashboard")
                    ? navigateTo("/dashboard")
                    : null
                  this.setState({ mobile_expanded: false })
                }}
                label="Overview"
                icon="line chart"
              />
              <SidebarItem
                selected={this.isSelected(router, "/dashboard/watch-list")}
                onClick={e => {
                  !this.isSelected(router, "/dashboard/watch-list")
                    ? navigateTo("/dashboard/watch-list")
                    : null
                  this.setState({ mobile_expanded: false })
                }}
                label="Coin Watch List"
                icon="star"
              />
              <Divider horizontal>Holdings</Divider>
              {Object.keys(wallets.by_name).map(name => (
                <SidebarItem
                  key={name}
                  selected={this.isSelected(
                    router,
                    `/dashboard/investment?name=${encodeURIComponent(name)}`
                  )}
                  onClick={e => {
                    !this.isSelected(
                      router,
                      `/dashboard/investment?name=${encodeURIComponent(name)}`
                    )
                      ? navigateTo(
                          `/dashboard/investment?name=${encodeURIComponent(
                            name
                          )}`
                        )
                      : null
                    this.setState({ mobile_expanded: false })
                  }}
                  label={name}
                  wallet={wallets.by_name[name]}
                  requestCreateTransaction={requestCreateTransaction}
                />
              ))}
              <SidebarItem
                style={{ marginBottom: "0.33em" }}
                onClick={e => {
                  requestCreateWallet()
                  this.setState({ mobile_expanded: false })
                }}
                label="Track an Investment"
                actionItem
                icon="plus circle"
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
