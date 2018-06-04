import React from "react"

import Logo from "./Logo"

import { theme } from "./../../constants"

export default ({
  primaryColor = theme.colors.gold,
  backgroundColor = theme.colors.inverted,
  ...props
}) => (
  <Logo
    primaryColor={primaryColor}
    backgroundColor={backgroundColor}
    {...props}
  />
)
