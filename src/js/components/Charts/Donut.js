import React, { Component } from "react"
import ChartistGraph from "react-chartist"
import Styled from "styled-components"
import { theme } from "./../../constants"

const DonutContainer = Styled.div`
  & .ct-chart {
    position: relative;
    margin-bottom: 15px;
  }
  & .ct-chart-donut .ct-series-a .ct-slice-donut-solid {
    fill: ${props => props.themeColors.blue};
  }
  .ct-chart-donut .ct-series-b .ct-slice-donut-solid {
    fill: ${props => props.themeColors.gray};
  }
  & .ct-chart-donut .ct-label {
    fill: ${props => props.themeColors.grey_dark};
    color: ${props => props.themeColors.grey_dark};
    font-size: 1.4rem;
    dominant-baseline: central;
    text-anchor: middle;
  }
  & .ct-legend {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
  }
  & .ct-legend li {
    color: ${props => props.themeColors.grey_dark};
    display: inline-block;
    font-size: 1.2rem;
    list-style: none;
    margin: 0;
    margin-bottom: 20px;
  }
  & .ct-legend li.inactive {
    opacity: .6;
  }
`

const centerChartLabel = {
  draw(context) {
    if (context.type === "label") {
      context.element.attr({
        dx: context.element.root().width() / 2,
        dy: context.element.root().height() / 2
      })
    }
  }
}

export default class extends Component {
  buildChart = () => {
    const { data, options } = this.props
    return (
      <ChartistGraph
        data={data}
        type={"Pie"}
        options={options}
        listener={centerChartLabel}
      />
    )
  }

  render() {
    return (
      <DonutContainer themeColors={theme.colors}>
        {this.buildChart()}
      </DonutContainer>
    )
  }
}
