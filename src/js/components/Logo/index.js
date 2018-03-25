import React from "react"

import LogoSvg from "./../../../images/logo.svg"

import { theme } from "./../../constants"

export default ({ size, ...props }) => (
  <img
    {...props}
    src={LogoSvg}
    style={{ width: `${size}px`, height: `${size}px` }}
  />
)
