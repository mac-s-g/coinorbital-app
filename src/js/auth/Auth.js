import history from "../store/history"
import auth0 from "auth0-js"
import config from "./auth0-config"
const { domain, clientId, callbackUrl, redirectPath, audience } = config

const auth_config = {
  domain: domain,
  clientID: clientId,
  redirectUri: callbackUrl,
  audience: audience,
  responseType: "token id_token",
  scope: "openid profile"
}

const ONE_SECOND = 1000

class Auth {
  auth0 = new auth0.WebAuth(auth_config)

  constructor() {
    this.scheduleRenewal()
  }

  defaultUserId = "local-user"
  userProfile = null
  tokenRenewalTimeout = null

  login = () => {
    this.auth0.authorize()
  }

  signup = () => this.login()

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token")
    localStorage.removeItem("id_token")
    localStorage.removeItem("expires_at")
    // navigate to the home route
    history.replace("/")
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace(redirectPath)
      }
      /* this is being triggered twice and throwing an error */
      // else if (err) {
      //   history.replace(redirectPath)
      //   console.log(err)
      //   alert(`Error: ${err.error}. Check the console for further details.`)
      // }
    })
  }

  setSession = authResult => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem("access_token", authResult.accessToken)
    localStorage.setItem("id_token", authResult.idToken)
    localStorage.setItem("expires_at", expiresAt)
    //schedule token renewal
    this.scheduleRenewal()
    // navigate to redirect route
    history.replace(redirectPath)
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token")
    if (!accessToken) {
      throw new Error("No access token found")
    }
    return accessToken
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token")
    if (!accessToken) {
      throw new Error("No id token found")
    }
    return accessToken
  }

  getProfileAsync = () => {
    return new Promise(resolve => {
      let accessToken = this.getAccessToken()
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = profile
        }
        resolve(profile)
      })
    })
  }

  getProfile = async () => {
    let profile = {}
    try {
      profile = await this.getProfileAsync()
    } catch (e) {}
    return profile
  }

  getUserId = async () => {
    const profile = await this.getProfile()
    return !!profile && !!profile.sub ? profile.sub : this.defaultUserId
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"))
    return new Date().getTime() < expiresAt
  }

  renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (!err) {
        this.setSession(result)
      }
    })
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"))
    const delay = expiresAt - Date.now()
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken()
      }, delay - ONE_SECOND)
    }
  }
}

export default new Auth()
