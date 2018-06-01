import auth from "./../../auth/Auth"
import axios from "axios"
import axiosRetry from "axios-retry"
import { api } from "./../../constants"

const MAX_RETRIES = 3
const REQUEST_TIMEOUT = 5000

export default () => {
  let client = axios.create({
    baseURL: api.domain,
    timeout: REQUEST_TIMEOUT,
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`
      // "Cache-Control": "no-store"
    }
  })
  axiosRetry(client, {
    retries: MAX_RETRIES,
    retryDelay: axiosRetry.exponentialDelay
  })
  return client
}
