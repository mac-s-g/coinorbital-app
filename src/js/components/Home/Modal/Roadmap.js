import React from "react"
import Styled from "styled-components"
import { Button, Header, List, Modal } from "semantic-ui-react"

import { project_info } from "./../../../constants"

const ListContainer = Styled.div`
  margin: 26px 0 10px 0;
`

const Link = Styled.a`
  cursor: pointer;
`

export default ({ close, contactMe }) => (
  <Modal open size="tiny" onClose={close}>
    <Modal.Header>Product Roadmap</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">
        If you want to participate in building the {project_info.name} roadmap,{" "}
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
          <List.Item>Allow users to backup transaction data</List.Item>
          <List.Item>
            Add line charts to wallet views displaying value over time
          </List.Item>
          <List.Item>
            Add a line chart to the overview page displaying portfolio value
            over time
          </List.Item>
          <List.Item>Display historical value for coins on watchlist</List.Item>
          <List.Item>
            Support login from multiple devices
            <List bulleted>
              <List.Item>
                Allow authentication via Google and Facebook
              </List.Item>
              <List.Item>Support remote data storage</List.Item>
            </List>
          </List.Item>
          <List.Item>Integrate with major exchanges</List.Item>
          <List.Item>Audit and polish mobile experience</List.Item>
        </List>
      </ListContainer>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="thumbs up" onClick={close} />
    </Modal.Actions>
  </Modal>
)
