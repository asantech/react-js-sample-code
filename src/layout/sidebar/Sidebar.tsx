import { Link } from "react-router-dom"

type SidebarProps = {
  expanded: boolean
}

function Sidebar({ expanded }: Readonly<SidebarProps>) {
  return (
    <aside className="h-screen bg-sky-400">
      <div className="flex justify-start items-center gap-5 p-5">
        <img
          className="w-16"
          src="/logo.jpg"
          alt="App Logo"
          style={{ borderRadius: "50%" }}
        />
        {expanded && (
          <span className="text-white text-xl font-semibold">
            React sample App
          </span>
        )}
      </div>
      <div className="p-8">
        <Link to="/tokens">OAuth</Link>
      </div>
    </aside>
  )
}

export default Sidebar
