import React, { Component } from "react"
import DonutComponent from "./../../Charts/Donut"
import round from "./../../../helpers/round"
import {
  aggregateWalletsValue,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

export default class extends Component {
  buildSeriesData = () => {
    const { coins, wallets } = this.props
    let totalValue = 6969

    return Object.keys(wallets.by_name).map(key => {
      let wallet = wallets.by_name[key]
      let value = calculateWalletValue(
        wallet,
        coins.by_symbol[wallet.symbol].price_usd
      )
      let difference = totalValue - value
      let data = {
        series: [round(value, 2), round(difference, 2)],
        labels: [coins.by_symbol[wallet.symbol].name]
      }
      return (
        <DonutComponent
          key={key}
          data={data}
          value={value}
          totalValue={totalValue}
        />
      )
    })
  }

  render() {
    const { coins, wallets } = this.props
    // let totalValue = aggregateWalletsValue(wallets, coins)
    let totalValue = 6969
    return (
      <div>{this.buildSeriesData()}</div>
    )
  }
}
