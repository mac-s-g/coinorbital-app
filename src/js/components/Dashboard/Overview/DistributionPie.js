import React, { Component } from "react"
import Styled from "styled-components"
import { Icon, Statistic, Table } from "semantic-ui-react"

//internal components
import Pie from "./../../Charts/Pie"

//helpers
import round from "./../../../helpers/round"
import { calculateWalletValue } from "./../../../helpers/walletMetrics"

import { theme } from "./../../../constants"

const MIN_PERCENT_ANGLE = 3

//styled components
const WalletsPie = Styled.div`
  display: block;
`

const PieComponent = Styled.div`
  margin: 1.3em 0 1em 0;
`

const ChartLabel = Styled.text`
  font-weight: bold;
  cursor: pointer;
  font-size: 11px;
  fill: ${theme.colors.gray_dark};
  font-weight: ${props => (props.selected ? "700" : "400")};
  text-anchor: middle;
  display: ${props => (props.hidden ? "none" : "block")};
`

//pie chart component for wallets in portfolio
export default class extends Component {
  state = {
    selected: null
  }

  //on pie slice hover
  hoverSelect = name => this.setState({ selected: name })
  //on pie slice click
  walletLink = wallet =>
    this.props.navigateTo(`/dashboard/wallet?name=${encodeURI(wallet)}`)

  //build pie chart data
  buildChart = (wallets, coins) => {
    const { selected } = this.state
    return Object.keys(wallets).map((name, idx) => ({
      name,
      value: round(
        calculateWalletValue(
          wallets[name],
          coins.by_symbol[wallets[name].symbol].price_usd
        ),
        2
      ),
      // pie piece highlighting
      fill: name === selected ? theme.colors.gold : theme.colors.blue,
      fillOpacity: name === selected ? 0.3 : 0.3,
      stroke: name === selected ? theme.colors.gold : theme.colors.blue,
      strokeWidth: 1,
      paddingAngle: 5,
      symbol: wallets[name].symbol,
      style: { cursor: "pointer" },
      onMouseEnter: () => this.hoverSelect(name),
      onMouseLeave: () => this.hoverSelect(null),
      onClick: () => this.walletLink(name)
    }))
  }

  render() {
    const { wallets, coins } = this.props
    const { selected } = this.state
    //pie_data is a list of objects with name and value props
    const pie_data = this.buildChart(wallets, coins)

    return (
      <WalletsPie>
        <PieComponent>
          <Pie
            width={440}
            height={250}
            outerRadius={100}
            innerRadius={60}
            paddingAngle={3}
            data={pie_data}
            animate={false}
            tooltip
            legend={{
              layout: "vertical",
              align: "right",
              width: 160,
              wrapperStyle: {
                fontSize: "1.14285714rem",
                position: "absolute",
                right: "-15px",
                top: "20px",
                cursor: "pointer"
              },
              onMouseEnter: ({ value }) => this.hoverSelect(value),
              onMouseLeave: () => this.hoverSelect(null),
              onClick: ({ value }) => this.walletLink(value)
            }}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
              name
            }) => {
              const RADIAN = Math.PI / 180
              const radius = innerRadius + (outerRadius - innerRadius) * 1.7
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              return (
                <ChartLabel
                  selected={name == selected}
                  x={x}
                  y={y}
                  hidden={percent < MIN_PERCENT_ANGLE / 100}
                  onClick={() => this.walletLink(name)}
                >
                  {`${round(percent * 100, 1)}%`}
                </ChartLabel>
              )
            }}
          />
        </PieComponent>
      </WalletsPie>
    )
  }
}
