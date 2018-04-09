import { authentication } from "./../constants"

const { domain, client_id, callback_path, redirect_path } = authentication

export default {
  domain: domain,
  clientId: client_id,
  callbackUrl: window.location.origin + callback_path,
  redirectPath: redirect_path
}
