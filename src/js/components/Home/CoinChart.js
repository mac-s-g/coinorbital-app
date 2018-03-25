import React, { Component } from "react"
import PropTypes from "prop-types"
import Styled from "styled-components"

import CoinLineChart from "./../Charts/CoinLineChart"

//value refresh
const FETCH_COIN_INTERVAL = 5000

const WalletLineChart = Styled.div`
  width: 100%;
  height: 100%;
`

export default class extends Component {
  componentWillMount() {
    this.props.fetchCoins()
  }

  render() {
    const { symbol, coins, fetchTimeSeries } = this.props

    return (
      <WalletLineChart>
        {!!coins.by_symbol[symbol] ? (
          <CoinLineChart
            symbol={symbol}
            coins={coins}
            fetchTimeSeries={fetchTimeSeries}
            responsive
            animate
            timeControl={false}
            chartType="month"
            displayXAxis={false}
            displayYAxis={false}
            loader={false}
          />
        ) : null}
      </WalletLineChart>
    )
  }
}
