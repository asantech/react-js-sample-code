import type { Config } from "tailwindcss"
import sharedConfig from "../../packages/tailwind-theme/tailwind.config"

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.{ts,tsx,jsx}"],
  presets: [sharedConfig],
}

export default config
