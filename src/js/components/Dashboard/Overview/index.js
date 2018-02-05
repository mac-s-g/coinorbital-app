import React, { Component } from "react"
import Styled from "styled-components"
import { Loader } from "semantic-ui-react"

import ContentComponent from "./../ContentComponent"
import HeaderStatistics from "./HeaderStatistics"
import WalletsPie from "./WalletsPie"

import {
  calculateWalletQuantity,
  aggregateWalletsValue
} from "./../../../helpers/walletMetrics"

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

  nonZeroWallets = wallets =>
    Object.keys(wallets).reduce((acc, name) => {
      if (calculateWalletQuantity(wallets[name])) {
        acc[name] = wallets[name]
      }
      return acc
    }, {})

  totalValue = (wallets, coins) =>
    aggregateWalletsValue(wallets.by_name, coins.by_symbol)

  render() {
    const { wallets, coins, navigateTo } = this.props
    const non_zero_wallets = this.nonZeroWallets(wallets.by_name)
    return (
      <ContentComponent
        header="Overview"
        subHeader="Manage your assets at a glance"
      >
        {!coins.fetched || !wallets.fetched ? (
          <Loader active />
        ) : (
          <div>
            <HeaderStatistics totalValue={this.totalValue(wallets, coins)} />
            {Object.keys(non_zero_wallets).length > 1 ? (
              <WalletsPie
                wallets={non_zero_wallets}
                coins={coins}
                totalValue={this.totalValue(wallets, coins)}
                navigateTo={navigateTo}
              />
            ) : null}
          </div>
        )}
      </ContentComponent>
    )
  }
}
