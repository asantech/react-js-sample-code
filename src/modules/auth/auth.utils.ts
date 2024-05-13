import has from "lodash/has"

import { AuthData } from "./auth.types"
import { User } from "../../store/auth"
import { decryptTextWithSecretKey, SECRET_KEY_MOCK } from "../../utils/mock/service"

export const hasAuthDataTokens = (
  authData: AuthData
) => {
  return (
    has(authData, "accessToken") &&
    has(authData, "refreshToken")
  )
}

export const isUserDataValid = (user: User) => {
  return (
    has(user, "email") &&
    has(user, "firstName") &&
    has(user, "lastName")
  )
}

export const isTokenExpired = (token: string) => {
  const currentTimestamp = Date.now()
  const tokenDataString =  decryptTextWithSecretKey({text: token, secretKey: SECRET_KEY_MOCK})
  const [tokenCreationTimestamp, tokenExpireDuration] = tokenDataString.split('-')
  return currentTimestamp > Number(tokenCreationTimestamp) + Number(tokenExpireDuration) * 1000
}

export const getTokenRemainingTime = (token: string) => {
  if(!token) return 0
  const currentTimestamp = Date.now()
  const tokenDataString =  decryptTextWithSecretKey({text: token, secretKey: SECRET_KEY_MOCK})
  const [tokenCreationTimestamp, tokenExpireDuration] = tokenDataString.split('-')
  const remainingTime = (Number(tokenCreationTimestamp) + Number(tokenExpireDuration) * 1000) - currentTimestamp
  return remainingTime > 0 ?  Math.floor(remainingTime / 1000) : 0
}