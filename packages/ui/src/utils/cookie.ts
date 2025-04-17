export const setCookie = ({
  name,
  value,
  days,
}: {
  name: string
  value: unknown
  days: number
}) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Convert days to milliseconds
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/; samesite=strict; secure`
}

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ")
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=")
    if (key === name) {
      return value
    }
  }
  return null
}
