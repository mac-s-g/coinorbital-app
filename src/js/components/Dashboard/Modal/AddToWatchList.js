import React from "react"
import { Modal } from "semantic-ui-react"
import Submit from "./../../Buttons/Submit"
import Cancel from "./../../Buttons/Cancel"
import CoinDropdown from "./../../Inputs/CoinDropdown"

const changeCoin = val => {
  console.log("val")
  console.log(val)
}

export default ({ closeModal, addToWatchList, ...props }) => (
  <Modal open size="tiny" onClose={closeModal}>
    <Modal.Header>Add to Watch List</Modal.Header>
    <Modal.Content>
      <CoinDropdown onChange={changeCoin} {...props} />
    </Modal.Content>
    <Modal.Actions>
      <Cancel onClick={closeModal} />
      <Submit
        onClick={() => {
          addToWatchList({ symbol: "btc" })
          closeModal()
        }}
      />
    </Modal.Actions>
  </Modal>
)
