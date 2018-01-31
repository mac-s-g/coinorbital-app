import React, { Component } from "react"
import ChartistGraph from "react-chartist"
import ChartistLegend from "chartist-plugin-legend"
import Styled from "styled-components"

import ContentComponent from "./../ContentComponent"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import {
  calculateWalletQuantity,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

import { theme } from "./../../../constants"

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

const DonutPieComponent = Styled.div`
  & .ct-chart {
    position: relative;
    margin-bottom: 15px;
  }
  & .ct-chart-donut .ct-series-a .ct-slice-donut-solid {
    fill: ${props => props.themeColors.blue};
  }
  .ct-chart-donut .ct-series-b .ct-slice-donut-solid {
    fill: #E1E9EB;
  }
  & .ct-chart-donut .ct-label {
    fill: #333;
    color: #333;
    font-size: 1.4rem;
    dominant-baseline: central;
    text-anchor: middle;
  }
  & .ct-legend {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
  }
  & .ct-legend li {
    color: rgba(0, 0, 0, 0.5);
    display: inline-block;
    font-size: 1.2rem;
    list-style: none;
    margin: 0;
    margin-bottom: 20px;
  }
  & .ct-legend li:hover {
    color: rgba(0, 0, 0, 0.85);
  }
  & .ct-legend li.inactive {
    opacity: .6;
  }
`

const centerChartLabel = {
  draw(context) {
    if (context.type === "label") {
      context.element.attr({
        dx: context.element.root().width() / 2,
        dy: context.element.root().height() / 2
      })
    }
  }
}

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

  buildPieChart = totalValue => {
    const { coins, wallets } = this.props

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

    console.log(pieChartSeries)

    let pieChartData = {
      series: pieChartSeries
    }

    let pieChartResponsiveOptions = [
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
      <PieComponent themeColors={theme.colors}>
        <ChartistGraph
          data={pieChartData}
          type={"Pie"}
          options={pieChartOptions}
          responsiveOptions={pieChartResponsiveOptions}
        />
      </PieComponent>
    )
  }

  buildDonutPieChart = totalValue => {
    const { coins, wallets } = this.props

    return Object.keys(wallets.by_name).map(key => {
      let wallet = wallets.by_name[key]
      let price_usd = coins.by_symbol[wallet.symbol].price_usd
      let value = wallet.balance * price_usd
      let difference = totalValue - value

      let data = {
        series: [value, difference],
        labels: [coins.by_symbol[wallet.symbol].name]
      }
      let options = {
        width: "300px",
        height: "300px",
        total: 100,
        donut: true,
        donutWidth: 10,
        donutSolid: true,
        plugins: [ChartistLegend()]
      }
      options.total = totalValue
      options.labelInterpolationFnc = val => {
        return (
          "$" +
          formatNumberForDisplay(round(value), 2) +
          " / $" +
          formatNumberForDisplay(round(totalValue), 2)
        )
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
        <DonutPieComponent key={key} themeColors={theme.colors}>
          <ChartistGraph
            data={data}
            type={"Pie"}
            options={options}
            listener={centerChartLabel}
          />
        </DonutPieComponent>
      )
    })
  }

  getTotalValue = () => {
    const { coins, wallets } = this.props
    return Object.keys(wallets.by_name)
      .map(key => {
        let wallet = wallets.by_name[key]
        let price_usd = coins.by_symbol[wallet.symbol].price_usd
        return wallet.balance * price_usd
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue)
  }

  render() {
    const { coins, wallets } = this.props
    let totalValue = 0

    if (coins.fetched && wallets.fetched) {
      totalValue = this.getTotalValue()
    }

    return coins.fetched && wallets.fetched ? ( // make sure app state contains what i need
      <ContentComponent
        header="Overview"
        subHeader="Manage your assets at a glance."
      >
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
        />

        <div class="column" style={{ marginTop: "20px" }}>
          <div class="ui three column grid">
            <div
              class="column"
              style={{ textAlign: "center", borderRight: "1px solid #ddd" }}
            >
              <div
                style={{
                  color: "rgb(128, 128, 129)",
                  fontSize: "22px",
                  marginTop: "20px"
                }}
              >
                Total Value
              </div>
              <div
                style={{
                  color: "#525254",
                  fontSize: "36px",
                  marginTop: "22px"
                }}
              >
                ${formatNumberForDisplay(round(totalValue))}
              </div>
            </div>
            <div
              class="column"
              style={{ textAlign: "center", borderRight: "1px solid #ddd" }}
            >
              <div
                style={{
                  color: "rgb(128, 128, 129)",
                  fontSize: "22px",
                  marginTop: "20px"
                }}
              >
                Total Value
              </div>
              <div
                style={{
                  color: "#525254",
                  fontSize: "36px",
                  marginTop: "22px"
                }}
              >
                $3991
              </div>
            </div>
            <div class="column" style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "rgb(128, 128, 129)",
                  fontSize: "22px",
                  marginTop: "20px"
                }}
              >
                Total Profit
              </div>
              <div
                style={{
                  color: "#525254",
                  fontSize: "36px",
                  marginTop: "22px"
                }}
              >
                $2210
              </div>
            </div>
          </div>
        </div>

        <div class="column" style={{ marginTop: "60px" }}>
          <div class="ui sixteen column grid">
            {this.buildPieChart(totalValue)}
          </div>
        </div>

        <div class="column" style={{ marginTop: "50px" }}>
          <div class="ui sixteen column grid">
            {// these charts will be used on the individual wallet page
            this.buildDonutPieChart(totalValue)}
          </div>
        </div>
      </ContentComponent>
    ) : (
      <div />
    )
  }
}
