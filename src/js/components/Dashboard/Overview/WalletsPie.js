import React, { Component } from "react"
import Styled from "styled-components"
import { Icon, Statistic, Table } from "semantic-ui-react"

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
  calculateWalletQuantity,
  calculateWalletTotalTx
} from "./../../../helpers/walletMetrics"

import { theme } from "./../../../constants"

const MIN_PERCENT_ANGLE = 3

//styled components
const WalletsPie = Styled.div`
  display: block;
`

const PieComponent = Styled.div`
  margin-bottom: 15px;
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
    background-color: ${theme.colors.gray_table} !important;
  }
`

const WalletNameLink = Styled.a`
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
`

const WalletSymbolLabel = Styled.span`
  color: ${theme.colors.gray};
  font-weight: bold;
  font-size: 10px;
  display: inline-block;
`

//pie chart component for wallets in portfolio
export default class extends Component {
  state = {
    selected: null,
    sort: {
      column: "portfolio_weight",
      direction: "descending"
    }
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
      onClick: () => this.walletLink(name)
    }))
  }

  handleSort = column => {
    const { sort } = this.state
    const direction =
      column == sort.column && "descending" == sort.direction
        ? "ascending"
        : "descending"
    this.setState({
      sort: {
        column: column,
        direction: direction
      }
    })
  }

  prepareTableData = (wallets, coins, totalValue) =>
    Object.keys(wallets).map(name => {
      const cost_basis = calculateWalletTotalTx(wallets[name])
      const wallet_value = calculateWalletValue(
        wallets[name],
        coins.by_symbol[wallets[name].symbol].price_usd
      )
      return {
        ...wallets[name],
        name: name,
        market_price: `$${formatNumberForDisplay(
          round(coins.by_symbol[wallets[name].symbol].price_usd, 2)
        )}`,
        quantity: formatNumberForDisplay(
          calculateWalletQuantity(wallets[name])
        ),
        cost_basis_raw: cost_basis,
        cost_basis: !!cost_basis ? (
          `$${formatNumberForDisplay(round(cost_basis, 2))}`
        ) : (
          <Icon name="question circle outline" />
        ),
        value_raw: wallet_value,
        value: `$${formatNumberForDisplay(round(wallet_value, 2))}`,
        capital_gain: !!cost_basis ? (
          `$${formatNumberForDisplay(round(wallet_value - cost_basis, 2))}`
        ) : (
          <Icon name="question circle outline" />
        ),
        percent_gain: !!cost_basis ? (
          `${formatNumberForDisplay(
            round(100 * (wallet_value - cost_basis) / cost_basis, 2)
          )}%`
        ) : (
          <Icon name="question circle outline" />
        ),
        portfolio_weight: `${formatNumberForDisplay(
          round(
            100 *
              calculateWalletValue(
                wallets[name],
                coins.by_symbol[wallets[name].symbol].price_usd
              ) /
              totalValue,
            2
          )
        )}%`
      }
    })

  sortTable = (data, column, direction) => {
    switch (column) {
      case "name":
        //string compare
        return data.sort(function(a, b) {
          return direction == "ascending"
            ? a[column].localeCompare(b[column])
            : b[column].localeCompare(a[column])
        })
      default:
        return data.sort(function(a, b) {
          return direction == "ascending"
            ? parseFloat(a[column].toString().replace(/[^0-9\.\-]/g, "")) -
                parseFloat(b[column].toString().replace(/[^0-9\.\-]/g, ""))
            : parseFloat(b[column].toString().replace(/[^0-9\.\-]/g, "")) -
                parseFloat(a[column].toString().replace(/[^0-9\.\-]/g, ""))
        })
    }
    return data
  }

  render() {
    const { wallets, coins, totalValue } = this.props
    const { selected, sort } = this.state
    const { column, direction } = sort
    //pie_data is a list of objects with name and value props
    const pie_data = this.buildChart(wallets, coins)

    let table_data = this.prepareTableData(wallets, coins, totalValue)
    table_data = this.sortTable(table_data, column, direction)

    let aggr_cost_basis = 0,
      aggr_wallet_value = 0

    return (
      <WalletsPie>
        <PieComponent>
          <SubHeader>Portfolio Distribution</SubHeader>
          <Pie
            width={380}
            height={220}
            outerRadius={80}
            innerRadius={50}
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
        <Table as={WalletsTable} unstackable sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={() => this.handleSort("name")}
              >
                Wallet
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "market_price" ? direction : null}
                onClick={() => this.handleSort("market_price")}
              >
                Coin Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "quantity" ? direction : null}
                onClick={() => this.handleSort("quantity")}
              >
                Total Holding
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "cost_basis" ? direction : null}
                onClick={() => this.handleSort("cost_basis")}
              >
                Cost Basis
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "value" ? direction : null}
                onClick={() => this.handleSort("value")}
              >
                Wallet Value
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "capital_gain" ? direction : null}
                onClick={() => this.handleSort("capital_gain")}
              >
                Capital Gain
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "percent_gain" ? direction : null}
                onClick={() => this.handleSort("percent_gain")}
              >
                % Gain
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "portfolio_weight" ? direction : null}
                onClick={() => this.handleSort("portfolio_weight")}
              >
                Portfolio Weight
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {table_data.map(wallet => {
              aggr_cost_basis += wallet.cost_basis_raw
              aggr_wallet_value += wallet.value_raw
              return (
                <Table.Row
                  key={wallet.name}
                  active={!!selected && selected == wallet.name}
                  onMouseOver={e => this.setState({ selected: wallet.name })}
                >
                  <Table.Cell>
                    <WalletNameLink onClick={e => this.walletLink(wallet.name)}>
                      {wallet.name}
                    </WalletNameLink>
                    <WalletSymbolLabel>{wallet.symbol}</WalletSymbolLabel>
                  </Table.Cell>
                  {/*current price*/}
                  <Table.Cell>{wallet.market_price}</Table.Cell>
                  {/*total holding*/}
                  <Table.Cell>{wallet.quantity}</Table.Cell>
                  {/*wallet cost basis*/}
                  <Table.Cell>{wallet.cost_basis}</Table.Cell>
                  {/*wallet value*/}
                  <Table.Cell>{wallet.value}</Table.Cell>
                  {/*capital gain*/}
                  <Table.Cell
                    positive={
                      !!wallet.cost_basis_raw &&
                      round(wallet.value_raw, 2) >
                        round(wallet.cost_basis_raw, 2)
                    }
                    negative={
                      !!wallet.cost_basis_raw &&
                      round(wallet.value_raw, 2) <
                        round(wallet.cost_basis_raw, 2)
                    }
                  >
                    {wallet.capital_gain}
                  </Table.Cell>
                  {/*percent gain*/}
                  <Table.Cell
                    positive={
                      !!wallet.cost_basis_raw &&
                      round(wallet.value_raw, 2) >
                        round(wallet.cost_basis_raw, 2)
                    }
                    negative={
                      !!wallet.cost_basis_raw &&
                      round(wallet.value_raw, 2) <
                        round(wallet.cost_basis_raw, 2)
                    }
                  >
                    {wallet.percent_gain}
                  </Table.Cell>
                  {/*portfolio weight*/}
                  <Table.Cell>{wallet.portfolio_weight}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Total</Table.HeaderCell>
              {/*coin price*/}
              <Table.HeaderCell />
              {/*total holding*/}
              <Table.HeaderCell />
              {/*cost basis*/}
              <Table.HeaderCell>
                {!!aggr_cost_basis
                  ? `$${formatNumberForDisplay(round(aggr_cost_basis, 2))}`
                  : "-"}
              </Table.HeaderCell>
              {/*wallet value*/}
              <Table.HeaderCell>
                ${formatNumberForDisplay(round(aggr_wallet_value, 2))}
              </Table.HeaderCell>
              {/*capital gain*/}
              <Table.HeaderCell>
                {!!aggr_cost_basis
                  ? `$${formatNumberForDisplay(
                      round(aggr_wallet_value - aggr_cost_basis, 2)
                    )}`
                  : "-"}
              </Table.HeaderCell>
              {/*percent gain*/}
              <Table.HeaderCell>
                {!!aggr_cost_basis
                  ? `${formatNumberForDisplay(
                      round(
                        100 *
                          (aggr_wallet_value - aggr_cost_basis) /
                          aggr_cost_basis,
                        2
                      )
                    )}%`
                  : "-"}
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
      </WalletsPie>
    )
  }
}
