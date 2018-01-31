import React, { Component } from "react"
import Styled from "styled-components"
import { Loader } from "semantic-ui-react"

import ContentComponent from "./../ContentComponent"
import HeaderStatistics from "./HeaderStatistics"

export default class extends Component {
  componentWillMount() {
    const { fetchWallets, fetchCoins, wallets, coins } = this.props
    if (!wallets.fetched) {
      fetchWallets()
    }
    if (!coins.fetching_coins && !coins.fetched) {
      fetchCoins()
    }
  }

  render() {
    const { wallets, coins } = this.props
    return (
      <ContentComponent
        header="Overview"
        subHeader="Manage your assets at a glance"
      >
        {!coins.fetched || !wallets.fetched ? (
          <Loader active />
        ) : (
          <HeaderStatistics wallets={wallets.by_name} coins={coins.by_symbol} />
        )}
      </ContentComponent>
    )
  }
}
