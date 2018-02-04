import React, { Component } from "react"
import ContentComponent from "./../ContentComponent"
import WalletPie from "./WalletPie"
import { Loader } from "semantic-ui-react"
import HeaderStatistics from "./HeaderStatistics"
import { calculateWalletQuantity } from "./../../../helpers/walletMetrics"

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

  render() {
    const { coins, wallets } = this.props
    const nonZeroWallets = this.nonZeroWallets(wallets.by_name)
    return (
      <ContentComponent
        header="Overview"
        subHeader="Manage your assets at a glance"
      >
        {!coins.fetched || !wallets.fetched ? (
          <Loader active />
        ) : (
          <div>
            <HeaderStatistics
              wallets={wallets.by_name}
              coins={coins.by_symbol}
            />
            {Object.keys(nonZeroWallets).length > 1 ? (
              <WalletPie wallets={nonZeroWallets} coins={coins} />
            ) : null}
          </div>
        )}
      </ContentComponent>
    )
  }
}
