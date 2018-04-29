import React, { Component } from "react"
import Styled from "styled-components"
import { Checkbox, Modal, Input, Statistic } from "semantic-ui-react"
import moment from "moment"

import Submit from "./../Buttons/Submit"
import Cancel from "./../Buttons/Cancel"
import CoinDropdown from "./../Inputs/CoinDropdown"
import ToggleSwitch from "./../Inputs/ToggleSwitch"

import round from "./../../helpers/round"
import formatNumberForDisplay from "./../../helpers/formatNumberForDisplay"

import { theme } from "./../../constants"

const RECEIVED = "received"

const ModalInputContainer = Styled.div`
  & > * {margin-bottom: 12px;}
`

const ToggleLabel = Styled.div`
  display: inline-block;
  margin-right: 8px;
  height: 21px;
  vertical-align: top;
`

export default class extends Component {
  state = {
    name: "",
    symbol: null,
    enable_balance: false,
    balance: 0
  }

  setName = (event, { value }) => this.setState({ name: value })
  setSymbol = symbol => this.setState({ symbol })
  setBalance = (event, { value }) =>
    value.match(/^[\d]*\.?[\d]*$/) ? this.setState({ balance: value }) : null
  parseBalance = balance => {
    const { enable_balance } = this.state
    return !enable_balance || isNaN(parseFloat(balance))
      ? 0
      : parseFloat(balance)
  }
  getWalletName = () => {
    const { name, symbol } = this.state
    const by_name = this.props.wallets
    if (name.trim() === "") {
      return this.createWalletName(symbol)
    } else {
      return name.trim()
    }
  }
  createWalletName = symbol => {
    const { wallets, coins } = this.props
    const coin_name = coins.by_symbol[symbol].name
    //count offset if necessary
    let count, wallet_name

    //name wallet after coin if another doesn't exist
    if (wallets.by_name[coin_name] === undefined) {
      wallet_name = coin_name
    } else {
      //use count offset following coin name, start with offset = 2
      count = 2
      while (wallets.by_name[`${coin_name} ${count}`] !== undefined) {
        count++
      }
      wallet_name = `${coin_name} ${count}`
    }
    return wallet_name
  }

  render() {
    const {
      wallets,
      closeModal,
      createTransaction,
      createWallet,
      coins,
      navigateTo,
      ...props
    } = this.props
    const { name, symbol, enable_balance, balance } = this.state
    const coin_name = symbol ? coins.by_symbol[symbol].name : false

    return (
      <Modal open size="tiny" onClose={closeModal} closeOnEscape={false}>
        <Modal.Header>Track a New Investment</Modal.Header>
        <Modal.Content>
          <Modal.Description as="p">
            Monitor a group of transactions for a particular coin.
          </Modal.Description>
          <ModalInputContainer>
            <CoinDropdown
              onChange={this.setSymbol}
              placeholder="Select a Currency"
              coins={coins}
              value={symbol}
              {...props}
            />
            <Input
              fluid
              placeholder="Investment Name (Optional)"
              value={name}
              onChange={this.setName}
            />
            {symbol ? (
              <div>
                <Modal.Description as={ToggleLabel}>
                  Include Starting Balance?
                </Modal.Description>
                <ToggleSwitch
                  checked={enable_balance}
                  onChange={e =>
                    this.setState({ enable_balance: !enable_balance })
                  }
                />
                {enable_balance ? (
                  <ModalInputContainer>
                    <Input
                      label={symbol ? { content: symbol } : false}
                      labelPosition={symbol ? "right" : false}
                      placeholder="Starting Balance"
                      value={balance}
                      onChange={this.setBalance}
                    />
                    <div>
                      <Statistic horizontal size="mini">
                        <Statistic.Value>
                          ${formatNumberForDisplay(
                            round(
                              this.parseBalance(balance) *
                                parseFloat(coins.by_symbol[symbol].price_usd),
                              2
                            )
                          )}
                        </Statistic.Value>
                        <Statistic.Label>Value (USD)</Statistic.Label>
                      </Statistic>
                    </div>
                  </ModalInputContainer>
                ) : null}
              </div>
            ) : null}
          </ModalInputContainer>
        </Modal.Content>
        <Modal.Actions>
          <Cancel onClick={closeModal} />
          <Submit
            onClick={e =>
              createWallet({
                name: this.getWalletName(),
                symbol,
                transactions: this.parseBalance(balance)
                  ? [
                      {
                        time_recorded: moment(),
                        time_transacted: null,
                        quantity: this.parseBalance(balance),
                        type: RECEIVED,
                        cost_per_coin_usd: null,
                        fee: null,
                        notes: []
                      }
                    ]
                  : []
              }) &&
              closeModal() &&
              navigateTo(
                `/dashboard/investment?name=${encodeURIComponent(
                  this.getWalletName()
                )}`
              )
            }
            disabled={
              symbol === null ||
              //make sure the name's not already taken
              wallets.by_name[this.getWalletName()] !== undefined
            }
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
