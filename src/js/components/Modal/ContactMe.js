import React from "react"
import { Button, Header, Modal } from "semantic-ui-react"

import LogoName from "./../Logo/Name"
import Link from "./../Link"

import { project_info, links } from "./../../constants"

export default ({ close, donate }) => (
  <Modal open size="tiny" onClose={close}>
    <Modal.Header>Contact Me</Modal.Header>
    <Modal.Content>
      <Modal.Description as="p">
        I value positive and negative feedback from users. Send me an email if
        you have ideas to improve <LogoName />.
      </Modal.Description>
      <Modal.Description as="p">
        If you have ideas about how to generate revenue or you're interested in
        contributing to the source code, please email me!
      </Modal.Description>
      <Header
        as="h3"
        content={
          <Link target="_blank" href="https://github.com/mac-s-g/">
            {project_info.author.name}
          </Link>
        }
        subheader={`e: ${project_info.author.email}`}
        image={links.author_avatar}
      />
      <Modal.Description as="p">
        Additionally, consider supporting product development with a{" "}
        <Link
          onClick={e => {
            close()
            donate()
          }}
        >
          donation
        </Link>.
      </Modal.Description>
      <Modal.Description as="p">Thanks for your feedback!</Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="thumbs up" onClick={close} />
    </Modal.Actions>
  </Modal>
)
