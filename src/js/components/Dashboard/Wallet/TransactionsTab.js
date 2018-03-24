import React from "react"

import SummaryTable from "./SummaryTable"
import TransactionTable from "./TransactionTable"

export default ({
  coin,
  wallet,
  requestCreateTransaction,
  requestDeleteTransaction,
  requestEditTransaction,
  requestTransactionNote
}) => (
  <div>
    <SummaryTable {...{ wallet, coin }} />
    <TransactionTable
      {...{
        wallet,
        coin,
        requestCreateTransaction,
        requestDeleteTransaction,
        requestEditTransaction,
        requestTransactionNote
      }}
    />
  </div>
)
