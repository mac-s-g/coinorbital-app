import React from "react"

import ContentComponent from "./../ContentComponent"

export default ({ walletName }) => (
  <ContentComponent
    header="Wallet Not Found"
    subHeader={
      walletName
        ? `There's no wallet named "${walletName}"`
        : "Make sure the url includes the name of your wallet"
    }
  />
)
