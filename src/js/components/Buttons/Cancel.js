import React from "react"
import { Button, Icon } from "semantic-ui-react"
import Styled from "styled-components"
import { lighten } from "polished"
import { theme } from "./../../constants"

export default props => (
  <Button {...props}>
    <Icon name="remove" /> Cancel
  </Button>
)
