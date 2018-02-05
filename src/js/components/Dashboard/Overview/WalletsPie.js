import React, { Component } from "react"
import Styled from "styled-components"
import { Statistic } from "semantic-ui-react"
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
`

const StatHeader = Styled.div`
  margin: 10px 0;

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

//pie chart component for wallets in portfolio
export default class extends Component {
  state = { selected: null }

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
      fill: rgba(getRotatingThemeColor(idx), name === selected ? 0.7 : 1),
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
              position: "absolute",
              right: "-15px",
              top: "20px",
              color: theme.colors.gray_dark,
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
        {!!selected ? (
          <StatComponent>
            <StatHeader>
              <CoinLogo symbol={wallets[selected].symbol} />
              <span>{selected}</span>
            </StatHeader>
            <WalletStat>
              <Statistic horizontal size="small">
                <Statistic.Value>
                  ${formatNumberForDisplay(
                    round(
                      calculateWalletValue(
                        wallets[selected],
                        coins.by_symbol[wallets[selected].symbol].price_usd
                      ),
                      2
                    )
                  )}
                </Statistic.Value>
                <Statistic.Label>Value USD</Statistic.Label>
              </Statistic>
            </WalletStat>
            <WalletStat>
              <Statistic horizontal size="mini">
                <Statistic.Value>
                  {formatNumberForDisplay(
                    round(
                      100 *
                        calculateWalletValue(
                          wallets[selected],
                          coins.by_symbol[wallets[selected].symbol].price_usd
                        ) /
                        totalValue,
                      2
                    )
                  )}%
                </Statistic.Value>
                <Statistic.Label>Total Portfolio</Statistic.Label>
              </Statistic>
            </WalletStat>
            <WalletStat>
              <Statistic horizontal size="mini">
                <Statistic.Value>
                  {formatNumberForDisplay(
                    round(calculateWalletQuantity(wallets[selected]), 2)
                  )}
                </Statistic.Value>
                <Statistic.Label>
                  Total {wallets[selected].symbol}
                </Statistic.Label>
              </Statistic>
            </WalletStat>
          </StatComponent>
        ) : null}
      </WalletsPie>
    )
  }
}
