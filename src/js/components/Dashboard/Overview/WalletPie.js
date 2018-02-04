import React, { Component } from "react"
import PieComponent from "./../../Charts/Pie"
import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
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
      name: name,
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
      showLegend: true,
      labelInterpolationFnc: function(value) {
        let percentage = value / totalValue * 100 + "%"
        let label =
          parseInt(percentage) > 3
            ? "$" + formatNumberForDisplay(value)
            : null
        return label
      }
    }

    let responsiveOptions = []

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
