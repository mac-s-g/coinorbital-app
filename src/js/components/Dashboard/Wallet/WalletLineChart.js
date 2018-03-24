import React, { Component } from "react"
import PropTypes from "prop-types"
import Styled from "styled-components"

import CoinLineChart from "./../../Charts/CoinLineChart"

import SubHeader from "./../SubHeader"

import { theme } from "./../../../constants"

const WalletLineChart = Styled.div`
  margin-top: 3em;
`

export default class extends Component {
  state = {
    width: null
  }

  componentDidMount() {
    this.setState({ width: this.refs.chartComponent.offsetWidth })
  }

  render() {
    const { coins, wallet, fetchTimeSeries } = this.props
    const { width } = this.state
    return (
      <WalletLineChart>
        <div ref="chartComponent">
          {/*<SubHeader style={{ marginBottom: "1.67em" }}>
            {coins.by_symbol[wallet.symbol].name} Market Value
          </SubHeader>*/}
          {width ? (
            <CoinLineChart
              symbol={wallet.symbol}
              coins={coins}
              fetchTimeSeries={fetchTimeSeries}
              width={width}
              transactions={wallet.transactions}
            />
          ) : null}
        </div>
      </WalletLineChart>
    )
  }
}
