import isEmpty from "lodash/isEmpty"

import { type FormValues } from "../../components/common/forms/CustomForm1"
import users from '../../mock/db/users.json'
import { getValueAfterDelay, hashString, encryptTextWithSecretKey, SECRET_KEY_MOCK, MOCK_RESPONSE_DELAY } from "../../utils/mock/service"
import { AuthData } from "../../modules/auth/auth.types"
import { isUserDataValid } from "../../modules/auth/auth.utils"
import { User } from "../../store/auth"
import { getLocalStorage, setLocalStorage, removeFromLocalStorage } from "../../utils/localStorage"
import { hasAuthDataTokens, isTokenExpired } from './../../modules/auth/auth.utils';
import { reqStructure } from "./base"

const ACCESS_TOKEN_EXPIRE_DURATION = 3600
const REFRESH_TOKEN_EXPIRE_DURATION = 10800

type UserPublicData = Omit<User, 'password'>

type AuthTokens = {
    accessToken: string
    refreshToken: string
}

export type SignInMockResponse = {
    user: UserPublicData;
    auth: AuthData
}

const getAuthDataMock = () => {
    const currentTimeStamp = Date.now()
    const accessTokenMock = encryptTextWithSecretKey({text: `${currentTimeStamp}-${ACCESS_TOKEN_EXPIRE_DURATION}`, secretKey: SECRET_KEY_MOCK})
    const refreshTokenMock = encryptTextWithSecretKey({text: `${currentTimeStamp}-${REFRESH_TOKEN_EXPIRE_DURATION}`, secretKey: SECRET_KEY_MOCK})
 
    const authData = {
        auth: {
            accessToken: accessTokenMock,
            refreshToken: refreshTokenMock,
        }
    }
    return authData
}

const requestNewAccessToken = ({authTokens}: {authTokens: AuthTokens}) => {
    const currentTimeStamp = Date.now()
    const newAccessTokenMock = encryptTextWithSecretKey({text: `${currentTimeStamp}-${ACCESS_TOKEN_EXPIRE_DURATION}`, secretKey: SECRET_KEY_MOCK})
    const newLocalAuthData = {
        ...authTokens,
        accessToken: newAccessTokenMock
    }
    setLocalStorage("auth", newLocalAuthData)
}

export const makeAuthenticatedReq = async ({requestBody, requestLogic}: any) => {
    const checkIsUserAuthentication = () => {
        const authTokens = getLocalStorage("auth")
        const isValuesValid = hasAuthDataTokens(authTokens)
        if (!isValuesValid) {
            signOutMock()            
            return Promise.reject(new Error('Invalid auth tokens'));
        }
        const isRefreshTokenExpired = isTokenExpired(authTokens.refreshToken)
        if (isRefreshTokenExpired) {
            signOutMock()
            return Promise.reject(new Error('Refresh token is expired'));
        }
        const isAccessTokenExpired = isTokenExpired(authTokens.accessToken)
        if (isAccessTokenExpired) {

            requestNewAccessToken({authTokens})
            makeAuthenticatedReq({requestBody, requestLogic})
            return Promise.reject(new Error('Access token is expired'));
        }
        return  Promise.resolve(requestBody)
    }

    const response = await reqStructure({
        prevCallback: checkIsUserAuthentication,
        businessLogic: requestLogic,
        postCallback: ({res}: any) => { return res }
    })

    return response
}

export const signInMock = async (formValues: FormValues): Promise<SignInMockResponse | undefined | unknown> => {
    const signInFormEmail = formValues.email.trim()
    const passwordHash = hashString(formValues.password.trim())
    const user = users.find(user => signInFormEmail === user.email);
    const userNotExistsInDB = isEmpty(user)
    if (userNotExistsInDB) return;

    const userDataIsValid = isUserDataValid(user)
    if(!userDataIsValid) return

    const { password: userPassword, ...userPublicData } = user; 
    if(userPassword !== passwordHash) return 

    const authData = getAuthDataMock()
    const authDataMock = {
        user: userPublicData,
        ...authData
    }

    const authResponseMock: Promise<unknown>  = getValueAfterDelay(authDataMock, MOCK_RESPONSE_DELAY)
    return await authResponseMock
}

export const signUpMock = async (formValues: FormValues): Promise<SignInMockResponse | undefined | unknown> => {
    const signUpFormEmail = formValues.email.trim()
    const user = users.find(user => signUpFormEmail === user.email);

    const userExistsInDB = !isEmpty(user)
    if (userExistsInDB) return;

    const passwordHash = hashString(formValues.password.trim())
    const userPublicData = {
        email: signUpFormEmail,
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        username: ''
    }
    users.push({
        ...userPublicData,
        password: passwordHash,
    })

    const authData = getAuthDataMock()
    const authDataMock = {
        user: userPublicData,
        ...authData
    }

    const authResponseMock: Promise<unknown> = getValueAfterDelay(authDataMock, MOCK_RESPONSE_DELAY)
    return await authResponseMock
}

export const signOutMock = () => {
    removeFromLocalStorage('auth')
    removeFromLocalStorage('user')
    window.location.reload()
}