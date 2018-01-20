import React, { Component } from "react"
import { Button, Container, Dimmer, Loader, Modal } from "semantic-ui-react"

export default class extends Component {
  componentWillMount() {
    const { fetchCoins, coins } = this.props
    if (!coins.fetching_coins && !coins.list.length) {
      fetchCoins()
    }
  }
  render() {
    const { closeModal, coins, modals } = this.props
    const coin = coins.by_symbol[modals.coin_info]
    return coin ? (
      <Modal open size="tiny" onClose={closeModal}>
        <Modal.Header>{coin ? coin.name : null}</Modal.Header>
        <Modal.Content>
          <pre>{JSON.stringify(coin, null, 2)}</pre>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="thumbs up"
            onClick={() => {
              closeModal()
            }}
          />
        </Modal.Actions>
      </Modal>
    ) : (
      <Dimmer active page>
        <Loader active />
      </Dimmer>
    )
  }
}
