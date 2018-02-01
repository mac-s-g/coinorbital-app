import React, { Component } from "react"
import PieComponent from "./../../Charts/Pie"
import round from "./../../../helpers/round"
import {
  aggregateWalletsValue,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

export default class extends Component {
  buildChartData = () => {
    const { coins, wallets } = this.props

    let seriesData = Object.keys(wallets.by_name).map(key => ({
      name: wallets.by_name[key].symbol,
      value: round(
        calculateWalletValue(
          wallets.by_name[key],
          coins.by_symbol[wallets.by_name[key].symbol].price_usd
        ),
        2
      )
    }))

    return {
      series: seriesData
    }
  }

  render() {
    const { coins, wallets } = this.props
    // let totalValue = aggregateWalletsValue(wallets, coins)
    let totalValue = 6969
    return (
      <PieComponent data={this.buildChartData()} totalValue={totalValue} />
    )
  }
}
