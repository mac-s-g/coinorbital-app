import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Icon, Label, Table } from "semantic-ui-react"

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

const TransactionsComponent = Styled.div`
  margin-top: 2.67em;
`

const HeaderComponent = Styled.div`
  font-weight: 300;
  font-size: 1.28571429em;
  color: ${theme.colors.gray_dark};
  display: inline-block;
  height: 32px;
  margin: 0 0.33em 0.33em 0;
  padding-top: 6px;
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
      return "-"
    }
  }

  displayTotalValue = (cost_per_coin, quantity) => {
    if (cost_per_coin) {
      return `$${formatNumberForDisplay(round(cost_per_coin * quantity, 2))}`
    } else {
      return "-"
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
      return "-"
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
      return "-"
    }
  }

  netPositive = (tx, current_price_usd) =>
    (tx.type === RECEIVED && tx.cost_per_coin_usd < current_price_usd) ||
    (tx.type === SENT && tx.cost_per_coin_usd > current_price_usd)

  render() {
    const {
      wallet,
      coin,
      requestCreateTransaction,
      requestDeleteTransaction,
      requestEditTransaction,
      requestTransactionNote
    } = this.props
    const { transactions } = wallet

    const aggr_quantity = calculateWalletQuantity(wallet)
    const aggr_total_tx = calculateWalletTotalTx(wallet)
    const aggr_total_val = calculateWalletValue(wallet, coin.price_usd)
    const aggr_pct_net = 100 * (aggr_total_val - aggr_total_tx) / aggr_total_tx
    const aggr_net_val = aggr_total_val - aggr_total_tx
    return (
      <TransactionsComponent>
        <HeaderComponent>Transactions</HeaderComponent>
        <Icon
          as={HeaderIcon}
          size="large"
          name="plus circle"
          onClick={e => requestCreateTransaction({ ...wallet, coin: coin })}
        />
        {transactions.length ? (
          <div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>TX Price</Table.HeaderCell>
                  <Table.HeaderCell>TX Value</Table.HeaderCell>
                  <Table.HeaderCell>Current Value</Table.HeaderCell>
                  <Table.HeaderCell>Net %</Table.HeaderCell>
                  <Table.HeaderCell>Net Value</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {transactions.map((tx, idx) => {
                  const net_pos =
                    tx.cost_per_coin_usd &&
                    tx.cost_per_coin_usd != coin.price_usd &&
                    this.netPositive(tx, coin.price_usd)
                  const net_neg =
                    tx.cost_per_coin_usd &&
                    tx.cost_per_coin_usd != coin.price_usd &&
                    !this.netPositive(tx, coin.price_usd)
                  return (
                    <Table.Row key={idx}>
                      <Table.Cell>
                        {/*transaction_date*/}
                        {formatDateForDisplay(
                          get(tx, "time_transacted", tx.time_recorded)
                        )}
                      </Table.Cell>
                      <Table.Cell
                        positive={tx.type === RECEIVED}
                        negative={tx.type !== RECEIVED}
                      >
                        {this.getTxTypeIcon(tx.type)}
                      </Table.Cell>
                      <Table.Cell>
                        {/*quantity*/}
                        {formatNumberForDisplay(tx.quantity)}
                      </Table.Cell>
                      <Table.Cell>
                        {/*purchase price*/}
                        {this.displayPurchasePrice(tx.cost_per_coin_usd)}
                      </Table.Cell>
                      <Table.Cell>
                        {/*purchase value*/}
                        {this.displayTotalValue(
                          tx.cost_per_coin_usd,
                          tx.quantity
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {/*current value*/}
                        {this.displayTotalValue(coin.price_usd, tx.quantity)}
                      </Table.Cell>
                      <Table.Cell positive={net_pos} negative={net_neg}>
                        {/*delta*/}
                        {this.displayPctNet(
                          tx.cost_per_coin_usd,
                          coin.price_usd,
                          tx.type
                        )}
                      </Table.Cell>
                      <Table.Cell positive={net_pos} negative={net_neg}>
                        {/*delta*/}
                        {this.displayTotalNet(
                          tx.cost_per_coin_usd,
                          coin.price_usd,
                          tx.type,
                          tx.quantity
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {/*actions*/}
                        {!!tx.notes.length ? (
                          <NoteLabel
                            hoverColor={theme.colors.gold}
                            circular
                            onClick={e => requestTransactionNote(wallet, idx)}
                          >
                            {tx.notes.length}
                          </NoteLabel>
                        ) : (
                          <Icon
                            as={TableIcon}
                            hoverColor={theme.colors.gold}
                            name="sticky note outline"
                            onClick={e => requestTransactionNote(wallet, idx)}
                          />
                        )}
                        <Icon
                          as={TableIcon}
                          hoverColor={theme.colors.blue}
                          name="edit"
                          onClick={e =>
                            requestEditTransaction(
                              { ...wallet, coin: coin },
                              idx
                            )}
                        />
                        <Icon
                          as={TableIcon}
                          hoverColor={theme.colors.red}
                          name="remove circle"
                          onClick={e => requestDeleteTransaction(wallet, idx)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell>
                    {formatNumberForDisplay(round(aggr_quantity, 6))}
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell>
                    {!!aggr_total_tx
                      ? `$${formatNumberForDisplay(round(aggr_total_tx, 2))}`
                      : null}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    ${formatNumberForDisplay(round(aggr_total_val, 2))}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {!!aggr_total_tx
                      ? `${formatNumberForDisplay(round(aggr_pct_net, 2))}%`
                      : null}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    ${formatNumberForDisplay(round(aggr_net_val, 2))}
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Footer>
            </Table>
            <div>
              {transactions.length == 1
                ? "1 recorded transaction"
                : `${transactions.length} recorded transactions`}
            </div>
          </div>
        ) : (
          <div>no recorded transactions</div>
        )}
      </TransactionsComponent>
    )
  }
}
