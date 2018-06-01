import React from "react"

import ContentComponent from "./../ContentComponent"

export default ({ walletName }) => (
  <ContentComponent
    header="Investment Not Found"
    subHeader={
      walletName
        ? `There's no investment named "${walletName}"`
        : "Make sure the url includes the name of your investment"
    }
  />
)
