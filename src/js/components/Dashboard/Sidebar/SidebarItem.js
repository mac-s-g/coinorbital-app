import React from "react"
import Styled from "styled-components"
import { Icon } from "semantic-ui-react"
import { rgba } from "polished"

import CoinLogo from "./../../CoinLogo/"

import { theme } from "./../../../constants"

const SidebarButton = Styled.div`
  font-weight: ${({ actionItem }) => (actionItem ? 300 : 600)};
  color: ${({ actionItem }) => (actionItem ? theme.colors.blue : "#444")};
  position: relative;
  padding: 12px 12px 12px 36px;
  cursor: pointer;
  transition: all 0s ease;
  font-size: 16px;
  overflow:hidden;
  text-overflow: ellipsis;

  ${({ selected }) =>
    selected
      ? `
    background-color: ${rgba(theme.colors.blue, 0.2)};
    border-right: 4px solid ${theme.colors.blue};
  `
      : `
    border-right: 4px solid rgba(0,0,0,0);
      `}

  &:first-child {
    margin: 0.33em 0 0 0;
  }

  &:hover {
    background-color: ${rgba(theme.colors.blue, 0.5)};

    & > div {
      color: white;
    }

    & i.icon, i.image {
      opacity: 1 !important;
    }
  }
`

const ItemLabel = Styled.div`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 2px 6px 2px 0;
`

const SidebarCaret = Styled.i`
  position: absolute;
  left: 10px;
  top: 14px;
  width: 0 !important;
  opacity: ${({ selected }) => (selected ? 1 : 0)} !important;
  color: ${theme.colors.blue};
`

const SidebarLogo = Styled.i`
  position: absolute !important;
  top: 14px;
  left: 8px;
  height: 19px !important;
  width: 19px !important;
  opacity: ${({ selected }) => (selected ? 1 : 0)};
`

export default ({ icon, coinLogo, selected, label, subLabel, ...props }) => (
  <SidebarButton {...props} selected={selected}>
    {!!coinLogo ? (
      <CoinLogo as={SidebarLogo} selected={selected} symbol={coinLogo} />
    ) : (
      <Icon
        as={SidebarCaret}
        selected={selected}
        name={!!icon ? icon : "angle right"}
      />
    )}
    <ItemLabel>{label}</ItemLabel>
  </SidebarButton>
)
