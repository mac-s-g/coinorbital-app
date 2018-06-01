import React from "react"
import { Icon } from "semantic-ui-react"
import Styled from "styled-components"

import HeartBeat from "./../../Animations/HeartBeat"

import { theme } from "./../../../constants"

const DemoItem = Styled.div``

const DemoDashIndicator = Styled.div`
  position:fixed;
  bottom: 1.33em;
  right: 1.33em;
  background-color: ${theme.colors.red};
  color: ${theme.colors.white};
  padding: 0.5em 1em;
  border-radius: 3px;
  cursor: pointer;
  animation: ${HeartBeat} 2.4s infinite linear;
  z-index: 100000;
  text-align: center;
  box-shadow: 0px 2px 3px ${theme.colors.gray};
`

export default ({ requestDemoDash }) => (
  <DemoItem>
    <DemoDashIndicator onClick={e => requestDemoDash()}>
      You're in <strong>Demo Mode</strong>
    </DemoDashIndicator>
  </DemoItem>
)
