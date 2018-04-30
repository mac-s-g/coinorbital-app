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

const Arrows = Styled.div`
  height: 50px;
  margin-top: 16px;
`
const Arrow = Styled.i`
  cursor: pointer;
  display: ${({ hide }) => (hide ? "none !important" : "block")};
  float: ${({ pull }) => pull};
`

export default class extends Component {
  componentWillMount() {
    const { fetchCoins, coins } = this.props
    if (!coins.fetching_coins && !coins.list.length) {
      fetchCoins()
    }

    window.addEventListener("keydown", this.handleKeyPress)
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress)
  }
  handleKeyPress = e => {
    switch (e.key) {
      case "ArrowLeft":
        return this.cycleLeft()
      case "ArrowRight":
        return this.cycleRight()
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
  cycleLeft = () => {
    const { symbol } = this.props.coins.by_symbol[this.props.modals.coin_chart]
    const { ranked } = this.props.watchList
    if (ranked[ranked.indexOf(symbol) - 1]) {
      this.props.closeModal()
      this.props.requestCoinChart(ranked[ranked.indexOf(symbol) - 1])
    }
  }
  cycleRight = () => {
    const { symbol } = this.props.coins.by_symbol[this.props.modals.coin_chart]
    const { ranked } = this.props.watchList
    if (ranked[ranked.indexOf(symbol) + 1]) {
      this.props.closeModal()
      this.props.requestCoinChart(ranked[ranked.indexOf(symbol) + 1])
    }
  }

  render() {
    const { closeModal, coins, modals, watchList, fetchTimeSeries } = this.props
    const coin = coins.by_symbol[modals.coin_chart]
    const { ranked } = watchList

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
              displayYAxis={false}
            />
          </ChartComponent>
          <Arrows>
            <input hidden onKeyPress={e => console.log("HEY")} />
            <Icon
              as={Arrow}
              name="chevron left"
              size="large"
              pull="left"
              hide={ranked.indexOf(coin.symbol) === 0}
              onClick={this.cycleLeft}
            />
            <Icon
              as={Arrow}
              name="chevron right"
              size="large"
              pull="right"
              hide={ranked.indexOf(coin.symbol) === ranked.length - 1}
              onClick={this.cycleRight}
            />
          </Arrows>
        </Modal.Content>
      </Modal>
    ) : (
      <Dimmer active page>
        <Loader active />
      </Dimmer>
    )
  }
}
