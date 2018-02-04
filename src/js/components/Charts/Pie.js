import React, { Component } from "react"
import ChartistGraph from "react-chartist"
import Styled from "styled-components"
import { theme } from "./../../constants"
import ChartistLegend from "chartist-plugin-legend"

const PieContainer = Styled.div`
  & .ct-series-a .ct-slice-pie {
    fill: ${props => props.themeColors.blue};
  }
  & .ct-series-b .ct-slice-pie {
    fill: ${props => props.themeColors.red};
  }
  & .ct-series-c .ct-slice-pie {
    fill: ${props => props.themeColors.green};
  }
  & .ct-series-d .ct-slice-pie {
    fill: ${props => props.themeColors.gold};
  }
  & .ct-label {
    fill: ${props => props.themeColors.white};
    color: ${props => props.themeColors.white};
    font-size: 1.15rem;
  }
  & .ct-chart {
    position: relative;
    width: 430px;
    float: left;
    @media (max-width: 500px) {
      width: auto;
    }
  }
  & .ct-legend {
    padding: 0;
    float: right;
    @media (max-width: 500px) {
      padding: 0;
      float: left;
    }
  }
  & .ct-legend li {
    color: ${props => props.themeColors.grey_dark};
    position: relative;
    padding-left: 16px;
    margin-bottom: 3px;
    margin-right: 18px;
    list-style: none;
    cursor: pointer;
    @media (max-width: 500px) {
      display: inline-block;
      float: left;
    }
  }
  & .ct-legend li.inactive {
    opacity: .6;
  }
  & .ct-legend li:before {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 4px;
    left: 0;
    content: '';
    border: 3px solid transparent;
    border-radius: 2px;
  }
  & .ct-legend li:before {
    background: ${props => props.themeColors.grey_dark};
  }
  & .ct-legend .ct-series-0:before {
    background: ${props => props.themeColors.blue};
  }
  & .ct-legend .ct-series-1:before {
    background: ${props => props.themeColors.red};
  }
  & .ct-legend .ct-series-2:before {
    background: ${props => props.themeColors.green};
  }
  & .ct-legend .ct-series-3:before {
    background: ${props => props.themeColors.gold};
  }
`

export default class extends Component {
  buildChart = () => {
    const { data, options, responsiveOptions } = this.props
    if (options.showLegend) {
      options.plugins = [ChartistLegend()]
    }
    return (
      <ChartistGraph
        data={data}
        type={"Pie"}
        options={options}
        responsiveOptions={responsiveOptions}
      />
    )
  }

  render() {
    return (
      <PieContainer themeColors={theme.colors}>
        {this.buildChart()}
      </PieContainer>
    )
  }
}
