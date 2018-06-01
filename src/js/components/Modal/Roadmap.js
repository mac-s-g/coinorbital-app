import React from "react"
import Styled from "styled-components"
import { Button, Header, List, Modal } from "semantic-ui-react"

import LogoName from "./../Logo/Name"
import Link from "./../Link"

const ListContainer = Styled.div`
  margin: 26px 0 10px 0;
`

export default ({ close, contactMe }) => (
  <Modal open size="tiny" onClose={close}>
    <Modal.Header>Product Roadmap</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">
        If you want to participate in building the <LogoName /> roadmap,{" "}
        <Link
          onClick={e => {
            close()
            contactMe()
          }}
        >
          contact me
        </Link>!
      </Modal.Description>
      <Modal.Description as="p">
        Roadmap development pace depends on community support.
      </Modal.Description>
      <ListContainer>
        <Header as="h4" content="Roadmap:" />
        <List bulleted>
          <List.Item>
            Add line charts to wallet views displaying value over time
          </List.Item>
          <List.Item>
            Integrate with major exchanges
            <List bulleted>
              <List.Item>Support CSV transaction uploads</List.Item>
            </List>
          </List.Item>
          <List.Item>Audit and polish mobile experience</List.Item>
        </List>
      </ListContainer>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="thumbs up" onClick={close} />
    </Modal.Actions>
  </Modal>
)
