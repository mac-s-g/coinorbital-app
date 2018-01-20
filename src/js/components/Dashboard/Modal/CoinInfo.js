import React, { Component } from "react"
import {
  Button,
  Container,
  Dimmer,
  Icon,
  Loader,
  Modal,
  Statistic
} from "semantic-ui-react"

import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"

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
    const { closeModal, coins, modals } = this.props
    const coin = coins.by_symbol[modals.coin_info]

    return coin ? (
      <Modal basic open size="tiny" onClose={closeModal}>
        <Modal.Header>
          {coin ? `${coin.name} (${coin.symbol})` : null}
        </Modal.Header>
        <Modal.Content>
          <Statistic.Group inverted horizontal>
            <Statistic>
              <Statistic.Value>
                ${formatNumberForDisplay(coin.price_usd)}
              </Statistic.Value>
              <Statistic.Label>USD</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                ${formatNumberForDisplay(coin.market_cap_usd)}
              </Statistic.Value>
              <Statistic.Label>Market Cap</Statistic.Label>
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
              color={this.calculateStatColor(coin.percent_change_7d)}
              size="tiny"
            >
              <Statistic.Value>
                <Icon name={this.calculateStatIcon(coin.percent_change_7d)} />
                {Math.abs(coin.percent_change_7d)}%
              </Statistic.Value>
              <Statistic.Label>7 Day</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="thumbs up"
            onClick={() => {
              closeModal()
            }}
          />
        </Modal.Actions>
      </Modal>
    ) : (
      <Dimmer active page>
        <Loader active />
      </Dimmer>
    )
  }
}
