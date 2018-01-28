import React, { Component } from "react"
import Styled from "styled-components"
import { Header, Input, Modal } from "semantic-ui-react"

import Submit from "./../../Buttons/Submit"
import Cancel from "./../../Buttons/Cancel"
import InputLabel from "./../../Inputs/InputLabel"

const ModalInputContainer = Styled.div`
  & > * {margin-bottom: 12px;}
`

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.modals.edit_wallet.name
    }
  }

  setName = (event, { value }) => this.setState({ name: value })

  validName = name => {
    const cleaned = name.trim()
    const { by_name } = this.props.wallets
    const { edit_wallet } = this.props.modals
    return (
      !!cleaned.length && (!by_name[cleaned] || cleaned === edit_wallet.name)
    )
  }

  render() {
    const { closeModal, editWallet, modals, navigateTo } = this.props
    const { name } = this.state

    return (
      <Modal open size="tiny" onClose={closeModal}>
        <Modal.Header>Edit your Wallet</Modal.Header>
        <Modal.Content>
          <ModalInputContainer>
            <InputLabel>Wallet Name</InputLabel>
            <Input
              fluid
              placeholder="Wallet Name"
              value={name}
              onChange={this.setName}
            />
          </ModalInputContainer>
        </Modal.Content>
        <Modal.Actions>
          <Cancel onClick={closeModal} />
          <Submit
            disabled={!this.validName(name)}
            onClick={e => {
              editWallet(modals.edit_wallet.name, {
                name: name.trim()
              })
              closeModal()
              navigateTo(`/dashboard/wallet?name=${encodeURIComponent(name)}`)
            }}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
