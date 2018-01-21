import React from "react"
import Styled from "styled-components"
import { Icon } from "semantic-ui-react"
import { rgba } from "polished"

import { theme } from "./../../../constants"

const SidebarButton = Styled.div`
  font-style: ${({ actionItem }) => (actionItem ? "italic" : "normal")};
  color: ${({ actionItem }) => (actionItem ? theme.colors.inverted : "#444")};
  position: relative;
  padding: 11px 32px;
  cursor: pointer;
  transition: all 0s ease;
  font-weight: 600;
  border-radius: 0 3px 3px 0;
  font-size: 16px;
  ${({ selected }) =>
    selected
      ? `
    background-color: ${rgba(theme.colors.inverted, 0.2)};
  `
      : ""}

  &:first-child {
    margin: 0.33em 0 0 0;
  }

  &:hover {
    background-color: ${rgba(theme.colors.inverted, 0.5)};
    color: white;

    & i.icon {
      opacity: ${({ actionItem }) => (actionItem ? 0 : 1)} !important;
    }
  }
`

const SidebarCaret = Styled.i`
  position: absolute;
  left: 10px;
  width: 0 !important;
  opacity: ${({ selected }) => (selected ? 1 : 0)} !important;
  color: ${theme.colors.inverted};
`

export default props => (
  <SidebarButton {...props} selected={props.selected}>
    <Icon as={SidebarCaret} selected={props.selected} name="angle right" />
    {props.label}
  </SidebarButton>
)
