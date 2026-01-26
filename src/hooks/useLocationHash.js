import { useEffect, useState } from "react"

export default function useLocationHash() {

  const [currentHash, setCurrentHash] = useState('home-section')

  useEffect(() => {
    // Obtener hash 
    const getHash = () => window.location.hash.substring(1)

    // Escuchar cambios en el hash
    const handleHashChange = () => {
      setCurrentHash(getHash())
    };

    window.addEventListener('hashchange', handleHashChange)

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return currentHash
}