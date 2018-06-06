import React from "react"
import Styled from "styled-components"
import { lighten } from "polished"

import { theme } from "./../constants"

const Link = Styled.a`
  cursor: pointer;
  color: ${lighten(0.15, theme.colors.inverted)};
  &:hover {
    color: ${theme.colors.inverted};
  }
`

export default props => <Link {...props} />
