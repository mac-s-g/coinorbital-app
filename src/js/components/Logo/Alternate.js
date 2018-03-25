import React from "react"

import LogoSvgAlt from "./../../../images/logo-alt.svg"

import { theme } from "./../../constants"

export default ({ size, ...props }) => (
  <img
    {...props}
    src={LogoSvgAlt}
    style={{ width: `${size}px`, height: `${size}px` }}
  />
)
