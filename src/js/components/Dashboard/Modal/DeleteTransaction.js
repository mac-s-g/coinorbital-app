import React from "react"
import { Icon, Modal } from "semantic-ui-react"
import Delete from "./../../Buttons/Delete"
import Cancel from "./../../Buttons/Cancel"

export default ({ closeModal, modals, editWallet, ...props }) => {
  const { wallet, transaction_id } = modals.delete_transaction
  return (
    <Modal open size="tiny" onClose={closeModal}>
      <Modal.Header>Delete Transaction</Modal.Header>
      <Modal.Content>
        <Modal.Description as="p">
          Are you sure you want to delete this transaction?
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Cancel onClick={closeModal} />
        <Delete
          onClick={e => {
            wallet.transactions.splice(transaction_id, 1)
            editWallet(wallet.name, wallet)
            closeModal()
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}
