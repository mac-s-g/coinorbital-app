import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Header, Icon, Loader, List } from "semantic-ui-react"
import Styled from "styled-components"
import moment from "moment"
import { ReferenceDot, ReferenceLine, Label } from "recharts"

import Line from "./Line"

import formatNumberForDisplay from "./../../helpers/formatNumberForDisplay"
import round from "./../../helpers/round"

import { theme } from "./../../constants"

const MS_PER_SECOND = 1000
const HISTO_AGGREGATE = 1
const HIST_EXPIRATION_MS = 1000 * 60 //60s

const DEFAULT_WIDTH = 700
const DEFAULT_HEIGHT = 300

//tx dot radius
const REFERENCE_DOT_RADIUS = 5

const LineChartComponent = Styled.div`
  height: ${props => (props.responsive ? "100%" : `${props.height}px`)};
  width: ${props => (props.responsive ? "100%" : `${props.width}px`)};
  position: relative;

  & .xAxis text.recharts-cartesian-axis-tick-value {
    font-size: 11px;
    transform: translate(0px, 4px);
  }

  & .loader {
    top: ${props => props.height / 3}px !important;
  }
`

const ChartControls = Styled.div`
  position: absolute;
  top: -24px;
  left: 0px;
  z-index: 1000;
`

const ToolTipComponent = Styled.div`
  padding: 4px 7px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: 3px;
`

const ToolTipSubHeader = Styled.div`
  font-size: 10px;
  color: ${theme.colors.gray};
`

const ToolTipLabel = Styled.span`
  color: ${theme.colors.dark_gray};
`

const ToolTipValue = Styled.span`
  color: ${theme.colors.blue};
`

export default class extends Component {
  static defaultProps = {
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    responsive: false,
    color: theme.colors.blue,
    orientationY: "right"
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    responsive: PropTypes.bool,
    coins: PropTypes.object.isRequired,
    symbol: PropTypes.string.isRequired,
    fetchTimeSeries: PropTypes.func.isRequired,
    color: PropTypes.string,
    orientationY: PropTypes.string
  }

  state = {
    chartType: "week"
  }

  chartTypes = {
    year: {
      type: "day",
      limit: 365,
      aggregate: 1
    },
    month: {
      type: "hour",
      limit: 24 * 30 / 4,
      aggregate: 4
    },
    week: {
      type: "hour",
      limit: 24 * 7
    },
    day: {
      type: "minute",
      limit: 60 * 24 / 10,
      aggregate: 10
    }
  }

  constructor(props) {
    super(props)
    this.init(props, props.chartType ? props.chartType : this.state.chartType)
  }

  init = (props, chartType = "week") => {
    this.state.chartType = chartType
    this.tsFilter = {
      symbol: props.symbol,
      aggregate: HISTO_AGGREGATE,
      ...this.chartTypes[chartType]
    }
    this.tsFilterKey = JSON.stringify(this.tsFilter)
    this.fetchTime = Date.now()
    props.fetchTimeSeries(this.tsFilter, this.tsFilterKey)
  }

  componentWillReceiveProps(props) {
    if (props.symbol !== this.props.symbol || this.isExpired()) {
      this.init(props, this.state.chartType)
    }
  }

  shouldComponentUpdate(props) {
    return (
      props.symbol !== this.props.symbol || !this.isLoaded() || this.isExpired()
    )
  }

  isExpired = () => {
    return this.fetchTime < Date.now() - HIST_EXPIRATION_MS
  }

  isLoaded = () => {
    const { time_series } = this.props.coins
    return (
      time_series[this.tsFilterKey] && !!time_series[this.tsFilterKey].result
    )
  }

  formatForChart = data =>
    data.map(datum => ({
      ...datum,
      timestamp: moment(datum.time * MS_PER_SECOND),
      date: moment(datum.time * MS_PER_SECOND).format("MMM D"),
      time: moment(datum.time * MS_PER_SECOND).format("h:mm a")
    }))

  prepareTxReferences = (series, transactions) => {
    const set_size = series.length
    const min_time = series[0].timestamp
    const max_time = series[set_size - 1].timestamp

    return transactions.reduce((acc, tx, tx_idx) => {
      let tx_time, series_idx
      if (
        tx.time_transacted &&
        tx.time_recorded &&
        moment(tx.time_transacted) - min_time > 0
      ) {
        //use time_recorded if day matches time_transacted
        tx_time = moment(tx.time_transacted)
        if (
          tx_time.format("MM DD YYYY") ==
          moment(tx.time_recorded).format("MM DD YYYY")
        ) {
          tx_time = moment(tx.time_recorded)
        }

        series_idx = Math.floor(
          (tx_time - min_time) / (max_time - min_time) * set_size
        )

        //recent transactions sit at right edge of chart
        if (series_idx >= set_size) {
          series_idx = set_size - 1
        }

        //clock tx with series
        if (series[series_idx]) {
          if (series[series_idx].transactions) {
            series[series_idx].transactions.push(tx)
          } else {
            series[series_idx].transactions = [tx]
          }
        }

        acc.push(
          <ReferenceDot
            key={tx_idx}
            x={series_idx}
            y={tx.cost_per_coin_usd}
            r={REFERENCE_DOT_RADIUS}
            fill={theme.colors.gold}
            stroke={theme.colors.blue}
            isFront
          />
        )
      }
      return acc
    }, [])
  }

  render() {
    const {
      tsFilterKey,
      isLoaded,
      formatForChart,
      prepareTxReferences,
      chartTypes,
      init,
      state,
      props
    } = this
    const {
      coins,
      symbol,
      width,
      height,
      responsive,
      color,
      orientationY,
      transactions = [],
      animate = false,
      timeControl = true,
      displayYAxis = true,
      displayXAxis = true
    } = props
    const { time_series, by_symbol } = coins
    const { expanded, chartType } = state
    const { price_usd } = by_symbol[symbol]

    let series, tx_dots
    try {
      series = formatForChart(time_series[tsFilterKey].result)
      tx_dots = prepareTxReferences(series, transactions)
    } catch (e) {}

    return (
      <LineChartComponent height={height} width={width} responsive={responsive}>
        {timeControl ? (
          <Button.Group as={ChartControls} size="mini" compact>
            {Object.keys(chartTypes).map(type => (
              <Button
                key={type}
                active={type === chartType}
                onClick={() => {
                  init(props, type)
                }}
              >
                {type}
              </Button>
            ))}
          </Button.Group>
        ) : null}
        {!isLoaded() ? (
          <Loader active inline="centered" />
        ) : (
          <Line
            height={height}
            width={width}
            responsive
            displayXAxis={displayXAxis}
            displayYAxis={displayYAxis}
            orientationY={orientationY}
            data={series}
            lines={[
              {
                type: "monotone",
                dataKey: "close",
                name: "price",
                dot: false,
                isAnimationActive: animate,
                animationEasing: "ease-out",
                animationDuration: 800,
                stroke: color,
                fill: color,
                fillOpacity: 0.2,
                strokeWidth: "2px"
              }
            ]}
            dataKeyX="date"
            tooltip={({ payload, label, ...rest }) => (
              <ToolTipComponent>
                <Header as="h4">
                  {label}
                  <ToolTipSubHeader>
                    {payload[0] ? payload[0].payload.time : null}
                  </ToolTipSubHeader>
                </Header>
                <List>
                  {payload.map(line => (
                    <List.Item
                      key={line.name}
                      name={line.name}
                      style={{
                        display: line.value == 0 ? "none" : "block"
                      }}
                    >
                      <ToolTipLabel>{line.name}: </ToolTipLabel>
                      <ToolTipValue>
                        ${formatNumberForDisplay(round(line.value, 2))}
                      </ToolTipValue>
                    </List.Item>
                  ))}
                </List>
                {payload[0] && payload[0] && payload[0].payload.transactions ? (
                  <List>
                    {payload[0].payload.transactions.map((tx, tx_idx) => (
                      <List.Item key={tx_idx}>
                        <ToolTipLabel>
                          <span
                            style={{
                              color:
                                tx.type == "received"
                                  ? theme.colors.green
                                  : theme.colors.red,
                              fontWeight: "bold"
                            }}
                          >
                            {tx.type}
                          </span>{" "}
                          <i>{tx.quantity}</i> at
                        </ToolTipLabel>
                        <ToolTipValue>
                          {" "}
                          ${formatNumberForDisplay(tx.cost_per_coin_usd)}
                        </ToolTipValue>
                      </List.Item>
                    ))}
                  </List>
                ) : null}
              </ToolTipComponent>
            )}
          >
            {/*reference line at current price*/}
            <ReferenceLine
              y={price_usd}
              stroke={theme.colors.gray}
              strokeDasharray="3 3"
            >
              <Label
                value="current price"
                position="insideTopLeft"
                fill={theme.colors.gray}
              />
            </ReferenceLine>
            {/*fill with transaction dots*/}
            {tx_dots}
          </Line>
        )}
      </LineChartComponent>
    )
  }
}
