import axios from "axios"

export const REQUEST_COINS = "REQUEST_COINS"
export const RECEIVE_COINS = "RECEIVE_COINS"
export const RECEIVE_COINS_ERROR = "RECEIVE_COINS_ERROR"

const requestCoins = () => ({
  type: REQUEST_COINS
})

const receiveCoins = response => ({
  type: RECEIVE_COINS,
  payload: response
})

const receiveCoinsError = payload => ({
  type: RECEIVE_COINS_ERROR,
  payload: payload
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
