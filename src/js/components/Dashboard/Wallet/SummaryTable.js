import React from "react"
import Styled from "styled-components"
import { Icon, Table } from "semantic-ui-react"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import {
  calculateWalletQuantity,
  calculateWalletValue,
  calculateWalletTotalTx
} from "./../../../helpers/walletMetrics"

const InlineLogo = Styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 6px;
  & > img {
    height: 20px !important;
  }
`

const TableComponent = Styled.div`
  margin-top: 2em;
`

export default ({ wallet, coin }) => {
  const cost_basis = calculateWalletTotalTx(wallet)
  const wallet_value = calculateWalletValue(wallet, coin.price_usd)
  return (
    <TableComponent>
      <Table collapsing unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{coin.symbol} Price</Table.HeaderCell>
            <Table.HeaderCell>Total Holding</Table.HeaderCell>
            <Table.HeaderCell>Cost Basis</Table.HeaderCell>
            <Table.HeaderCell>Current Value</Table.HeaderCell>
            <Table.HeaderCell>Capital Gain</Table.HeaderCell>
            <Table.HeaderCell>% Gain</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {/*coin price*/}
            <Table.Cell>${formatNumberForDisplay(coin.price_usd)}</Table.Cell>
            {/*total holding*/}
            <Table.Cell>
              {formatNumberForDisplay(calculateWalletQuantity(wallet))}{" "}
              {coin.symbol}
            </Table.Cell>
            {/*cost basis*/}
            <Table.Cell>
              {!!cost_basis ? (
                `$${formatNumberForDisplay(round(cost_basis, 2))}`
              ) : (
                <Icon name="question circle outline" />
              )}
            </Table.Cell>
            {/*wallet value*/}
            <Table.Cell>
              ${formatNumberForDisplay(round(wallet_value, 2))}
            </Table.Cell>
            {/*capital gain*/}
            <Table.Cell
              positive={
                !!cost_basis && round(wallet_value, 2) > round(cost_basis, 2)
              }
              negative={
                !!cost_basis && round(wallet_value, 2) < round(cost_basis, 2)
              }
            >
              {!!cost_basis ? (
                `$${formatNumberForDisplay(
                  round(wallet_value - cost_basis, 2)
                )}`
              ) : (
                <Icon name="question circle outline" />
              )}
            </Table.Cell>
            {/*percent gain*/}
            <Table.Cell
              positive={
                !!cost_basis && round(wallet_value, 2) > round(cost_basis, 2)
              }
              negative={
                !!cost_basis && round(wallet_value, 2) < round(cost_basis, 2)
              }
            >
              {!!cost_basis ? (
                `${formatNumberForDisplay(
                  round(100 * (wallet_value - cost_basis) / cost_basis, 2)
                )}%`
              ) : (
                <Icon name="question circle outline" />
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </TableComponent>
  )
}
