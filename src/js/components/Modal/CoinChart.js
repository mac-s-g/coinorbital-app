import React, { Component } from "react"
import Styled from "styled-components"
import {
  Button,
  Container,
  Dimmer,
  Icon,
  Loader,
  Modal,
  Statistic
} from "semantic-ui-react"

import CoinLineChart from "./../Charts/CoinLineChart"
import CoinLogo from "./../CoinLogo"

import formatNumberForDisplay from "./../../helpers/formatNumberForDisplay"

import { theme } from "./../../constants"

const CoinSymbol = Styled.div`
  display: inline-block;
  margin-right: 10px;
`

const ChartComponent = Styled.div`
  margin-top: 48px;
  height: 240px;
`

export default class extends Component {
  componentWillMount() {
    const { fetchCoins, coins } = this.props
    if (!coins.fetching_coins && !coins.list.length) {
      fetchCoins()
    }
  }
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
    const { closeModal, coins, modals, fetchTimeSeries } = this.props
    const coin = coins.by_symbol[modals.coin_chart]

    return coin ? (
      <Modal basic open size="large" onClose={closeModal} closeIcon>
        <Modal.Header>
          <CoinSymbol>
            <CoinLogo symbol={coin.symbol} />
          </CoinSymbol>
          <span style={{ verticalAlign: "super" }}>
            {coin.name} ({coin.symbol})
          </span>
        </Modal.Header>
        <Modal.Content>
          <div style={{ marginBottom: "14px" }}>
            <Statistic inverted horizontal size="large">
              <Statistic.Value>
                ${formatNumberForDisplay(coin.price_usd)}
              </Statistic.Value>
              <Statistic.Label>Price (USD)</Statistic.Label>
            </Statistic>
          </div>
          <div>
            <Statistic
              inverted
              horizontal
              size="tiny"
              style={{ marginBottom: "14px" }}
            >
              <Statistic.Value>
                ${formatNumberForDisplay(coin.market_cap_usd)}
              </Statistic.Value>
              <Statistic.Label>Market Cap</Statistic.Label>
            </Statistic>
          </div>
          <Statistic.Group
            inverted
            size="tiny"
            style={{ marginBottom: "-1em" }}
          >
            <Statistic
              inverted
              color={this.calculateStatColor(coin.percent_change_7d)}
              size="tiny"
            >
              <Statistic.Value>
                <Icon name={this.calculateStatIcon(coin.percent_change_7d)} />
                {Math.abs(coin.percent_change_7d)}%
              </Statistic.Value>
              <Statistic.Label>7 Day</Statistic.Label>
            </Statistic>
            <Statistic
              inverted
              color={this.calculateStatColor(coin.percent_change_24h)}
              size="tiny"
            >
              <Statistic.Value>
                <Icon name={this.calculateStatIcon(coin.percent_change_24h)} />
                {Math.abs(coin.percent_change_24h)}%
              </Statistic.Value>
              <Statistic.Label>24 Hour</Statistic.Label>
            </Statistic>
            <Statistic
              inverted
              color={this.calculateStatColor(coin.percent_change_1h)}
              size="tiny"
            >
              <Statistic.Value>
                <Icon name={this.calculateStatIcon(coin.percent_change_1h)} />
                {Math.abs(coin.percent_change_1h)}%
              </Statistic.Value>
              <Statistic.Label>1 Hour</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <ChartComponent>
            <CoinLineChart
              coins={coins}
              symbol={coin.symbol}
              fetchTimeSeries={fetchTimeSeries}
              responsive
              color={theme.colors.gold}
            />
          </ChartComponent>
        </Modal.Content>
      </Modal>
    ) : (
      <Dimmer active page>
        <Loader active />
      </Dimmer>
    )
  }
}
