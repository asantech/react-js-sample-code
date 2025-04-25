import type { Config } from "tailwindcss"

const config: Pick<Config, "content"> = {
  content: ["./src/**/*.{ts,tsx,jsx}"],
}

export default config
