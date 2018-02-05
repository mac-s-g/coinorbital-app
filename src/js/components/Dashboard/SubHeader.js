import React from "react"
import Styled from "styled-components"

import { theme } from "./../../constants"

const SubHeader = Styled.div`
  font-weight: 300;
  font-size: 1.28571429em;
  color: ${theme.colors.gray_dark};
  display: block;
  height: 32px;
  margin: 0 0.33em 0.33em 0;
  padding-top: 6px;
`

export default props => <SubHeader {...props} />
