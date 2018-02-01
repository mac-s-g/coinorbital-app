import React, { Component } from "react"
import ChartistGraph from "react-chartist"
import ChartistLegend from "chartist-plugin-legend"
import Styled from "styled-components"

import round from "./../../../helpers/round"
import { theme } from "./../../../constants"

import {
  calculateWalletQuantity,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

const PieComponent = Styled.div`
  & .ct-chart-pie {
    margin-top: 30px;
  }
  & .ct-series-a .ct-slice-pie {
    fill: ${props => props.themeColors.blue};
  }
  & .ct-series-b .ct-slice-pie {
    fill: ${props => props.themeColors.red};
  }
  & .ct-series-c .ct-slice-pie {
    fill: ${props => props.themeColors.green};
  }
  & .ct-series-d .ct-slice-pie {
    fill: ${props => props.themeColors.gold};
  }
  & .ct-label {
    fill: #fff;
    color: #fff;
    font-size: 1.15rem;
  }
  & .ct-chart {
    position: relative;
  }
  & .ct-legend {
    padding: 0;
  }
  & .ct-legend li {
    color: rgba(0, 0, 0, 0.6);
    position: relative;
    padding-left: 16px;
    margin-bottom: 3px;
    margin-right: 18px;
    list-style: none;
    display: block;
    float: left;
    cursor: pointer;
  }
  & .ct-legend li:hover {
    color: rgba(0, 0, 0, 0.85);
  }
  & .ct-legend li.inactive {
    opacity: .6;
  }
  & .ct-legend li:before {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 4px;
    left: 0;
    content: '';
    border: 3px solid transparent;
    border-radius: 2px;
  }
  & .ct-legend li:before {
    background: #333;
  }
  & .ct-legend .ct-series-0:before {
    background: ${props => props.themeColors.blue};
  }
  & .ct-legend .ct-series-1:before {
    background: ${props => props.themeColors.red};
  }
  & .ct-legend .ct-series-2:before {
    background: ${props => props.themeColors.green};
  }
  & .ct-legend .ct-series-3:before {
    background: ${props => props.themeColors.gold};
  }
`

export default class extends Component {
  getTotalValue = () => {
    const { coins, wallets } = this.props
    let totalValue = Object.keys(wallets.by_name)
      .map(key => {
        return calculateWalletValue(
          wallets.by_name[key],
          coins.by_symbol[wallets.by_name[key].symbol].price_usd
        )
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue)

    return round(totalValue, 2)
  }

  buildChart = () => {
    const { coins, wallets } = this.props
    const totalValue = this.getTotalValue()
    let pieChartOptions = {
      stretch: true,
      width: "400px",
      height: "400px",
      plugins: [ChartistLegend()]
    }

    let pieChartSeries = Object.keys(wallets.by_name).map(key => ({
      name: wallets.by_name[key].symbol,
      value: round(
        calculateWalletValue(
          wallets.by_name[key],
          coins.by_symbol[wallets.by_name[key].symbol].price_usd
        ),
        2
      )
    }))

    let pieChartData = {
      series: pieChartSeries
    }

    let pieChartResponsiveOptions = [
      [
        "screen and (min-width: 600px)",
        {
          labelInterpolationFnc(value, index) {
            ////////// fix soon
            return "$" + value
            let percentage = value / totalValue * 100 + "%"
            let label = parseInt(percentage) > 3 ? "$" + value : null
            return label
          }
        }
      ]
    ]

    return (
      <ChartistGraph
        data={pieChartData}
        type={"Pie"}
        options={pieChartOptions}
        responsiveOptions={pieChartResponsiveOptions}
      />
    )
  }

  render() {
    return (
      <PieComponent themeColors={theme.colors}>
        {this.buildChart()}
      </PieComponent>
    )
  }
}
