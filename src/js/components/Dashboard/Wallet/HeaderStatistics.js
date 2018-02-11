import React from "react"
import Styled from "styled-components"
import { Statistic } from "semantic-ui-react"

import CoinLogo from "./../../CoinLogo/"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import {
  calculateWalletQuantity,
  calculateWalletValue
} from "./../../../helpers/walletMetrics"

const StatsComponent = Styled.div`
  margin: 0 0 3em 0;
  & > div {
    margin: 1.5em 0;
  }
`

export default ({ wallet, coin }) => (
  <StatsComponent>
    <div>
      <Statistic horizontal size="large">
        <Statistic.Value>
          ${formatNumberForDisplay(
            round(calculateWalletValue(wallet, coin.price_usd), 2)
          )}
        </Statistic.Value>
        <Statistic.Label>Wallet Value (USD)</Statistic.Label>
      </Statistic>
    </div>
    <div>
      <Statistic horizontal>
        <Statistic.Value>
          {formatNumberForDisplay(calculateWalletQuantity(wallet))}
        </Statistic.Value>
        <Statistic.Label>Total {wallet.symbol}</Statistic.Label>
      </Statistic>
    </div>
  </StatsComponent>
)
