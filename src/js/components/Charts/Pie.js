import React, { Component } from "react"
import PropTypes from "prop-types"
import { Cell, Legend, PieChart, Pie, Tooltip } from "recharts"
import { theme } from "./../../constants"

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 300
const DEFAULT_FILL = theme.colors.gold
const DEFAULT_OUTER_RADIUS = 100
const DEFAULT_INNER_RADIUS = 0
const DEFAULT_PADDING_ANGLE = 0
const DEFAULT_ANIMATE = false
const DEFAULT_ANIMATION_DURATION = 1000
const DEFAULT_LABEL_LINE = false
const DEFAULT_LEGEND = {}
const DEFAULT_LEGEND_TYPE = "circle"
const DEFAULT_DATA = []

export default class extends Component {
  static defaultProps = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    animate: DEFAULT_ANIMATE,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    outerRadius: DEFAULT_OUTER_RADIUS,
    innerRadius: DEFAULT_INNER_RADIUS,
    paddingAngle: DEFAULT_PADDING_ANGLE,
    labelLine: DEFAULT_LABEL_LINE,
    legend: DEFAULT_LEGEND,
    legendType: DEFAULT_LEGEND_TYPE,
    data: DEFAULT_DATA
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    outerRadius: PropTypes.number,
    innerRadius: PropTypes.number,
    paddingAngle: PropTypes.number,
    labelLine: PropTypes.bool,
    legend: PropTypes.object,
    legendType: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
      })
    ).isRequired
  }

  getChartWidth = (total_width, legend) => {
    const legend_width = legend && legend.width ? legend.width : 0
    return total_width - legend_width
  }

  getOuterRadius = val => (!!val ? val : this.defaultOuterRadius)
  getLabelLine = val => (!!val ? val : this.defaultLabelLine)

  render() {
    const {
      data,
      width,
      height,
      animate,
      animationDuration,
      fill,
      outerRadius,
      innerRadius,
      paddingAngle,
      legend,
      legendType,
      tooltip,
      labelLine,
      ...rest
    } = this.props

    return (
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          cy={height / 2}
          cx={this.getChartWidth(width, legend) / 2}
          isAnimationActive={!!animate}
          animationDuration={animationDuration}
          fill={fill}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          labelLine={labelLine}
          legendType={legendType}
          paddingAngle={paddingAngle}
          {...rest}
        />
        {!!tooltip ? <Tooltip /> : null}
        {!!legend ? <Legend {...legend} /> : null}
      </PieChart>
    )
  }
}
