import React, { Component } from "react"
import Styled from "styled-components"
import { Statistic, Table } from "semantic-ui-react"
import { rgba } from "polished"

//internal components
import Pie from "./../../Charts/Pie"
import SubHeader from "./../SubHeader"
import CoinLogo from "./../../CoinLogo/"

//helpers
import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import getRotatingThemeColor from "./../../../helpers/getRotatingThemeColor"
import {
  aggregateWalletsValue,
  calculateWalletValue,
  calculateWalletQuantity
} from "./../../../helpers/walletMetrics"

import { theme } from "./../../../constants"

//styled components
const WalletsPie = Styled.div`
  display: inline-block;
`

const PieComponent = Styled.div`
  margin-bottom: 15px;
`

const ChartLabel = Styled.text`
  font-weight: bold;
  cursor: pointer;
  font-size: 11px;
  fill: ${theme.colors.white};
  text-anchor: middle;
  display: ${props => (props.hidden ? "none" : "block")};
`

const StatComponent = Styled.div`
  display: inline-block;
  vertical-align: top;
`

const StatHeader = Styled.div`
  margin: 14px 0;

  & span {
    font-size: 24px;
    vertical-align: middle;
  }

  & img {
    display: inline-block !important;
    margin-right: 6px;
  }
`

const WalletStat = Styled.div`
  margin-bottom: 10px;
`

const WalletsTable = Styled.table`
  &.ui.table tr.active {
    background-color: ${theme.colors.well_gray} !important;
  }
`

const WalletNameLink = Styled.a`
  cursor: pointer;
`

//pie chart component for wallets in portfolio
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: null }
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
      // fill: rgba(getRotatingThemeColor(idx), name === selected ? 1 : 0.75),
      fill: getRotatingThemeColor(idx),
      symbol: wallets[name].symbol,
      style: { cursor: "pointer" },
      onMouseEnter: () => this.hoverSelect(name),
      onClick: () => this.walletLink(name)
    }))
  }

  render() {
    const { wallets, coins, totalValue } = this.props
    const { selected } = this.state
    //pie_data is a list of objects with name and value props
    const pie_data = this.buildChart(wallets, coins)

    return (
      <WalletsPie>
        <PieComponent>
          <SubHeader>Value Distribution</SubHeader>
          <Pie
            width={380}
            height={220}
            outerRadius={100}
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
              onMouseOver: ({ value }) => this.hoverSelect(value),
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
              const radius = innerRadius + (outerRadius - innerRadius) * 0.7
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              return (
                <ChartLabel
                  x={x}
                  y={y}
                  hidden={percent < 0.05}
                  onClick={() => this.walletLink(name)}
                >
                  {`${round(percent * 100, 1)}%`}
                </ChartLabel>
              )
            }}
          />
        </PieComponent>
        <Table collapsing as={WalletsTable}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Coin</Table.HeaderCell>
              <Table.HeaderCell>Total Holding</Table.HeaderCell>
              <Table.HeaderCell>Price (USD)</Table.HeaderCell>
              <Table.HeaderCell>Wallet Value (USD)</Table.HeaderCell>
              <Table.HeaderCell>Portfolio Weight</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(wallets).map(name => (
              <Table.Row
                key={name}
                active={!!selected && selected == name}
                onMouseOver={e => this.setState({ selected: name })}
              >
                <Table.Cell>
                  <WalletNameLink onClick={e => this.walletLink(name)}>
                    {coins.by_symbol[wallets[name].symbol].name}
                  </WalletNameLink>
                </Table.Cell>
                <Table.Cell>
                  {formatNumberForDisplay(
                    calculateWalletQuantity(wallets[name])
                  )}
                </Table.Cell>
                <Table.Cell>
                  ${formatNumberForDisplay(
                    coins.by_symbol[wallets[name].symbol].price_usd
                  )}
                </Table.Cell>
                <Table.Cell>
                  ${formatNumberForDisplay(
                    round(
                      calculateWalletValue(
                        wallets[name],
                        coins.by_symbol[wallets[name].symbol].price_usd
                      ),
                      2
                    )
                  )}
                </Table.Cell>
                <Table.Cell>
                  {formatNumberForDisplay(
                    round(
                      100 *
                        calculateWalletValue(
                          wallets[name],
                          coins.by_symbol[wallets[name].symbol].price_usd
                        ) /
                        totalValue,
                      2
                    )
                  )}%
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </WalletsPie>
    )
  }
}
