import React, { Component } from "react"
import ContentComponent from "./../ContentComponent"
import WalletPie from "./WalletPie"
import CoinDonut from "./CoinDonut"
import { Loader } from "semantic-ui-react"
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
    const { coins, wallets } = this.props

    return (
      <ContentComponent
        header="Overview"
        subHeader="Manage your assets at a glance"
      >
        {!coins.fetched || !wallets.fetched ? (
          <Loader active />
        ) : (
          <div class="column">
            <div class="ui sixteen column grid">
              <HeaderStatistics wallets={wallets.by_name} coins={coins.by_symbol} />
            </div>
            <div class="ui sixteen column grid">
              <WalletPie {...this.props} />
              <CoinDonut {...this.props} />
            </div>
          </div>
        )}
      </ContentComponent>
    )
  }
}
