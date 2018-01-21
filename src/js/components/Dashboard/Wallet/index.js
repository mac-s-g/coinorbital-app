import React, { Component } from "react"
import { Loader } from "semantic-ui-react"

import ContentComponent from "./../ContentComponent"

import parseSearchQuery from "./../../../helpers/parseSearchQuery"

export default class extends Component {
  componentWillMount() {
    const { fetchWallets, fetchCoins, coins } = this.props
    fetchWallets()
    if (!coins.fetching_coins && !coins.list.length) {
      fetchCoins()
    }
  }

  walletName = () => parseSearchQuery(this.props.location.search).name

  render() {
    const { coins, wallets } = this.props
    const wallet = wallets.by_name[this.walletName()]
    const coin = wallet ? coins.by_symbol[wallet.symbol] : null
    return coins.list.length ? (
      <ContentComponent
        header={wallet.name}
        subHeader={`Your ${coin.name} Wallet`}
      >
        <pre>{JSON.stringify(wallets, null, 2)}</pre>
      </ContentComponent>
    ) : (
      <Loader active />
    )
  }
}
