import React, { Component } from "react"
import { Button, Icon, Input, Modal } from "semantic-ui-react"
import Submit from "./../../Buttons/Submit"
import Cancel from "./../../Buttons/Cancel"
import SearchDropdown from "./../../Inputs/SearchDropdown"
import formatCoinOptions from "./../../../helpers/formatCoinOptions"

const changeCoin = val => {
  console.log('val')
  console.log(val)
}

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { ...this.defaults }
  }

  defaults = {
    amount: 0,
    price: 0,
    currency: null
  }

  componentDidMount() {
    const { coins, fetchCoins } = this.props
    if (!coins.list.length) {
      fetchCoins()
    }
  }

  render() {
    const { closeModal, createTransaction, coins } = this.props
    const coins_by_symbol = { ...coins.by_symbol }
    return (
      <Modal open size="tiny" onClose={closeModal}>
        <Modal.Header>Record a Transaction</Modal.Header>
        <Modal.Content>
          <SearchDropdown
            placeholder="Search Currencies"
            options={formatCoinOptions(coins_by_symbol)}
            onChange={changeCoin}
          />
        </Modal.Content>
        <Modal.Actions>
          <Cancel onClick={closeModal} />
          <Submit
            onClick={e => createTransaction(this.state) && closeModal()}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
