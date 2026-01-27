import { Link } from "react-router"
import SlideButton from "../components/common/SlideButton"
import SEO from "../components/common/SEO"

export default function NotFound() {

  return (
    <>
      <SEO
        title="Página no encontrada (404)"
        description="La página que buscas no existe. Vuelve a la página principal de Ingecotol Ltda."
      />
      <main className="flex h-screen flex-col items-center justify-center" role="main">
      <div className="text-4xl md:text-7xl p-5 font-family-oswald" aria-hidden="true">{":("}</div>
      <h1 className="font-family-oswald text-4xl md:text-8xl text-center">Página no encontrada</h1>
      <p className="sr-only">Error 404: La página que buscas no existe.</p>
      <Link to="/app" aria-label="Volver a la página principal de Ingecotol">
        <SlideButton content="Volver al inicio" />
      </Link>
    </main>
    </>
  )
}