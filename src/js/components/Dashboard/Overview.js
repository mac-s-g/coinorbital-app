import React from "react"
import ContentContainer from "./ContentContainer"

export default props => (
  <ContentContainer
    header="Overview"
    subHeader="Manage your assets at a glance."
  >
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </ContentContainer>
)
