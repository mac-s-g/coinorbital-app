import React from "react"
import { Dropdown } from "semantic-ui-react"

export default props => (
  <Dropdown
    placeholder={props.placeholder}
    fluid
    search
    selection
    loading={props.loading}
    options={props.options}
    onChange={(e, value) => {
      props.onChange(value.value)
    }}
  />
)
