// Datos de productos de tecnología - Fuente única de verdad
export const products = [
  {
    id: 1,
    name: "Smart Watch Pro 2",
    category: "Wearables",
    price: "$300.000",
    image: "/images/tienda/watchpro2/1.jpg",
    images: [
      "/images/tienda/watchpro2/1.jpg",
      "/images/tienda/watchpro2/2.png",
      "/images/tienda/watchpro2/3.png",
      "/images/tienda/watchpro2/4.png",
      "/images/tienda/watchpro2/5.png",
    ],
    video: "/images/tienda/watchpro2/6.mp4",
  },
  {
    id: 2,
    name: "Lenovo thinkplus XT88",
    category: "Audio",
    price: "$50.000",
    image: "/images/tienda/xt88/1.png",
    images: [
      "/images/tienda/xt88/1.png",
      "/images/tienda/xt88/2.png",
      "/images/tienda/xt88/3.png",
      "/images/tienda/xt88/4.png",
    ],
  },
  {
    id: 3,
    name: "Colmi P81",
    category: "Wearables",
    price: "$85.000",
    image: "/images/tienda/colmip81/1.webp",
    images: [
      "/images/tienda/colmip81/1.webp",
      "/images/tienda/colmip81/2.webp",
      "/images/tienda/colmip81/3.png",
      "/images/tienda/colmip81/4.webp",
      "/images/tienda/colmip81/5.webp",
    ],
  },
  {
    id: 4,
    name: "Cable HDMI",
    category: "Cables",
    price: "$10.500", // Precio base (mostrado en tarjeta)
    hasVariants: true,
    variants: [
      { label: "1.5 metros", price: "$10.500" },
      { label: "1.8 metros", price: "$13.000" },
      { label: "3 metros", price: "$18.000" },
      { label: "5 metros", price: "$30.000" },
    ],
    image: "/images/tienda/hdmi/1.png",
    images: [
      "/images/tienda/hdmi/1.png",
      "/images/tienda/hdmi/2.png",
    ],
  },
  {
    id: 5,
    name: "Tarjetero MagSafe iPhone",
    category: "Accesorios",
    price: "$30.000", // Precio base
    hasColorAndPackaging: true, // Nuevo tipo de variante: color + empaque
    colors: [
      { label: "Negro", image: "/images/tienda/wallet/Black 1.png" },
      { label: "Azul", image: "/images/tienda/wallet/Blue 1.png" },
      { label: "Café", image: "/images/tienda/wallet/Brown 1.png" },
      { label: "Morado Oscuro", image: "/images/tienda/wallet/Dark purple 1.png" },
    ],
    packagingOptions: [
      { label: "Sin caja", price: "$30.000" },
      { label: "Con caja", price: "$40.000" },
    ],
    // Disponibilidad: color -> opciones de empaque disponibles
    availability: {
      "Negro": ["Sin caja"],
      "Azul": ["Sin caja"],
      "Café": ["Sin caja"],
      "Morado Oscuro": ["Con caja"],
    },
    image: "/images/tienda/wallet/Black 1.png",
    images: [
      "/images/tienda/wallet/Black 1.png",
      "/images/tienda/wallet/Blue 1.png",
      "/images/tienda/wallet/Brown 1.png",
      "/images/tienda/wallet/Dark purple 1.png",
    ],
  },
  {
    id: 6,
    name: "Toner Genérico",
    category: "Impresión",
    price: "$30.000",
    hasVariants: true,
    variantLabel: "referencia",
    variants: [
      { label: "CF258A No Chip", price: "$30.000", image: "/images/tienda/toner/CF258A_NoChip.png" },
      { label: "MLT-D111 Upgraded", price: "$30.000", image: "/images/tienda/toner/MLT_D11L_Upgraded.png" },
    ],
    image: "/images/tienda/toner/CF258A_NoChip.png",
    images: [
      "/images/tienda/toner/CF258A_NoChip.png",
      "/images/tienda/toner/MLT_D11L_Upgraded.png",
    ],
  },
];

export default products;
