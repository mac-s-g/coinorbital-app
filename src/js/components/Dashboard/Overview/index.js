import React from "react"
import ContentComponent from "./../ContentComponent"

export default props => (
  <ContentComponent
    header="Overview"
    subHeader="Manage your assets at a glance"
  >
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </ContentComponent>
)
