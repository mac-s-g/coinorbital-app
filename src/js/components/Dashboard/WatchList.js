import React from "react"
import ContentComponent from "./ContentComponent"

export default props => (
  <ContentComponent
    header="Coin Watch List"
    subHeader="Keep track of the coins you're interested in."
  >
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </ContentComponent>
)
