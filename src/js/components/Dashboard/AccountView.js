import React from "react"
import ContentContainer from "./ContentContainer"

export default props => (
  <ContentContainer header="Account View">
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </ContentContainer>
)
