import React from "react"
import Styled from "styled-components"
import { Statistic } from "semantic-ui-react"

import CoinLogo from "./../../CoinLogo/"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"

const StatsComponent = Styled.div`
  margin: 0.67em 0;
`

export default ({ wallet, coin }) => (
  <StatsComponent>
    <Statistic.Group>
      <Statistic>
        <Statistic.Value>
          ${formatNumberForDisplay(round(wallet.balance * coin.price_usd, 2))}
        </Statistic.Value>
        <Statistic.Label>Value USD</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{wallet.balance}</Statistic.Value>
        <Statistic.Label>Total {wallet.symbol}</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </StatsComponent>
)
