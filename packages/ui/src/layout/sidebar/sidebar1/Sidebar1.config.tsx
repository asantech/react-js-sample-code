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

export const SIDEBAR_CONFIG: SidebarMenuType = [
  {
    label: "auth",
    iconPath: "",
    linkPath: "/auth",
    menu: [
      {
        label: "OAuth",
        linkPath: "/o-auth",
      },
    ],
  },
  {
    label: "routes",
    linkPath: "/routes",
    iconPath: "",
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    label: "UI",
    iconPath: "",
    linkPath: "/ui",
    menu: [
      {
        label: "icons",
        linkPath: "/icons",
      },
    ],
  },
]
