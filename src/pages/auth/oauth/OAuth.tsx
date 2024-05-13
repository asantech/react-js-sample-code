import { useState, useMemo } from "react"

import Counter from "../../../components/timers/Counter"
import CustomButton from "../../../components/common/buttons/CustomButton"
import { getUsers } from "../../../services/mocks/users"
import { User, useAuthStore } from "../../../store/auth"
import { getLocalStorage } from "../../../utils/localStorage"
import { getTokenRemainingTime } from "../../../modules/auth/auth.utils"

function OAuth() {
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const authTokens = getLocalStorage("auth")
  const accessTokenRemainingTime = useMemo(
    () => getTokenRemainingTime(authTokens.accessToken),
    [authTokens.accessToken]
  )
  const refreshTokenRemainingTime = useMemo(
    () => getTokenRemainingTime(authTokens.refreshToken),
    [authTokens.refreshToken]
  )

  const onGetUsersButtonClick = async () => {
    setLoadingUsers(true)
    try {
      const users = await getUsers()
      setUsers(users)
    } catch (error) {
      console.log("Error: ", error)
    }
    setLoadingUsers(false)
  }

  return (
    <>
      <h1 className="mb-5 text-xl font-bold">O Auth</h1>
      <div>
        <div className="mr-2 inline-block">
          <Counter
            initialCount={accessTokenRemainingTime}
            label="Access Token:"
          />
        </div>
        <Counter
          initialCount={refreshTokenRemainingTime}
          label="Refresh Token:"
        />
      </div>
      <div className="my-5">
        <CustomButton
          type="submit"
          variant="primary"
          isLoading={loadingUsers}
          isDisabled={loadingUsers}
          onClick={onGetUsersButtonClick}
        >
          Get users
        </CustomButton>
      </div>
      {Boolean(users?.length) && (
        <table className="my-5">
          <thead>
            <tr className="font-bold">
              <td className="py-2 pr-4">Email</td>
              <td className="py-2 px-4">Username</td>
              <td className="py-2 px-4">First Name</td>
              <td className="py-2 pl-4">Last Name</td>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => {
              return (
                <tr key={user.email}>
                  <td className="py-2 pr-4">{user.email}</td>
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.firstName}</td>
                  <td className="py-2 pl-4">{user.lastName}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default OAuth
