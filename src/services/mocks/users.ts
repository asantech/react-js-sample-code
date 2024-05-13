 
import users from '../../mock/db/users.json'
import { AuthData } from "../../modules/auth/auth.types"
import { User } from "../../store/auth"
import { makeAuthenticatedReq } from './auth'
import { getValueAfterDelay } from '../../utils/mock/service' 

type UserPublicData = Omit<User, 'password'>

export type SignInMockResponse = {
    user: UserPublicData;
    auth: AuthData
}

export const getUsers = async () => {

    const businessLogic = async () => {
       const response = await getValueAfterDelay(users)
       return {
        res: response
       }
    }

    const response = await makeAuthenticatedReq({
        requestBody: {},
        requestLogic: businessLogic
    })
    return response;
}
 