import React, { Component } from "react"
import ChartistGraph from "react-chartist"
import ChartistLegend from "chartist-plugin-legend"
import Styled from "styled-components"
import round from "./../../helpers/round"
import formatNumberForDisplay from "./../../helpers/formatNumberForDisplay"
import { theme } from "./../../constants"

const DonutComponent = Styled.div`
  & .ct-chart {
    position: relative;
    margin-bottom: 15px;
  }
  & .ct-chart-donut .ct-series-a .ct-slice-donut-solid {
    fill: ${props => props.themeColors.blue};
  }
  .ct-chart-donut .ct-series-b .ct-slice-donut-solid {
    fill: #E1E9EB;
  }
  & .ct-chart-donut .ct-label {
    fill: #333;
    color: #333;
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
    color: rgba(0, 0, 0, 0.5);
    display: inline-block;
    font-size: 1.2rem;
    list-style: none;
    margin: 0;
    margin-bottom: 20px;
  }
  & .ct-legend li:hover {
    color: rgba(0, 0, 0, 0.85);
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
    const { data, totalValue, value } = this.props
    let options = {
      width: "300px",
      height: "300px",
      total: 100,
      donut: true,
      donutWidth: 10,
      donutSolid: true,
      plugins: [ChartistLegend()]
    }
    options.total = totalValue
    options.labelInterpolationFnc = val => {
      return (
        "$" +
        formatNumberForDisplay(round(value), 2) +
        " / $" +
        formatNumberForDisplay(round(totalValue), 2)
      )
    }
    options.labelInterpolationFnc = val => {
      return (
        "$" +
        formatNumberForDisplay(round(value), 2) +
        " / $" +
        formatNumberForDisplay(round(totalValue), 2)
      )
    }

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
      <DonutComponent themeColors={theme.colors}>
        {this.buildChart()}
      </DonutComponent>
    )
  }
}
