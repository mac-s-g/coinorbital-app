import React from "react"
import { Icon, Modal } from "semantic-ui-react"
import Delete from "./../Buttons/Delete"
import Cancel from "./../Buttons/Cancel"

export default ({ closeModal, modals, deleteWallet, navigateTo, ...props }) => (
  <Modal open size="tiny" onClose={closeModal}>
    <Modal.Header>Delete Wallet</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">
        Are you sure you want to delete your "{modals.delete_wallet}" wallet?
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Cancel onClick={closeModal} />
      <Delete
        onClick={e => {
          navigateTo("/dashboard")
          deleteWallet(modals.delete_wallet)
          closeModal()
        }}
      />
    </Modal.Actions>
  </Modal>
)
