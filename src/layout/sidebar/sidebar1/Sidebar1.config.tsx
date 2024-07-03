export type SidebarMenuItemType = {
  label: string
  linkPath: string
  iconPath?: string
}

export type SidebarMenuType = SidebarMenuItemType[] | SidebarMenuGroupType[]

export type SidebarMenuGroupType = {
  label: string
  iconPath?: string
  linkPath: string
  menu: SidebarMenuType
}

const AUTH_SIDEBAR_CONFIG = {
  label: "auth",
  iconPath: "",
  linkPath: "/auth",
  menu: [
    {
      label: "OAuth",
      linkPath: "/o-auth",
    },
  ],
}
const ROUTES_SIDEBAR_CONFIG = {
  label: "routes",
  linkPath: "/routes",
  iconPath: "",
}
const LAYOUTS_SIDEBAR_CONFIG = {
  label: "layouts",
  linkPath: "/layouts",
  iconPath: "",
  menu: [
    {
      label: "sidebars",
      linkPath: "/sidebar",
      iconPath: "",
    },
  ],
}
const COMPONENTS_SIDEBAR_CONFIG = {
  label: "components",
  iconPath: "",
  linkPath: "/components",
  menu: [
    {
      label: "dropdowns",
      linkPath: "/dropdowns",
    },
    {
      label: "date pickers",
      linkPath: "/date-pickers",
    },
    {
      label: "sliders",
      linkPath: "/sliders",
    },
  ],
}
const SERVICES_SIDEBAR_CONFIG = {
  label: "services",
  iconPath: "",
  linkPath: "/services",
  menu: [
    {
      label: "native",
      linkPath: "/native",
      menu: [
        {
          label: "mock",
          linkPath: "/mock",
        },
        {
          label: "XMLHttpRequest",
          linkPath: "/xml-http-request",
        },
        {
          label: "fetch",
          linkPath: "/fetch",
        },
      ],
    },
    {
      label: "libraries",
      linkPath: "/libraries",
      menu: [
        {
          label: "axios",
          linkPath: "/axios",
        },
        {
          label: "tanstack-query",
          linkPath: "/tanstack-query",
        },
      ],
    },
  ],
}
const MEDIA_SIDEBAR_CONFIG = {
  label: "media",
  iconPath: "",
  linkPath: "/media",
  menu: [
    {
      label: "audio",
      linkPath: "/audio",
      menu: [
        {
          label: "players",
          linkPath: "/players",
        },
      ],
    },
    {
      label: "video",
      linkPath: "/video",
      menu: [
        {
          label: "players",
          linkPath: "/players",
        },
      ],
    },
  ],
}
const SETTINGS_SIDEBAR_CONFIG = {
  label: "settings",
  iconPath: "",
  linkPath: "/settings",
  menu: [
    {
      label: "profiles",
      linkPath: "/profiles",
    },
    {
      label: "sessions",
      linkPath: "/sessions",
    },
    {
      label: "themes",
      linkPath: "/themes",
    },
  ],
}
const UI_SIDEBAR_CONFIG = {
  label: "UI",
  iconPath: "",
  linkPath: "/ui",
  menu: [
    {
      label: "icons",
      linkPath: "/icons",
    },
  ],
}
const MOCKS_SIDEBAR_CONFIG = {
  label: "Mocks",
  iconPath: "",
  linkPath: "/mocks",
  menu: [
    {
      label: "Air Bnb",
      linkPath: "/air-bnb",
    },
  ],
}
const Q_AND_A_SIDEBAR_CONFIG = {
  label: "Q&A",
  iconPath: "",
  linkPath: "/q-and-a",
  menu: [
    {
      label: "React JS",
      linkPath: "/react-js",
    },
  ],
}

export const SIDEBAR_CONFIG: SidebarMenuType = [
  AUTH_SIDEBAR_CONFIG,
  ROUTES_SIDEBAR_CONFIG,
  LAYOUTS_SIDEBAR_CONFIG,
  COMPONENTS_SIDEBAR_CONFIG,
  SERVICES_SIDEBAR_CONFIG,
  MEDIA_SIDEBAR_CONFIG,
  SETTINGS_SIDEBAR_CONFIG,
  UI_SIDEBAR_CONFIG,
  MOCKS_SIDEBAR_CONFIG,
  Q_AND_A_SIDEBAR_CONFIG,
]
