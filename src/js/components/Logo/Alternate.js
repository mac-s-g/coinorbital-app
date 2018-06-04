import React from "react"

import Logo from "./Logo"

import { theme } from "./../../constants"

export default ({
  primaryColor = theme.colors.inverted,
  backgroundColor = theme.colors.well_gray,
  ...props
}) => (
  <Logo
    primaryColor={primaryColor}
    backgroundColor={backgroundColor}
    {...props}
  />
)
