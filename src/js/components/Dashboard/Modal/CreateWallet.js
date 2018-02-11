import React, { Component } from "react"
import Styled from "styled-components"
import { Checkbox, Modal, Input, Statistic } from "semantic-ui-react"
import moment from "moment"

import Submit from "./../../Buttons/Submit"
import Cancel from "./../../Buttons/Cancel"
import CoinDropdown from "./../../Inputs/CoinDropdown"
import ToggleSwitch from "./../../Inputs/ToggleSwitch"

import round from "./../../../helpers/round"
import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"

import { theme } from "./../../../constants"

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

    return (
      <Modal open size="tiny" onClose={closeModal}>
        <Modal.Header>Track a New Wallet</Modal.Header>
        <Modal.Content>
          <Modal.Description as="p">
            A wallet lets you group transactions for a particular coin.
          </Modal.Description>
          <ModalInputContainer>
            <Input
              fluid
              placeholder="Wallet Name"
              value={name}
              onChange={this.setName}
            />
            <CoinDropdown
              onChange={this.setSymbol}
              placeholder="Select a Currency"
              coins={coins}
              value={symbol}
              {...props}
            />
            {symbol ? (
              <div>
                <Modal.Description as={ToggleLabel}>
                  Include Starting Balance?
                </Modal.Description>
                <ToggleSwitch
                  checked={enable_balance}
                  onChange={e =>
                    this.setState({ enable_balance: !enable_balance })}
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
                        <Statistic.Label>USD</Statistic.Label>
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
                name: name.trim(),
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
                `/dashboard/wallet?name=${encodeURIComponent(name.trim())}`
              )}
            disabled={
              symbol === null ||
              name.trim() === "" ||
              //make sure the name's not already taken
              wallets.by_name[name.trim()] !== undefined
            }
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
