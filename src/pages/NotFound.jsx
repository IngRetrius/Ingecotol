import { Link } from "react-router"
import SlideButton from "../components/common/SlideButton"

export default function NotFound() {

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-4xl md:text-7xl p-5 font-family-oswald">{":("}</div>
      <h1 className="font-family-oswald text-4xl md:text-8xl text-center">404 - Not Found</h1>
      <Link to="/app">
        <SlideButton content="Volver al inicio" />
      </Link>
    </div>
  )
}