import React from "react"
import { Dropdown } from "semantic-ui-react"

export default ({
  value,
  placeholder,
  multiple,
  loading,
  options,
  onChange
}) => (
  <Dropdown
    value={value ? value : null}
    placeholder={placeholder}
    fluid
    multiple={multiple}
    search
    selection
    loading={loading}
    options={options}
    onChange={(e, value) => {
      onChange(value.value)
    }}
  />
)
