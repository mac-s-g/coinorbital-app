import React, { Component } from "react"
import ChartistGraph from "react-chartist"
import Styled from "styled-components"
import { theme } from "./../../constants"

const PieComponent = Styled.div`
  & .ct-chart-pie {
    margin-top: 30px;
  }
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
    fill: #fff;
    color: #fff;
    font-size: 1.15rem;
  }
  & .ct-chart {
    position: relative;
  }
  & .ct-legend {
    padding: 0;
  }
  & .ct-legend li {
    color: rgba(0, 0, 0, 0.6);
    position: relative;
    padding-left: 16px;
    margin-bottom: 3px;
    margin-right: 18px;
    list-style: none;
    display: block;
    float: left;
    cursor: pointer;
  }
  & .ct-legend li:hover {
    color: rgba(0, 0, 0, 0.85);
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
    background: #333;
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
      <PieComponent themeColors={theme.colors}>
        {this.buildChart()}
      </PieComponent>
    )
  }
}
