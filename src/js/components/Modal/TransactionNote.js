import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Feed, Form, Header, Icon, Modal } from "semantic-ui-react"
import moment from "moment"

import Submit from "./../Buttons/Submit"
import Cancel from "./../Buttons/Cancel"
import InputLabel from "./../Inputs/InputLabel"

import formatDateForDisplay from "./../../helpers/formatDateForDisplay"

import { theme } from "./../../constants"

const ModalInputContainer = Styled.div`
  & > * {margin-bottom: 12px;}
`

const FormComponent = Styled.div`
  position: relative
`

const SubmitComponent = Styled.div`
  position: absolute;
  right: 0px;
  top: 28px;
  cursor: pointer;
`

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      add_note: false,
      note_text: ""
    }
  }

  toggleAddNote = () => this.setState({ add_note: !this.state.add_note })

  setNote = (event, { value }) => this.setState({ note_text: value })

  render() {
    const { closeModal, editWallet, modals } = this.props
    const { wallet, transaction_id } = modals.transaction_note
    const transaction = wallet.transactions[transaction_id]
    const { notes } = transaction
    const { add_note, note_text } = this.state

    return (
      <Modal open size="tiny" onClose={closeModal} closeOnEscape={false}>
        <Modal.Header>Transaction Notes</Modal.Header>
        <Modal.Content>
          <ModalInputContainer>
            <Modal.Description as="p" content="smart people take notes" />
            <Feed>
              {notes.map((note, idx) => (
                <Feed.Event key={idx}>
                  <Feed.Label>
                    <Icon name="user circle outline" />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Date>{moment(note.date_created).fromNow()}</Feed.Date>
                    <Feed.Summary>
                      {note.text
                        .split(/(\n)/g)
                        .map((line, idx) => <div key={idx}>{line}</div>)}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              ))}
            </Feed>
            {add_note ? (
              <FormComponent>
                <InputLabel align="right">
                  {formatDateForDisplay(moment())}
                </InputLabel>
                <Form>
                  <Form.TextArea
                    placeholder="write a note"
                    value={note_text}
                    onChange={this.setNote}
                  />
                </Form>
                {!!note_text.trim().length ? (
                  <SubmitComponent>
                    <Icon
                      size="big"
                      name="checkmark box"
                      style={{ color: theme.colors.green }}
                      onClick={e => {
                        transaction.notes.push({
                          date_created: moment(),
                          text: note_text
                        })
                        editWallet(wallet.name, {
                          ...wallet
                        })
                        this.setState({
                          add_note: false,
                          note_text: ""
                        })
                      }}
                    />
                  </SubmitComponent>
                ) : null}
              </FormComponent>
            ) : (
              <Button onClick={e => this.toggleAddNote()}>Add a Note</Button>
            )}
          </ModalInputContainer>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
