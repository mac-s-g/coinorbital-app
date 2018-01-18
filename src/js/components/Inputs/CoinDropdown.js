import React, { Component } from "react"

import SearchDropdown from "./../Inputs/SearchDropdown"
import formatCoinOptions from "./../../helpers/formatCoinOptions"

export default class extends Component {
  componentWillMount() {
    const { coins, fetchCoins } = this.props
    if (!coins.fetching_coins && !coins.list.length) {
      fetchCoins()
    }
  }

  render() {
    const { coins, exclude } = this.props
    return (
      <SearchDropdown
        placeholder="Search Currencies"
        loading={this.props.coins.fetching_coins}
        options={formatCoinOptions(coins.by_symbol, exclude)}
        {...this.props}
      />
    )
  }
}
