import type { Config } from "tailwindcss"

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.{ts,tsx,jsx}"],
}

export default config
