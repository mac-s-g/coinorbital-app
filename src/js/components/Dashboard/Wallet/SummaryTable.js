import React from "react"
import Styled from "styled-components"
import { Table } from "semantic-ui-react"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"

const InlineLogo = Styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 6px;
  & > img {
    height: 20px !important;
  }
`

export default ({ wallet, coin }) => (
  <Table collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Coin</Table.HeaderCell>
        <Table.HeaderCell>{coin.symbol} Price (USD)</Table.HeaderCell>
        <Table.HeaderCell>Total {coin.symbol}</Table.HeaderCell>
        <Table.HeaderCell>Wallet Value (USD)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <span>
            {coin.name} ({coin.symbol})
          </span>
        </Table.Cell>
        <Table.Cell>${formatNumberForDisplay(coin.price_usd)}</Table.Cell>
        <Table.Cell>{formatNumberForDisplay(wallet.balance)}</Table.Cell>
        <Table.Cell>
          ${formatNumberForDisplay(round(wallet.balance * coin.price_usd, 2))}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)