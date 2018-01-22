import React from "react"
import { Icon, Image } from "semantic-ui-react"
import * as svgs from "./CoinLogos"

export default ({ symbol, ...props }) =>
  svgs[symbol.toLowerCase()] ? (
    <Image src={svgs[symbol.toLowerCase()]} {...props} />
  ) : (
    <Icon name="image" size="big" color="grey" {...props} />
  )
