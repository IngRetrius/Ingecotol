import { useState, useEffect } from 'react'

export function useFontLoading(fonts = ['1em Oswald', '1em Lato'], timeout = 4000) {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    // Si document.fonts no está disponible, usar fallback
    if (!document.fonts) {
      console.warn('Font Loading API not supported, using fallback')
      setTimeout(() => setFontsLoaded(true), 1000)
      return
    }

    // Verificar si las fuentes ya están cargadas
    const allFontsReady = fonts.every(font => {
      try {
        return document.fonts.check(font)
      } catch (error) {
        console.warn(`Error checking font ${font}:`, error)
        return false
      }
    })
    
    if (allFontsReady) {
      setFontsLoaded(true)
      return
    }

    // Cargar fuentes de forma asíncrona
    const loadFonts = async () => {
      try {
        // Cargar todas las fuentes especificadas
        const fontPromises = fonts.map(async (font) => {
          try {
            await document.fonts.load(font)
            return true
          } catch (error) {
            console.warn(`Error loading font ${font}:`, error)
            return false
          }
        })
        
        await Promise.allSettled(fontPromises)
        
        // Esperar a que todas las fuentes estén listas con timeout
        const readyPromise = document.fonts.ready
        const timeoutPromise = new Promise((resolve) => {
          setTimeout(() => resolve('timeout'), timeout)
        })
        
        await Promise.race([readyPromise, timeoutPromise])
        
        setFontsLoaded(true)
      } catch (error) {
        console.warn('Error loading fonts:', error)
        
        // Fallback: continuar después del timeout
        setTimeout(() => {
          setFontsLoaded(true)
        }, 500)
      }
    }

    loadFonts()

    // Cleanup timeout en caso de unmount
    const fallbackTimeout = setTimeout(() => {
      setFontsLoaded(true)
    }, timeout)

    return () => clearTimeout(fallbackTimeout)
  }, [fonts, timeout])

  return fontsLoaded
}
