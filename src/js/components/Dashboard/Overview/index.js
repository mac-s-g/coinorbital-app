import React, { Component } from "react"
import Styled from "styled-components"
import ContentComponent from "./../ContentComponent"
import PieComponent from "./../../Charts/Pie"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import {
  calculateWalletQuantity,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

import { theme } from "./../../../constants"

export default class extends Component {
  componentWillMount() {
    const { fetchWallets, fetchCoins, wallets, coins } = this.props
    if (!wallets.fetched) {
      fetchWallets()
    }
    if (!coins.fetching_coins && !coins.fetched) {
      fetchCoins()
    }
  }

  render() {
    const { coins, wallets } = this.props
    return coins.fetched && wallets.fetched ? ( // make sure app state contains what i need
      <ContentComponent
        header="Overview"
        subHeader="Manage your assets at a glance."
      >
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
        />
        <div class="column" style={{ marginTop: "60px" }}>
          <div class="ui sixteen column grid">
            <PieComponent coins={coins} wallets={wallets} />
          </div>
        </div>
      </ContentComponent>
    ) : (
      <div />
    )
  }
}
