import has from "lodash/has"

import { AuthenticationData } from "./auth.types"
import { User } from "../../store/auth"

export const isAuthenticationDataValid = (
  response: AuthenticationData
) => {
  return (
    has(response, "accessToken") &&
    has(response, "refreshToken") &&
    has(response, "expirationDuration") && 
    has(response, "timestamp") 
  )
}

export const isUserDataValid = (user: User) => {
  return (
    has(user, "email") &&
    has(user, "firstName") &&
    has(user, "lastName")
  )
}

export const isTokenExpired = (tokenCreationTimestamp: number, expirationDuration: number) => {
  const currentTimestamp = Date.now() 
  return currentTimestamp > tokenCreationTimestamp + expirationDuration * 1000
}