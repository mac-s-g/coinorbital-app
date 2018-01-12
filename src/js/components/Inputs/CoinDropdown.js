import React, { Component } from "react"

import SearchDropdown from "./../Inputs/SearchDropdown"
import formatCoinOptions from "./../../helpers/formatCoinOptions"

export default class extends Component {
  componentDidMount() {
    const { coins, fetchCoins } = this.props
    if (!coins.list.length) {
      fetchCoins()
    }
  }

  render() {
    const coins_by_symbol = { ...this.props.coins.by_symbol }
    return (
      <SearchDropdown
        placeholder="Search Currencies"
        loading={this.props.coins.fetching_coins}
        options={formatCoinOptions(coins_by_symbol)}
        {...this.props}
      />
    )
  }
}
