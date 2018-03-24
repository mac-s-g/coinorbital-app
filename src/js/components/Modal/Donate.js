import React from "react"
import Styled from "styled-components"
import { Button, Table, Modal, Image } from "semantic-ui-react"

import CoinLogo from "./../CoinLogo/"

import { project_info } from "./../../constants"

const DonationComponent = Styled.div`
  margin: 20px 0;
`

const AddressCell = Styled.td`
  font-size: 11px;
`

export default ({ close }) => (
  <Modal open size="tiny" onClose={close}>
    <Modal.Header>Send a Donation</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">
        {project_info.name} was written without funding and does not generate
        revenue outside of donations.
      </Modal.Description>
      <Modal.Description as="p">
        If you'd like to see this product improve, please consider supporting
        development with a donation.
      </Modal.Description>
      <DonationComponent>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={3}>
                Donation Addresses
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(project_info.donation).map(symbol => (
              <Table.Row key={symbol}>
                <Table.Cell>
                  <CoinLogo symbol={symbol} width="22px" height="22px" />
                </Table.Cell>
                <Table.Cell>{project_info.donation[symbol].name}</Table.Cell>
                <Table.Cell as={AddressCell}>
                  {project_info.donation[symbol].address}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </DonationComponent>
      <Modal.Description as="p">Thank you for contributing!</Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="thumbs up" onClick={close} />
    </Modal.Actions>
  </Modal>
)
