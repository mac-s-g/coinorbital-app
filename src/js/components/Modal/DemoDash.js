import React from "react"
import Styled from "styled-components"
import { Button, Icon, Modal } from "semantic-ui-react"

import LogoName from "./../Logo/Name"
import Link from "./../Link"

export default ({ close, login, contactMe }) => (
  <Modal open size="tiny" onClose={close}>
    <Modal.Header>You're using the Demo Dashboard</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">
        The <LogoName /> demo dashboard is here so you can play around.{" "}
        <Link
          onClick={e => {
            close()
            contactMe()
          }}
        >
          Feedback
        </Link>{" "}
        is welcome!
      </Modal.Description>
      <Modal.Description as="p">
        If you like the demo dashboard,{" "}
        <Link onClick={e => login()}>create a free account or login</Link> with{" "}
        <Icon name="google" />or <Icon name="facebook" />!
      </Modal.Description>
      <br />
      <Modal.Description as="p">
        <i>
          Note: Demo mode uses your browser's local storage. You won't be able
          to share this data across devices.
        </i>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="thumbs up" onClick={close} />
    </Modal.Actions>
  </Modal>
)
