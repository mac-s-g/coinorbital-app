import React, { Component } from "react"
import DonutComponent from "./../../Charts/Donut"
import ChartistLegend from "chartist-plugin-legend"
import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import {
  aggregateWalletsValue,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

export default class extends Component {
  buildChartData = () => {
    const { coins, wallets } = this.props
    let totalValue = aggregateWalletsValue(wallets.by_name, coins.by_symbol)
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

      let options = {
        width: "300px",
        height: "300px",
        total: totalValue,
        donut: true,
        donutWidth: 10,
        donutSolid: true,
        plugins: [ChartistLegend()]
      }

      options.labelInterpolationFnc = val => {
        return (
          "$" +
          formatNumberForDisplay(round(value), 2) +
          " / $" +
          formatNumberForDisplay(round(totalValue), 2)
        )
      }

      return (
        <DonutComponent
          key={key}
          data={data}
          options={options}
          value={value}
          totalValue={totalValue}
        />
      )
    })
  }

  render() {
    return this.buildChartData()
  }
}
