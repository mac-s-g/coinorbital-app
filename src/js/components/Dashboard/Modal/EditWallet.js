import React from "react"
import { Modal } from "semantic-ui-react"
import Submit from "./../../Buttons/Submit"
import Cancel from "./../../Buttons/Cancel"

export default ({ closeModal, editWallet, ...props }) => (
  <Modal open size="tiny" onClose={closeModal}>
    <Modal.Header>Edit your Wallet</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">edit wallet</Modal.Description>
      <Modal.Description as="p">i don't do anything yet</Modal.Description>
      <Modal.Description as="p">
        you'll be able to update name and delete wallet here
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Cancel onClick={closeModal} />
      <Submit onClick={closeModal} />
    </Modal.Actions>
  </Modal>
)
