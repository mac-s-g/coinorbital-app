//search is an object {name: value}
export default (url, search) =>
  `${url}?${Object.keys(search)
    .map(name => `${encodeURI(name)}=${encodeURI(search[name])}`)
    .join("&")}`
