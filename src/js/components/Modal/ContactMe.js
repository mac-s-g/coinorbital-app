import React from "react"
import Styled from "styled-components"
import { Button, Header, Modal } from "semantic-ui-react"

import LogoName from "./../Logo/Name"

import { project_info, links } from "./../../constants"

const DonateLink = Styled.a`
  cursor: pointer;
`

export default ({ close, donate }) => (
  <Modal open size="tiny" onClose={close}>
    <Modal.Header>Contact Me</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">
        I value positive and negative feedback from users. Please send me an
        email if you have ideas about how <LogoName /> can improve.
      </Modal.Description>
      <Modal.Description as="p">
        If you have ideas about how to generate revenue or you're interested in
        contributing to the source code, please email me!
      </Modal.Description>
      <Header
        as="h3"
        content={project_info.author.name}
        subheader={`e: ${project_info.author.email}`}
        image={links.author_avatar}
      />
      <Modal.Description as="p">
        Additionally, consider supporting product development with a{" "}
        <DonateLink
          onClick={e => {
            close()
            donate()
          }}
        >
          donation
        </DonateLink>.
      </Modal.Description>
      <Modal.Description as="p">Thanks for your feedback!</Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="thumbs up" onClick={close} />
    </Modal.Actions>
  </Modal>
)
