import { Link, Outlet, useLocation } from 'react-router-dom'
import { useKeepOutlet } from '../KeepAlive'

export default function Layout() {
  const location = useLocation()
  const element = useKeepOutlet()
  return (
    <div>
      <Link to="/home" style={{ marginRight: 10 }}>首页</Link>
      <Link to="/about">关于</Link>
      <div>
        当前路由: {location.pathname}
      </div>
      {/* <Outlet />   */}
      {element}
    </div>
  )
}
