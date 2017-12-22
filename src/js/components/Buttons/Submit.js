import React from "react"
import { Button, Icon } from "semantic-ui-react"
import Styled from "styled-components"
import { theme } from "./../../constants"

const SubmitButton = Styled.div`
  &.ui.basic.button {
    color: ${theme.colors.inverted} !important;
    border: 1px solid ${theme.colors.inverted} !important;
    box-shadow: none !important;

    &:hover {
      color: ${theme.colors.inverted} !important;
      border: 1px solid ${theme.colors.inverted} !important;
    }
  }
`

export default props => (
  <Button as={SubmitButton} basic {...props}>
    <Icon name="checkmark" /> Submit
  </Button>
)
