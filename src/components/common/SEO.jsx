import { useEffect } from 'react';

/**
 * Componente SEO para manejo dinámico de meta tags
 * @param {string} title - Título de la página
 * @param {string} description - Descripción para meta description
 * @param {string} keywords - Palabras clave separadas por comas
 * @param {string} canonical - URL canónica de la página
 * @param {string} ogImage - Imagen para Open Graph
 */
export default function SEO({
  title = 'Ingecotol Ltda',
  description = 'Empresa líder en telecomunicaciones en Colombia.',
  keywords = '',
  canonical = '',
  ogImage = '/images/og-image.jpg'
}) {
  useEffect(() => {
    // Actualizar título
    const fullTitle = title.includes('Ingecotol')
      ? title
      : `${title} | Ingecotol Ltda`;
    document.title = fullTitle;

    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Actualizar keywords si se proporcionan
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Actualizar canonical si se proporciona
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonical);
      }
    }

    // Actualizar Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImg = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    if (ogDesc) ogDesc.setAttribute('content', description);
    if (ogImg && ogImage) ogImg.setAttribute('content', ogImage);
    if (ogUrl && canonical) ogUrl.setAttribute('content', canonical);

    // Actualizar Twitter Cards
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    const twImg = document.querySelector('meta[name="twitter:image"]');

    if (twTitle) twTitle.setAttribute('content', fullTitle);
    if (twDesc) twDesc.setAttribute('content', description);
    if (twImg && ogImage) twImg.setAttribute('content', ogImage);

    // Cleanup: restaurar valores por defecto al desmontar
    return () => {
      document.title = 'Ingecotol Ltda | Telecomunicaciones en Colombia';
    };
  }, [title, description, keywords, canonical, ogImage]);

  // Este componente no renderiza nada visible
  return null;
}
