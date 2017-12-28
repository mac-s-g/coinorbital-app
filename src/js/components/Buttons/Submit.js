import React from "react"
import { Button, Icon } from "semantic-ui-react"
import Styled from "styled-components"
import { lighten } from 'polished'
import { theme } from "./../../constants"

const SubmitButton = Styled.div`
  &.ui.basic.button {
    color: ${theme.colors.inverted} !important;
    border: 1px solid ${theme.colors.inverted} !important;
    box-shadow: none !important;

    & > i.icon {
      opacity: 1 !important;
    }

    &:hover {
      color: #fff !important;
      background-color: ${lighten(0.1, theme.colors.inverted)} !important;
      border: 1px solid ${theme.colors.inverted} !important;
    }
  }
`

export default props => (
  <Button as={SubmitButton} basic {...props}>
    <Icon name="checkmark" /> Submit
  </Button>
)
