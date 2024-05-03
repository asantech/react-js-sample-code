import isEmpty from "lodash/isEmpty"

import { type FormValues } from "../../components/common/forms/CustomForm"
import users from '../../mock/db/users.json'
import { getValueAfterDelay, generateRandomString } from "../../utils/mock"
import { AuthenticationData } from "../../modules/auth/auth.types"
import { isUserDataValid } from "../../modules/auth/auth.utils"
import { User } from "../../store/auth"
import { removeFromLocalStorage } from "../../utils/localStorage"

const MOCK_RESPONSE_DELAY = 1500
const ACCESS_TOKEN_EXPIRATION_DURATION = 3600

export type SignInMockResponse = {
    user: User;
    authentication: AuthenticationData
}

export const signInMock = async (formValues: FormValues): Promise<SignInMockResponse | undefined | unknown> => {
    const signInFormEmail = formValues.email.trim()
    const user = users.find(user => signInFormEmail === user.email);
    const userNotExistsInDB = isEmpty(user)
    if (userNotExistsInDB) return;

    const userDataIsValid = isUserDataValid(user)
    if(!userDataIsValid) return

    const mockAccessToken = generateRandomString(50)
    const mockRefreshToken = generateRandomString(50)

    const mockResponseData = {
        user,
        authentication: {
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
            expirationDuration: ACCESS_TOKEN_EXPIRATION_DURATION,
            timestamp: Date.now()
        }
    }

    const mockResponse: Promise<unknown>  = getValueAfterDelay(mockResponseData, MOCK_RESPONSE_DELAY)
    return await mockResponse
}

export const signUpMock = async (formValues: FormValues): Promise<SignInMockResponse | undefined | unknown> => {
    const signUpFormEmail = formValues.email.trim()
    const user = users.find(user => signUpFormEmail === user.email);
 
    const userExistsInDB = !isEmpty(user)
    if (userExistsInDB) return;

    users.push({
        email: signUpFormEmail,
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        username: ''
    })

    const mockAccessToken = generateRandomString(50)
    const mockRefreshToken = generateRandomString(50)

    const mockResponseData = {
        user,
        authentication: {
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
            expirationDuration: ACCESS_TOKEN_EXPIRATION_DURATION,
            timestamp: Date.now()
        }
    }

    const mockResponse: Promise<unknown> = getValueAfterDelay(mockResponseData, MOCK_RESPONSE_DELAY)
    return await mockResponse
}

export const signOutMock = () => {
    removeFromLocalStorage('authentication')
    removeFromLocalStorage('user')
}