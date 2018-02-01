import React, { Component } from "react"
import PieComponent from "./../../Charts/Pie"
import ChartistLegend from "chartist-plugin-legend"
import round from "./../../../helpers/round"
import {
  aggregateWalletsValue,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

export default class extends Component {
  buildChartData = () => {
    const { coins, wallets } = this.props
    let totalValue = aggregateWalletsValue(wallets.by_name, coins.by_symbol)
    let data = {}
    data.series = Object.keys(wallets.by_name).map(key => ({
      name: wallets.by_name[key].symbol,
      value: round(
        calculateWalletValue(
          wallets.by_name[key],
          coins.by_symbol[wallets.by_name[key].symbol].price_usd
        ),
        2
      )
    }))

    let options = {
      stretch: true,
      width: "400px",
      height: "400px",
      plugins: [ChartistLegend()]
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

    return (
      <PieComponent
        data={data}
        options={options}
        responsiveOptions={responsiveOptions}
      />
    )
  }

  render() {
    return (
      <div>{this.buildChartData()}</div>
    )
  }
}
