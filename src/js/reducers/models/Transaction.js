import moment from "moment"

export default class Transaction {
  constructor(input) {
    let error = ""
    try {
      if (
        typeof input.cost_per_coin_usd === "number" &&
        typeof input.quantity === "number" &&
        typeof input.type === "string"
      ) {
        return {
          ...input,
          time_recorded: moment(input.time_recorded),
          time_transacted: moment(
            input.time_transacted ? input.time_transacted : input.time_recorded
          ),
          notes: input.notes ? input.notes : []
        }
      }
    } catch (error) {}
    throw `malformatted transaction:\n${JSON.stringify(
      input,
      null,
      2
    )}\n${error}`
  }
}
