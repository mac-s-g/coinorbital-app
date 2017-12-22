export const CREATE_TRANSACTION = "CREATE_TRANSACTION"

export const createTransaction = payload => ({
  type: CREATE_TRANSACTION,
  payload: payload
})
