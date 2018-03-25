import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Icon, Label, Pagination, Table } from "semantic-ui-react"

import SubHeader from "./../SubHeader"

import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import formatDateForDisplay from "./../../../helpers/formatDateForDisplay"
import round from "./../../../helpers/round"
import get from "./../../../helpers/get"
import {
  calculateWalletQuantity,
  calculateWalletValue,
  calculateWalletTotalTx
} from "./../../../helpers/walletMetrics"

import { theme } from "./../../../constants"

const RECEIVED = "received"
const SENT = "sent"

const MIN_WIDTH = "700px"

const TransactionsComponent = Styled.div`
  margin-top: 2em;
  min-width: ${MIN_WIDTH};
`

const HeaderIcon = Styled.i`
  cursor: pointer;
  color: ${theme.colors.gray} !important;
  margin-top: 6px !important;
  vertical-align: top !important;
  &:hover {
    color: ${theme.colors.blue} !important;
  }
`

const TableIcon = Styled.i`
  cursor: pointer;
  color: ${theme.colors.gray};
  &:hover {
    color: ${props => props.hoverColor} !important;
  }
`

const NoteLabel = Styled.div`
  line-height: 16px;
  padding: 0;
  min-width: 16px;
  min-height: 16px;
  text-align: center;
  border-radius: 500rem;
  font-size: .85714286rem;
  display: inline-block;
  font-weight: 700;
  margin-right: 6px;
  background-color: #e8e8e8;
  color: ${theme.colors.gray};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.gray_dark};
    background-color: ${props => props.hoverColor};
  }
`

export default class extends Component {
  state = {
    sort: {
      column: "date",
      direction: "descending"
    },
    pagination: {
      boundaryRange: 0,
      siblingRange: 1,
      ellipsisItem: false,
      prevItem: false,
      nextItem: false,
      size: "mini",
      activePage: 1,
      perPage: 10
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      sort: {
        column: this.state.sort.column,
        direction: this.state.sort.direction
      },
      pagination: {
        ...this.state.pagination,
        //reset active page to 1 when coin changes
        activePage:
          props.wallet.symbol === this.props.wallet.symbol
            ? this.state.pagination.activePage
            : 1
      }
    })
  }

  getTxTypeIcon = type => {
    if (type === RECEIVED) {
      return "Received"
      return <Icon name="plus circle" style={{ color: theme.colors.green }} />
    } else {
      return "Sent"
      return <Icon name="minus circle" style={{ color: theme.colors.red }} />
    }
  }

  displayPurchasePrice = cost_per_coin => {
    if (cost_per_coin) {
      return `$${formatNumberForDisplay(round(cost_per_coin, 2))}`
    } else {
      return <Icon name="question circle outline" />
    }
  }

  displayTotalValue = (cost_per_coin, quantity) => {
    if (cost_per_coin) {
      return `$${formatNumberForDisplay(round(cost_per_coin * quantity, 2))}`
    } else {
      return <Icon name="question circle outline" />
    }
  }

  calculatePctNet = (original_cost_per_coin, current_cost_per_coin, tx_type) =>
    (tx_type === RECEIVED ? -1 : 1) *
    100 *
    (original_cost_per_coin - current_cost_per_coin) /
    original_cost_per_coin

  displayPctNet = (original_cost_per_coin, current_cost_per_coin, tx_type) => {
    if (original_cost_per_coin) {
      return (
        formatNumberForDisplay(
          round(
            this.calculatePctNet(
              original_cost_per_coin,
              current_cost_per_coin,
              tx_type
            ),
            2
          )
        ) + "%"
      )
    } else {
      return <Icon name="question circle outline" />
    }
  }

  displayTotalNet = (
    original_cost_per_coin,
    current_cost_per_coin,
    tx_type,
    quantity
  ) => {
    if (original_cost_per_coin) {
      return (
        "$" +
        formatNumberForDisplay(
          round(
            original_cost_per_coin *
              quantity *
              (this.calculatePctNet(
                original_cost_per_coin,
                current_cost_per_coin,
                tx_type
              ) /
                100),
            2
          )
        )
      )
    } else {
      return <Icon name="question circle outline" />
    }
  }

  netPositive = (tx, current_price_usd) =>
    (tx.type === RECEIVED && tx.cost_per_coin_usd < current_price_usd) ||
    (tx.type === SENT && tx.cost_per_coin_usd > current_price_usd)

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

  sortTransactions = (data, column, direction) => {
    switch (column) {
      case "date":
        //date compare
        return data.sort(function(a, b) {
          return direction == "ascending"
            ? new Date(a[column]) - new Date(b[column])
            : new Date(b[column]) - new Date(a[column])
        })
      case "type":
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

  prepareTableData = (transactions, coin) =>
    transactions.map((tx, idx) => ({
      ...tx,
      idx: idx,
      date: get(tx, "time_transacted", tx.time_recorded),
      type: tx.type,
      quantity: formatNumberForDisplay(tx.quantity),
      price: this.displayPurchasePrice(tx.cost_per_coin_usd),
      cost_basis: this.displayTotalValue(tx.cost_per_coin_usd, tx.quantity),
      value: this.displayTotalValue(coin.price_usd, tx.quantity),
      capital_gain: this.displayTotalNet(
        tx.cost_per_coin_usd,
        coin.price_usd,
        tx.type,
        tx.quantity
      ),
      percent_gain: this.displayPctNet(
        tx.cost_per_coin_usd,
        coin.price_usd,
        tx.type
      )
    }))

  render() {
    const {
      wallet,
      coin,
      requestCreateTransaction,
      requestDeleteTransaction,
      requestEditTransaction,
      requestTransactionNote
    } = this.props

    const { sort, pagination } = this.state
    const { perPage, activePage, ...paginate_props } = pagination
    const { transactions } = wallet
    const { column, direction } = sort
    const aggr_quantity = calculateWalletQuantity(wallet)
    const aggr_total_tx = calculateWalletTotalTx(wallet)
    const aggr_total_val = calculateWalletValue(wallet, coin.price_usd)
    const aggr_pct_net = 100 * (aggr_total_val - aggr_total_tx) / aggr_total_tx
    const aggr_net_val = aggr_total_val - aggr_total_tx

    const prepared_data = this.prepareTableData(transactions, coin)
    const data = this.sortTransactions(prepared_data, column, direction)

    return (
      <TransactionsComponent>
        <SubHeader style={{ display: "inline-block" }}>Transactions</SubHeader>
        <Icon
          as={HeaderIcon}
          size="large"
          name="plus circle"
          onClick={e => requestCreateTransaction({ ...wallet, coin: coin })}
        />
        {data.length > perPage ? (
          <Pagination
            {...paginate_props}
            style={{ verticalAlign: "top" }}
            activePage={activePage}
            floated="right"
            totalPages={Math.ceil(data.length / perPage)}
            onPageChange={(e, { activePage }) => {
              this.setState({ pagination: { ...pagination, activePage } })
            }}
          />
        ) : null}
        {data.length ? (
          <div>
            <Table unstackable sortable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={column === "date" ? direction : null}
                    onClick={() => this.handleSort("date")}
                  >
                    Date
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "type" ? direction : null}
                    onClick={() => this.handleSort("type")}
                  >
                    Type
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "quantity" ? direction : null}
                    onClick={() => this.handleSort("quantity")}
                  >
                    Quantity
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "price" ? direction : null}
                    onClick={() => this.handleSort("price")}
                  >
                    Coin Price
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
                    Market Value
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
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data
                  .slice((activePage - 1) * perPage, activePage * perPage)
                  .map(tx => {
                    const net_pos =
                      tx.cost_per_coin_usd &&
                      tx.cost_per_coin_usd != coin.price_usd &&
                      this.netPositive(tx, coin.price_usd)
                    const net_neg =
                      tx.cost_per_coin_usd &&
                      tx.cost_per_coin_usd != coin.price_usd &&
                      !this.netPositive(tx, coin.price_usd)
                    return (
                      <Table.Row key={tx.idx}>
                        {/*transaction date*/}
                        <Table.Cell>{formatDateForDisplay(tx.date)}</Table.Cell>
                        {/*transaction type*/}
                        <Table.Cell
                          positive={tx.type === RECEIVED}
                          negative={tx.type !== RECEIVED}
                        >
                          {this.getTxTypeIcon(tx.type)}
                        </Table.Cell>
                        {/*quantity*/}
                        <Table.Cell>{tx.quantity}</Table.Cell>
                        {/*purchase price*/}
                        <Table.Cell>{tx.price}</Table.Cell>
                        {/*cost basis*/}
                        <Table.Cell>{tx.cost_basis}</Table.Cell>
                        <Table.Cell>
                          {/*current value*/}
                          {tx.value}
                        </Table.Cell>
                        <Table.Cell positive={net_pos} negative={net_neg}>
                          {/*capital gain*/}
                          {tx.capital_gain}
                        </Table.Cell>
                        <Table.Cell positive={net_pos} negative={net_neg}>
                          {/*percent gain*/}
                          {tx.percent_gain}
                        </Table.Cell>
                        <Table.Cell>
                          {/*actions*/}
                          {!!tx.notes.length ? (
                            <NoteLabel
                              hoverColor={theme.colors.gold}
                              circular
                              onClick={e =>
                                requestTransactionNote(wallet, tx.idx)
                              }
                            >
                              {tx.notes.length}
                            </NoteLabel>
                          ) : (
                            <Icon
                              as={TableIcon}
                              hoverColor={theme.colors.gold}
                              name="sticky note outline"
                              onClick={e =>
                                requestTransactionNote(wallet, tx.idx)
                              }
                            />
                          )}
                          <Icon
                            as={TableIcon}
                            hoverColor={theme.colors.blue}
                            name="edit"
                            onClick={e =>
                              requestEditTransaction(
                                { ...wallet, coin: coin },
                                tx.idx
                              )
                            }
                          />
                          <Icon
                            as={TableIcon}
                            hoverColor={theme.colors.red}
                            name="remove circle"
                            onClick={e =>
                              requestDeleteTransaction(wallet, tx.idx)
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table>
            <div>
              {data.length == 1
                ? "1 recorded transaction"
                : `${data.length} recorded transactions`}
              {data.length > perPage ? (
                <div>{perPage} results per page</div>
              ) : null}
            </div>
          </div>
        ) : (
          <div>no recorded transactions</div>
        )}
      </TransactionsComponent>
    )
  }
}
