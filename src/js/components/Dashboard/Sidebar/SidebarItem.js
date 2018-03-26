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
  padding: 12px 26px 12px 36px;
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

    & i.logo-icon {
      opacity: 1 !important;
    }
    & i.add-tx-icon {
      opacity: 0.5 !important;
    }
  }
`

const ItemLabel = Styled.div`
  display: inline;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 2px 2px 2px 0;
`

const SidebarCaret = Styled.i`
  position: absolute;
  left: 10px;
  top: 12px;
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

const AddTransactionIcon = Styled.i`
  position: absolute;
  right: 0px;
  top: 13px;
  opacity: 0 !important;
  @media (max-width: 768px) {
    display: none !important;
  }
`

export default ({ icon, wallet, selected, label, ...props }) => (
  <SidebarButton {...props} selected={selected}>
    {!!wallet ? (
      <CoinLogo
        class="logo-icon"
        as={SidebarLogo}
        selected={selected}
        symbol={wallet.symbol}
      />
    ) : (
      <Icon
        as={SidebarCaret}
        class="logo-icon"
        selected={selected}
        name={!!icon ? icon : "angle right"}
      />
    )}
    <ItemLabel>{label}</ItemLabel>
    {/*create transaction modal has a dependency on coins*/}
    {!!wallet ? (
      <Icon
        class="add-tx-icon"
        as={AddTransactionIcon}
        selected={selected}
        name="circle plus"
        onClick={e => props.requestCreateTransaction(wallet)}
      />
    ) : null}
  </SidebarButton>
)
