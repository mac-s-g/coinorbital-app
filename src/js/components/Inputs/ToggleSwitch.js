import React, { Component } from "react"
import Styled from "styled-components"
import { Checkbox } from "semantic-ui-react"

import { theme } from "./../../constants"

//TODO: move this into it's own input component
const ToggleSwitch = Styled.div`
  display: inline-block;
  & .ui.toggle.checkbox input ~ .box:before, .ui.toggle.checkbox input ~ label:before,
  .ui.toggle.checkbox .box:hover::before, .ui.toggle.checkbox label:hover::before,
  .ui.toggle.checkbox input:focus ~ .box:before, .ui.toggle.checkbox input:focus ~ label:before
   {
    background-color: #ddd !important;
  }

  display: inline-block;
  & .ui.toggle.checkbox input:checked ~ .box:before, .ui.toggle.checkbox input:checked ~ label:before,
  .ui.toggle.checkbox input:checked ~ .box:before, .ui.toggle.checkbox input:checked ~ label:before,
  .ui.toggle.checkbox input:focus:checked ~ .box:before, .ui.toggle.checkbox input:focus:checked ~ label:before
   {
    background-color: ${theme.colors.inverted} !important;
  }
`

export default ({ checked, onChange }) => (
  <ToggleSwitch>
    <Checkbox as="span" toggle checked={checked} onChange={onChange} />
  </ToggleSwitch>
)
