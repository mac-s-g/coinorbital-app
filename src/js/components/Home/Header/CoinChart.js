import React, { Component } from "react"
import PropTypes from "prop-types"
import Styled from "styled-components"

import CoinLineChart from "./../../Charts/CoinLineChart"

import { theme } from "./../../../constants"

//value refresh
const FETCH_COIN_INTERVAL = 5000

const WalletLineChart = Styled.div`
  width: 100%;
  height: 100%;
`

const Label = Styled.div`
  position: absolute;
  right: 2em;
  bottom: 1em;
  font-weight: bold;
  color: ${theme.colors.inverted};
  background-color: white;
  border-radius: 0.3em;
  padding: 0em 0.67em;
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
            chartType="day"
            symbol={symbol}
            coins={coins}
            fetchTimeSeries={fetchTimeSeries}
            responsive
            animate
            timeControl={false}
            displayXAxis={false}
            displayYAxis={false}
            loader={false}
            currentPriceLine={false}
          />
        ) : null}
        <Label>Bitcoin Price, Last 24 Hours</Label>
      </WalletLineChart>
    )
  }
}
