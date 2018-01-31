import React from "react"
import Styled from "styled-components"

import { theme } from "./../../constants"

const InputLabel = Styled.div`
  margin-bottom: 4px !important;
  font-size: 14px;
  color: ${theme.colors.gray_dark};
  font-size: 14px;
  text-align: ${props => (!!props.align ? props.align : "left")};
`

export default props => <InputLabel {...props} />
