import React from "react"
import Styled from "styled-components"
import { Button, Table } from "semantic-ui-react"

import { theme } from "./../../../constants"

const TransactionsComponent = Styled.div`
  margin-top: 2em;
`

const HeaderComponent = Styled.div`
  font-weight: 300;
  font-size: 1.28571429em;
  color: rgba(0, 0, 0, 0.6);
  display: inline-block;
  height: 32px;
  margin: 0 0.33em 0.33em 0;
  padding-top: 6px;
`

const HeaderButton = Styled.div`
  vertical-align: top !important;
  padding: 8px !important;
`

export default ({ wallet, coin, requestCreateTransaction }) => (
  <TransactionsComponent>
    <HeaderComponent>Transactions</HeaderComponent>
    <Button
      as={HeaderButton}
      circular
      icon="plus"
      onClick={e => requestCreateTransaction(wallet)}
    />
    {wallet.transactions.length ? (
      <div>there are {wallet.transactions.length} transactions</div>
    ) : (
      <div>no transactions found</div>
    )}
  </TransactionsComponent>
)
