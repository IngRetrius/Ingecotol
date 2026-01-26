import SlideButton from "./SlideButton"
import { Link, useLocation } from "react-router";


export default function LinkMenu({ to, content }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link className="cursor-crosshair" to={to}>
      <SlideButton content={content}
        style={{
          fontWeight: isActive ? 'bold' : 'normal',
          fontStyle: isActive ? 'italic' : 'normal',
        }}
      />
    </Link>
  )
}
