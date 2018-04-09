import React from "react"

import { theme } from "./../../constants"

export default ({ inverted, ...props }) => (
  <span {...props}>
    <strong style={{ color: theme.colors.gold }}>Coin</strong>
    <i style={{ color: inverted ? theme.colors.white : theme.colors.black }}>
      Orbital
    </i>
  </span>
)
