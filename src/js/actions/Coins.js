import axios from "axios"

import createSearchQuery from "./../helpers/createSearchQuery"

export const REQUEST_COINS = "REQUEST_COINS"
export const RECEIVE_COINS = "RECEIVE_COINS"
export const RECEIVE_COINS_ERROR = "RECEIVE_COINS_ERROR"
export const REQUEST_TIME_SERIES = "REQUEST_TIME_SERIES"
export const RECEIVE_TIME_SERIES = "RECEIVE_TIME_SERIES"
export const RECEIVE_TIME_SERIES_ERROR = "RECEIVE_TIME_SERIES_ERROR"

const SYMBOL_MAP = {
  MIOTA: "IOT"
}

const requestCoins = () => ({
  type: REQUEST_COINS
})

const receiveCoins = payload => ({
  type: RECEIVE_COINS,
  payload
})

const receiveCoinsError = payload => ({
  type: RECEIVE_COINS_ERROR,
  payload
})

export const fetchCoins = payload => {
  return dispatch => {
    dispatch(requestCoins())
    axios
      .get("https://api.coinmarketcap.com/v2/ticker/")
      .then(response => dispatch(receiveCoins(response.data.data)))
      .catch(error => dispatch(receiveCoinsError(error)))
  }
}

export const requestTimeSeries = query_key => ({
  type: REQUEST_TIME_SERIES,
  payload: { query_key }
})

export const receiveTimeSeries = (result, query_key) => ({
  type: RECEIVE_TIME_SERIES,
  payload: { result, query_key }
})

export const receiveTimeSeriesError = (error, query_key) => ({
  type: RECEIVE_TIME_SERIES_ERROR,
  payload: { error, query_key }
})

export const fetchTimeSeries = (filters, query_key) => {
  //make sure potentially missing filters have default values
  filters = {
    symbol: "BTC",
    type: "day",
    reference: "USD",
    aggregate: 1,
    limit: 60,
    exchange: "CCCAGG",
    ...filters
  }
  const { symbol, type, reference, aggregate, limit, exchange } = filters
  return dispatch => {
    dispatch(requestTimeSeries(query_key))
    axios
      .get(
        createSearchQuery(
          `https://min-api.cryptocompare.com/data/histo${type}`,
          {
            //there are inconsistencies between cryptocompare and coinmarketcap api
            fsym: !!SYMBOL_MAP[symbol] ? SYMBOL_MAP[symbol] : symbol,
            tsym: reference,
            aggregate,
            limit,
            exchange
          }
        )
      )
      .then(response =>
        dispatch(receiveTimeSeries(response.data.Data, query_key))
      )
      .catch(error => dispatch(receiveTimeSeriesError(error, query_key)))
  }
}
