import React from "react"
import { Button, Icon } from "semantic-ui-react"
import Styled from "styled-components"
import { darken } from "polished"
import { theme } from "./../../constants"

const CustomButton = Styled.div`
  &.ui.button {
    color: ${theme.colors.white} !important;
    background-color: ${({ bColor }) => bColor} !important;

    & > i.icon {
      color: ${theme.colors.white} !important;
    }

    &:hover {
      color: ${theme.colors.white} !important;
      background-color: ${({ bColor }) => darken(0.1, bColor)} !important;
    }
  }
`

export default ({ icon, label, color, ...props }) => (
  <Button as={CustomButton} bColor={color} {...props}>
    {icon ? (
      <span>
        <Icon name={icon} /> {label}
      </span>
    ) : (
      label
    )}
  </Button>
)
