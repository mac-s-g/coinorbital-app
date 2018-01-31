import React from "react"
import { Button, Icon } from "semantic-ui-react"
import Styled from "styled-components"
import { lighten } from "polished"
import { theme } from "./../../constants"

const SubmitButton = Styled.div`
  &.ui.button {
    color: ${theme.colors.white} !important;
    background-color: ${lighten(0.1, theme.colors.inverted)} !important;

    & > i.icon {
      color: ${theme.colors.white} !important;
    }

    &:hover {
      color: ${theme.colors.white} !important;
      background-color: ${theme.colors.inverted} !important;
    }
  }
`

export default props => (
  <Button as={SubmitButton} {...props}>
    <Icon name="checkmark" /> Submit
  </Button>
)
