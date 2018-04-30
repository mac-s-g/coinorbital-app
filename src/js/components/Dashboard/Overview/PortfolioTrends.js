import React, { Component } from "react"
import PropTypes from "prop-types"
import Styled from "styled-components"

import ValueLineChart from "./../../Charts/ValueLineChart"

import { theme } from "./../../../constants"

const LineChartComponent = Styled.div`
  margin: 3em 0 2em 0;
  height: 300px;
`

export default ({ coins, wallets, fetchTimeSeries }) => (
  <LineChartComponent>
    <ValueLineChart
      wallets={wallets}
      coins={coins}
      fetchTimeSeries={fetchTimeSeries}
      responsive
      displayYAxis={false}
    />
  </LineChartComponent>
)
