export default (obj, key, default_value) =>
  obj[key] ? obj[key] : default_value
