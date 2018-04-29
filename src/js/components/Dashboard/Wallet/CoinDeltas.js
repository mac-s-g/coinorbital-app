import React, { Component } from "react"
import Styled from "styled-components"
import { Container, Icon, Statistic } from "semantic-ui-react"

import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import round from "./../../../helpers/round"

import { theme } from "./../../../constants"

const DeltaComponent = Styled.div`
  margin: 1.67em 0 3em 0;
`

const StatValue = Styled.div`
  margin-left: 0.67em !important;
  margin-right: 0.67em !important;

`

export default class extends Component {
  calculateStatColor = val => {
    if (val > 0) {
      return "green"
    } else if (val < 0) {
      return "red"
    } else {
      return "grey"
    }
  }
  calculateStatIcon = val => {
    if (val > 0) {
      return "arrow up"
    } else if (val < 0) {
      return "arrow down"
    } else {
      return "ban"
    }
  }
  render() {
    const { wallet, coins } = this.props
    const coin = coins.by_symbol[wallet.symbol]
    return (
      <DeltaComponent>
        <Statistic.Group size="tiny" widths="four">
          <Statistic>
            <Statistic.Value
              as={StatValue}
              style={{ color: theme.colors.blue }}
            >
              ${formatNumberForDisplay(round(coin.price_usd, 2))}
            </Statistic.Value>
            <Statistic.Label style={{ color: theme.colors.gray_dark }}>
              Price (USD)
            </Statistic.Label>
          </Statistic>
          <Statistic color={this.calculateStatColor(coin.percent_change_7d)}>
            <Statistic.Value as={StatValue}>
              <Icon name={this.calculateStatIcon(coin.percent_change_7d)} />
              {Math.abs(coin.percent_change_7d)}%
            </Statistic.Value>
            <Statistic.Label style={{ color: theme.colors.gray_dark }}>
              7 Day
            </Statistic.Label>
          </Statistic>
          <Statistic color={this.calculateStatColor(coin.percent_change_24h)}>
            <Statistic.Value as={StatValue}>
              <Icon name={this.calculateStatIcon(coin.percent_change_24h)} />
              {Math.abs(coin.percent_change_24h)}%
            </Statistic.Value>
            <Statistic.Label style={{ color: theme.colors.gray_dark }}>
              24 Hour
            </Statistic.Label>
          </Statistic>
          <Statistic color={this.calculateStatColor(coin.percent_change_1h)}>
            <Statistic.Value as={StatValue}>
              <Icon name={this.calculateStatIcon(coin.percent_change_1h)} />
              {Math.abs(coin.percent_change_1h)}%
            </Statistic.Value>
            <Statistic.Label style={{ color: theme.colors.gray_dark }}>
              1 Hour
            </Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </DeltaComponent>
    )
  }
}
