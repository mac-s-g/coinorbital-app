import React, { Component } from "react"
import { Button, Icon, Input, Modal } from "semantic-ui-react"
import Submit from "./../../Buttons/Submit"
import Cancel from "./../../Buttons/Cancel"

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

  render() {
    const { closeModal, createTransaction } = this.props
    return (
      <Modal open size="tiny" onClose={closeModal}>
        <Modal.Header>Record a Transaction</Modal.Header>
        <Modal.Content />
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
