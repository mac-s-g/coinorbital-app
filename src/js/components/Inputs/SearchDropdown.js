import React from "react"
import { Dropdown } from "semantic-ui-react"

export default props => (
  <Dropdown
    placeholder={props.placeholder}
    fluid
    search
    selection
    options={props.options}
    onChange={(e, value) => {
      props.onChange(value.value)
    }}
  />
)