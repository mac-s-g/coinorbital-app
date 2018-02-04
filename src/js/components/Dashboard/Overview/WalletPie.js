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
    let totalValue = aggregateWalletsValue(wallets, coins.by_symbol)
    let data = {}
    data.series = Object.keys(wallets).map(name => ({
      name: wallets[name].symbol,
      value: round(
        calculateWalletValue(
          wallets[name],
          coins.by_symbol[wallets[name].symbol].price_usd
        ),
        2
      )
    }))

    let options = {
      stretch: true,
      width: "340px",
      height: "340px",
      showLegend: true
    }

    let responsiveOptions = [
      [
        "screen and (min-width: 600px)",
        {
          labelInterpolationFnc(value, index) {
            let percentage = value / totalValue * 100 + "%"
            let label = parseInt(percentage) > 3 ? "$" + value : null
            return label
          }
        }
      ]
    ]
    return { data, options, responsiveOptions }
  }

  render() {
    let chartData = this.buildChartData()
    return (
      <PieComponent
        data={chartData.data}
        options={chartData.options}
        responsiveOptions={chartData.responsiveOptions}
      />
    )
  }
}
