import React, { Component } from "react"
import Styled from "styled-components"
import { Header, Input, Loader, Modal, Statistic } from "semantic-ui-react"

import Submit from "./../Buttons/Submit"
import Cancel from "./../Buttons/Cancel"
import DatePicker from "./../Inputs/DatePicker"
import InputLabel from "./../Inputs/InputLabel"
import SearchDropdown from "./../Inputs/SearchDropdown"

import round from "./../../helpers/round"
import formatNumberForDisplay from "./../../helpers/formatNumberForDisplay"
import { calculateWalletQuantity } from "./../../helpers/walletMetrics"

import { theme } from "./../../constants"

const ModalInputContainer = Styled.div`
  & > * {margin-bottom: 12px;}
`

const ValueStatistic = Styled.div`
  margin-top: 4px !important;
`

const SENT = "sent"
const RECEIVED = "received"

export default class extends Component {
  constructor(props) {
    super(props)
    const wallet = this.props.modals.create_transaction
    this.state = {
      time_transacted: new Date(),
      type: RECEIVED,
      quantity: "",
      cost_per_coin_usd: !!props.coins
        ? props.coins.by_symbol[wallet.symbol].price_usd
        : 0
    }
  }
  componentWillMount() {
    const { coins } = this.props
    if (!coins.fetching_coins && !coins.fetched) {
      fetchCoins()
    }
  }

  setTimeTransacted = date => this.setState({ time_transacted: date })
  setTransactionType = value =>
    this.setState({
      type: value
    })
  setQuantity = (event, { value }) => {
    value = value.replace(/[^0-9.]/g, "")
    this.setState({
      quantity: value
    })
  }
  setPricePerCoin = (event, { value }) =>
    this.setState({ cost_per_coin_usd: value.replace(/[^0-9.]/g, "") })

  isValidQuantity = quantity =>
    this.isValidFloat(quantity) &&
    this.parseFloatInput(quantity) !== 0 &&
    //make sure the user can't send more than exists in wallet
    (this.state.type === RECEIVED ||
      this.parseFloatInput(quantity) <
        calculateWalletQuantity(this.props.modals.create_transaction))
  isValidCost = cost =>
    cost.trim() != "" &&
    this.isValidFloat(cost) &&
    this.parseFloatInput(cost) > 0
  isValidFloat = value =>
    !!value.toString().length && !!value.toString().match(/^(\d*\.?\d*)$/)
  parseFloatInput = value => parseFloat(value.toString().trim())

  render() {
    const { closeModal, editWallet, modals, coins, navigateTo } = this.props
    const wallet = modals.create_transaction
    const { time_transacted, quantity, cost_per_coin_usd, type } = this.state
    const validQuantity = this.isValidQuantity(quantity)
    const validCost = this.isValidCost(cost_per_coin_usd)
    let coin

    try {
      coin = coins.by_symbol[wallet.symbol]
    } catch (e) {}

    return !coin ? (
      <Modal open size="tiny" onClose={closeModal} closeOnEscape={false}>
        <Loader active />
      </Modal>
    ) : (
      <Modal open size="tiny" onClose={closeModal} closeOnEscape={false}>
        <Modal.Header>Record a Transaction</Modal.Header>
        <Modal.Content>
          <ModalInputContainer>
            <InputLabel>Transaction Date</InputLabel>
            <DatePicker
              fluid
              selected={time_transacted}
              onChange={this.setTimeTransacted}
              maxDate={new Date()}
            />
            <InputLabel>Transaction Type</InputLabel>
            <SearchDropdown
              options={[
                { value: SENT, text: "Sent" },
                { value: RECEIVED, text: "Received" }
              ]}
              value={type}
              onChange={this.setTransactionType}
            />
            <InputLabel>Quantity ({coin.symbol})</InputLabel>
            <Input
              fluid
              placeholder="Quantity"
              value={quantity}
              onChange={this.setQuantity}
              error={validQuantity === false}
            />
            <InputLabel>Price Per Coin</InputLabel>
            <Input
              fluid
              placeholder="Cost Per Coin (USD)"
              value={cost_per_coin_usd}
              onChange={this.setPricePerCoin}
              label={{ content: "$" }}
              error={!validCost}
            />
            {validQuantity && validCost ? (
              <div>
                <InputLabel>Transaction Value</InputLabel>
                <Statistic horizontal size="mini" as={ValueStatistic}>
                  <Statistic.Value>
                    ${formatNumberForDisplay(
                      round(
                        this.parseFloatInput(cost_per_coin_usd) *
                          this.parseFloatInput(quantity),
                        2
                      )
                    )}
                  </Statistic.Value>
                  <Statistic.Label>USD</Statistic.Label>
                </Statistic>
              </div>
            ) : null}
          </ModalInputContainer>
        </Modal.Content>
        <Modal.Actions>
          <Cancel onClick={closeModal} />
          <Submit
            disabled={!validQuantity || !validCost}
            onClick={e => {
              delete wallet.coin
              editWallet(wallet.name, {
                ...wallet,
                transactions: [
                  ...wallet.transactions,
                  {
                    time_recorded: new Date(),
                    time_transacted: time_transacted,
                    quantity: this.parseFloatInput(quantity),
                    type: type,
                    cost_per_coin_usd: this.parseFloatInput(cost_per_coin_usd),
                    fee: null,
                    notes: []
                  }
                ]
              })
              closeModal()
              navigateTo(
                `/dashboard/wallet?name=${encodeURIComponent(wallet.name)}`
              )
            }}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
