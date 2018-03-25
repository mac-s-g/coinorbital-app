import React, { Component } from "react"
import PropTypes from "prop-types"
import Styled from "styled-components"

import CoinLineChart from "./../../Charts/CoinLineChart"

import SubHeader from "./../SubHeader"

import { theme } from "./../../../constants"

const WalletLineChart = Styled.div`
  margin-top: 3em;
  height: 300px;
`

export default ({ coins, wallet, fetchTimeSeries }) => (
  <WalletLineChart>
    {/*<SubHeader style={{ marginBottom: "1.67em" }}>
            {coins.by_symbol[wallet.symbol].name} Market Value
          </SubHeader>*/}
    <CoinLineChart
      symbol={wallet.symbol}
      coins={coins}
      fetchTimeSeries={fetchTimeSeries}
      responsive
      transactions={wallet.transactions}
    />
  </WalletLineChart>
)
