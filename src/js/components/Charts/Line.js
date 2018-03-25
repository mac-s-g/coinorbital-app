import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  LineChart,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

import round from "./../../helpers/round"

import { theme } from "./../../constants"

const DEFAULT_WIDTH = 730
const DEFAULT_HEIGHT = 250

export default class extends Component {
  static defaultProps = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    responsive: false,
    tooltip: false,
    legend: false,
    grid: false,
    data: [],
    lines: [],
    dataKeyX: "name",
    dataKeyY: null,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    orientationY: "right",
    displayXAxis: true,
    displayYAxis: true
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    grid: PropTypes.bool,
    //xaxis is name
    data: PropTypes.array.isRequired,
    //map data values to y axis for each line
    //example
    /*{
      type: "monotone",
      dataKey: "high",
      stroke: "#777",
      activeDot: {r: 8}
    }*/
    //see: http://recharts.org/#/en-US/api/Line
    lines: PropTypes.array.isRequired,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),
    orientationY: PropTypes.string
  }

  buildChart = ({
    width,
    height,
    responsive,
    tooltip,
    grid,
    legend,
    data,
    lines,
    dataKeyX,
    dataKeyY,
    margin,
    orientationY,
    displayXAxis,
    displayYAxis,
    children
  }) => (
    <ComposedChart
      data={data}
      margin={margin}
      width={responsive ? null : width}
      height={responsive ? null : height}
    >
      {grid ? <CartesianGrid /> : null}
      {displayXAxis ? <XAxis dataKey={dataKeyX} /> : null}
      <YAxis
        dataKey={dataKeyY}
        orientation={orientationY}
        hide={!displayYAxis}
        domain={[
          dataMin =>
            dataMin > 1 ? Math.floor(dataMin * 0.95) : round(dataMin * 0.95, 3),
          dataMax =>
            dataMax > 10 ? Math.ceil(dataMax * 1.05) : round(dataMax * 1.05, 3)
        ]}
      />

      {!!tooltip ? (
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={tooltip !== true ? tooltip : null}
        />
      ) : null}
      {legend ? <Legend /> : null}
      {lines.map(line => <Area key={line.dataKey} {...line} />)}
      {children}
    </ComposedChart>
  )

  render() {
    const chart = this.buildChart(this.props)
    return this.props.responsive ? (
      <ResponsiveContainer width="100%" height="100%">
        {chart}
      </ResponsiveContainer>
    ) : (
      { chart }
    )
  }
}
