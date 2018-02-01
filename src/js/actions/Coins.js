import axios from "axios"

export const REQUEST_COINS = "REQUEST_COINS"
export const RECEIVE_COINS = "RECEIVE_COINS"
export const RECEIVE_COINS_ERROR = "RECEIVE_COINS_ERROR"
export const REQUEST_TIME_SERIES = "REQUEST_TIME_SERIES"
export const RECEIVE_TIME_SERIES = "RECEIVE_TIME_SERIES"
export const RECEIVE_TIME_SERIES_ERROR = "RECEIVE_TIME_SERIES_ERROR"

const requestCoins = () => ({
  type: REQUEST_COINS
})

const receiveCoins = response => ({
  type: RECEIVE_COINS,
  payload: response
})

const receiveCoinsError = payload => ({
  type: RECEIVE_COINS_ERROR,
  payload
})

export const fetchCoins = payload => {
  return dispatch => {
    dispatch(requestCoins())
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => dispatch(receiveCoins(response.data)))
      .catch(error => dispatch(receiveCoinsError(error)))
  }
}

export const requestTimeSeries = () => ({
  type: REQUEST_TIME_SERIES
})

export const receiveTimeSeries = payload => ({
  type: RECEIVE_TIME_SERIES,
  response
})

export const receiveTimeSeriesError = payload => ({
  type: RECEIVE_TIME_SERIES_ERROR,
  payload
})

export const fetchTimeSeries = () => {
  return dispatch => {
    dispatch(requestTimeSeries)
    axios
      .get(
        "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG"
      )
      .then(response => dispatch(receiveTimeSeries(response.data)))
      .catch(error => dispatch(receiveTimeSeriesError(error)))
  }
}
