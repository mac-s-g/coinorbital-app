import React from "react"
import Styled from "styled-components"
import { Statistic } from "semantic-ui-react"

import CoinLogo from "./../../CoinLogo/"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"

const StatsComponent = Styled.div`
  margin: 0 0 3em 0;
  & > div {
    margin: 1.5em 0;
  }
`

export default ({ totalValue }) => (
  <StatsComponent>
    <div>
      <Statistic horizontal size="large">
        <Statistic.Value>
          ${formatNumberForDisplay(round(totalValue, 2))}
        </Statistic.Value>
        <Statistic.Label>Value USD</Statistic.Label>
      </Statistic>
    </div>
  </StatsComponent>
)
