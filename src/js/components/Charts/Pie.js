import React, { Component } from "react"
import PropTypes from "prop-types"
import { Cell, Legend, PieChart, Pie, Tooltip } from "recharts"
import { theme } from "./../../constants"

export default class extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    animate: PropTypes.bool,
    outerRadius: PropTypes.number,
    labelLine: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
      })
    ).isRequired
  }

  defaultWidth = 300
  defaultHeight = 300
  defaultFill = theme.colors.gold
  defaultOuterRadius = 100
  defaultAnimationDuration = 1000
  defaultLabelLine = false
  defaultLegendType = "circle"

  getWidth = val => (!!val ? val : this.defaultWidth)
  getChartWidth = (width, legend) => {
    const total_width = !!width ? width : this.defaultWidth
    const legend_width = legend && legend.width ? legend.width : 0
    return total_width - legend_width
  }
  getHeight = val => (!!val ? val : this.defaultHeight)
  getFill = val => (!!val ? val : this.defaultFill)
  getOuterRadius = val => (!!val ? val : this.defaultOuterRadius)
  getLabelLine = val => (!!val ? val : this.defaultLabelLine)

  render() {
    const {
      data,
      width,
      height,
      animate,
      fill,
      outerRadius,
      legend,
      tooltip,
      labelLine,
      ...rest
    } = this.props

    return (
      <PieChart width={this.getWidth(width)} height={this.getHeight(height)}>
        <Pie
          data={data}
          dataKey="value"
          cy={this.getHeight(height) / 2}
          cx={this.getChartWidth(width, legend) / 2}
          isAnimationActive={!!animate}
          animationDuration={this.defaultAnimationDuration}
          fill={this.getFill(fill)}
          outerRadius={this.getOuterRadius(outerRadius)}
          labelLine={this.getLabelLine(labelLine)}
          legendType={this.defaultLegendType}
          {...rest}
        />
        {!!tooltip ? <Tooltip /> : null}
        {!!legend ? <Legend {...legend} /> : null}
      </PieChart>
    )
  }
}
