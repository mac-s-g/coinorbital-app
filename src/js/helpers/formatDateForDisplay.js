import moment from "moment"

export default (date, format = "ll") => moment(date).format(format)
