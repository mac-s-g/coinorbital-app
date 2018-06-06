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
        <LogoName /> Demo Mode is here so you can explore the dashboard and
        tools with fake data.
      </Modal.Description>
      <Modal.Description as="p">
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
        If you like the tools,{" "}
        <Link onClick={e => login()}>get started with a free account</Link> or{" "}
        <Link onClick={e => login()}>login</Link> with <Icon name="google" />or{" "}
        <Icon name="facebook" />!
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="thumbs up" onClick={close} />
    </Modal.Actions>
  </Modal>
)
