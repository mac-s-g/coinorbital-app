import React, { Component } from "react"
import Styled from "styled-components"

export default class extends Component {
  constructor(props) {
    super(props)
    this.tsFilter = { symbol: props.wallet.symbol, type: "day" }
    this.tsFilterKey = JSON.stringify(this.tsFilter)
  }

  componentWillMount() {
    const { wallet, coins, fetchTimeSeries } = this.props
    if (!coins.time_series[this.tsFilterKey]) {
      fetchTimeSeries(this.tsFilter)
    }
  }

  render() {
    const { time_series } = this.props.coins
    const { tsFilterKey } = this
    const loading =
      time_series[tsFilterKey] && time_series[tsFilterKey].fetched
        ? false
        : true
    const series = loading ? [] : time_series[this.tsFilterKey].result

    return loading ? (
      <div>loading chart</div>
    ) : (
      <pre>{JSON.stringify(series, null, 2)}</pre>
    )
  }
}
