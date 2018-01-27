import React from "react"
import { Modal } from "semantic-ui-react"
import Submit from "./../../Buttons/Submit"
import Cancel from "./../../Buttons/Cancel"

export default ({ closeModal, createTransaction, ...props }) => (
  <Modal open size="tiny" onClose={closeModal}>
    <Modal.Header>Record a Transaction</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">create transaction</Modal.Description>
      <Modal.Description as="p">i don't do anything yet</Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Cancel onClick={closeModal} />
      <Submit onClick={closeModal} />
    </Modal.Actions>
  </Modal>
)
