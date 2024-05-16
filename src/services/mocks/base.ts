import { AuthData } from "@modules/auth/auth.types"
import { User } from "@store/auth"
type UserPublicData = Omit<User, 'password'>

type ReqResType = {
    req?: () => void,
    res: () => void
}

type RequestStructure = {
    prevCallback: () => any
    businessLogic: (reqRes: ReqResType) => any
    postCallback: (reqRes: ReqResType) => any
}

export type SignInMockResponse = {
    user: UserPublicData;
    auth: AuthData
}

export const reqStructure = ({prevCallback, businessLogic, postCallback}: RequestStructure) =>{
    const response = prevCallback()
        .then((res: any) => businessLogic({res}))
        .then(({req, res}: ReqResType) => postCallback({req,res}))
        .then((res: any) => {
            return res;
        })
        .catch((error: any) => {
            console.error('An error occurred:', error);
        });
    return response
}
