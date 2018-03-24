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
  Legend
} from "recharts"

import round from "./../../helpers/round"

import { theme } from "./../../constants"

const DEFAULT_WIDTH = 730
const DEFAULT_HEIGHT = 250

export default class extends Component {
  static defaultProps = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    animate: false,
    tooltip: false,
    legend: false,
    grid: false,
    data: [],
    lines: [],
    dataKeyX: "name",
    dataKeyY: null,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    orientationY: "right"
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    animate: PropTypes.bool,
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

  render() {
    const {
      width,
      height,
      animate,
      tooltip,
      grid,
      legend,
      data,
      lines,
      dataKeyX,
      dataKeyY,
      margin,
      orientationY,
      children
    } = this.props

    return (
      <ComposedChart
        width={width}
        height={height}
        data={data}
        margin={margin}
        animate={animate}
      >
        {grid ? <CartesianGrid /> : null}
        <XAxis dataKey={dataKeyX} />
        <YAxis
          dataKey={dataKeyY}
          orientation={orientationY}
          domain={[
            dataMin =>
              dataMin > 1
                ? Math.floor(dataMin * 0.95)
                : round(dataMin * 0.95, 3),
            dataMax =>
              dataMax > 10
                ? Math.ceil(dataMax * 1.05)
                : round(dataMax * 1.05, 3)
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
  }
}
