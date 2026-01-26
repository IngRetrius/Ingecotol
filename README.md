# Ingecotol ltda - Website

Sitio web corporativo para Ingecotol ltda, empresa de ingenieria civil y telecomunicaciones.

## Tech Stack

- **React** 19.1.1
- **Vite** 7.1.2
- **Tailwind CSS** 4.1.12
- **GSAP** 3.13.0 (animaciones)
- **Lenis** 1.3.11 (smooth scrolling)
- **React Router** 7.8.2

## Inicio Rapido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para produccion
pnpm build

# Vista previa de build
pnpm preview
```

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/          # Paginas principales
├── sections/       # Secciones del sitio
├── hooks/          # Custom hooks
├── theme/          # Configuracion de colores
└── router/         # Configuracion de rutas
```

## Rutas

- `/` - Pagina de bienvenida
- `/app` - Aplicacion principal con todas las secciones
- `/tienda` - Catalogo de productos

## Deployment

Configurado para Vercel. El archivo `vercel.json` contiene las rewrites necesarias para SPA.

## Documentacion

Ver `CLAUDE.md` para documentacion tecnica detallada.
