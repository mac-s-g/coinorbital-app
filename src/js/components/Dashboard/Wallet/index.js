import React, { Component } from "react"
import { Loader, Statistic } from "semantic-ui-react"

import NotFound from "./NotFound"
import ContentComponent from "./../ContentComponent"

import round from "./../../../helpers/round"
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

    if (!coins.fetched || !wallets.fetched) {
      return <Loader active />
    } else if (!wallet) {
      return <NotFound walletName={this.walletName()} />
    } else {
      return (
        <ContentComponent
          header={wallet.name}
          subHeader={`Your ${coin.name} Wallet`}
        >
          <Statistic.Group>
            <Statistic>
              <Statistic.Value>{wallet.balance}</Statistic.Value>
              <Statistic.Label>Total {wallet.symbol}</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                ${round(
                  wallet.balance * coins.by_symbol[wallet.symbol].price_usd,
                  2
                )}
              </Statistic.Value>
              <Statistic.Label>Value USD</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <pre>{JSON.stringify(wallets, null, 2)}</pre>
        </ContentComponent>
      )
    }
  }
}
