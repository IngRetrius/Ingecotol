import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useRef, useState } from "react"
import BallCursor from "../components/common/BallCursor"
import InkButton from "../components/common/InkButton"
import SEO from "../components/common/SEO"
import { useFontLoading } from "../hooks/useFontLoading"
import { Link } from "react-router"

gsap.registerPlugin(SplitText)

function Intro() {
  const ballCursorRef = useRef(null)
  const [positionInitialCursor, setPositionInitialCursor] = useState(null)
  const fontsLoaded = useFontLoading(['1em Oswald', '1em Lato'])
  const containerTitleRef = useRef(null)


  useGSAP(() => {
    if (!fontsLoaded) return

    const introTitle = document.getElementById("intro-title")
    const titleBrandSplit = new SplitText(introTitle, { type: "chars" })
    const chasingCursor = document.getElementById("chasing-cursor")
    const introText = document.getElementById("intro-text")
    const inkButton = document.getElementById("ink-button")
    const introTitleStudio = document.getElementById("intro-title-studio")
    const introTitleStudioSplit = new SplitText(introTitleStudio, { type: "chars" })

    const underScoreRect = titleBrandSplit.chars[titleBrandSplit.chars.length - 1].getBoundingClientRect()
    const recPoint = chasingCursor.getBoundingClientRect()

    gsap.set(chasingCursor, {
      x: underScoreRect.right - recPoint.right + 8,
      y: underScoreRect.top - recPoint.top,
    })

    // Set initial state for studio text to prevent layout shift
    gsap.set(introTitleStudio, {
      transformOrigin: "left center"
    })

    const tl = gsap.timeline()

    tl
      .from(titleBrandSplit.chars, { // Animate each character of "blank_"
        alpha: 0,
        scaleX: .1,
        stagger: 0.1,
        ease: "power2.out",
      })
      .from(introTitleStudioSplit.chars, { // Animate each character of "studio"
        alpha: 0,
        scaleX: .1,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.3")
      .to(introTitleStudio, { // Move "ltda" out of view to the left
        x: -(introTitle.offsetWidth + 20),
        alpha: 0,
        ease: "power2.inOut",
        duration: 0.8,
      }, "-=0.25")
      .to(introTitle, { // Center "blank_" horizontally
        x: containerTitleRef.current ? containerTitleRef.current.offsetWidth / 2 - introTitle.offsetWidth / 2 : 0,
        ease: "power2.inOut",
        duration: 0.8,
      }, "<")
      .set(introTitleStudio, { // Hide studio completely after animation
        visibility: "hidden",
      })
      .to(chasingCursor, { // Position chasing cursor at right of "Ingecotol"
        x: introTitle.offsetWidth / 2 - recPoint.width / 2 + 8,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.2")
      .from(chasingCursor, { // Animate chasing cursor appearance
        alpha: 0,
        scale: 1.2,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          setPositionInitialCursor(chasingCursor.getBoundingClientRect());
        }
      }, "-=0.1")
      .from(introText, { // Animate appearing intro text
        alpha: 0,
        duration: 0.7,
        ease: "power2.out",
      }, "-=0.2")
      .from(inkButton, { // Animate appearing button
        alpha: 0,
        duration: 0.7,
        ease: "power2.out",
      }, "<")

  }, [fontsLoaded])

  return (
    <>
      <SEO
        title="Ingecotol Ltda."
        description="Bienvenido a Ingecotol Ltda. Empresa líder en telecomunicaciones en Colombia. Experiencia, calidad y variedad a su servicio."
        keywords="Ingecotol, telecomunicaciones, Colombia, empresa tecnología"
        canonical="https://ingecotol.com/"
      />
      <section className="grid place-items-center min-h-screen" role="banner">
      <div className="relative flex flex-col items-center gap-8 max-w-md md:max-w-xl px-5">
        <div ref={containerTitleRef} className="flex flex-row items-end relative gap-2 md:gap-3">
          <h1 className="sr-only">Ingecotol Ltda - Ingeniería y Telecomunicaciones</h1>
          <span id="intro-title" aria-hidden="true" className="font-family-oswald text-6xl md:text-8xl select-none whitespace-nowrap text-[#0A2342]">Ingecotol</span>
          <span id="intro-title-studio" aria-hidden="true" className="font-family-oswald text-6xl md:text-8xl select-none text-[#2f5597]">ltda</span>
        </div>
        <div id="chasing-cursor" className="absolute p-0 m-0 w-4 h-4 bg-transparent border-2 border-[#2f5597] rounded-full flex items-center justify-center select-none ml-2">
          <small className="m-0 p-5 leading-none text-[11px] font-bold text-[#2f5597]">R</small>
        </div>
        <small className="text-center text-[#4A5568]" id="intro-text">Ingeniería y telecomunicaciones. Experiencia, calidad y variedad a su servicio.</small>
        <Link to="/app" id="ink-button">
          <InkButton ballCursorRef={ballCursorRef}>
            <div className="flex items-center gap-1">
              <span className="flex-2 font-family-oswald text-lg bg-transparent p-0 m-0">Entrar</span>
            </div>
          </InkButton>
        </Link>
      </div>
      {positionInitialCursor && <BallCursor ref={ballCursorRef} positionInitialCursor={positionInitialCursor} />}
    </section>
    </>
  )
}

export default Intro