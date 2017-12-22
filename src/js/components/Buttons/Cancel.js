import React from "react"
import { Button, Icon } from "semantic-ui-react"
import Styled from "styled-components"
import { theme } from "./../../constants"

const SubmitButton = Styled.div`
  &.ui.basic.button {
    color: ${theme.colors.red} !important;
    border: 1px solid ${theme.colors.red} !important;
    box-shadow: none !important;

    &:hover {
      color: ${theme.colors.red} !important;
      border: 1px solid ${theme.colors.red} !important;
    }
  }
`

export default props => (
  <Button as={SubmitButton} basic {...props}>
    <Icon name="remove" /> Cancel
  </Button>
)
