import DashboardRoutes from '@routes/DashboardRoutes'

function Main() {
  return (
    <main
      className='h-full bg-white p-5 overflow-y-auto'
      style={{ height: 'calc(100vh - 196px)' }}
    >
      <DashboardRoutes />
    </main>
  )
}

export default Main
