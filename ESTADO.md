# Estado del proyecto — autods-user-store-27923-ndpmhhbj

- Tienda: autods-user-store-27923-ndpmhhbj.myshopify.com
- Carpeta: raíz de este repositorio
- Tema base: Dawn (descargado 2026-07-26, vía `shopify theme init --clone-url`)
- Tema de trabajo en Shopify: "Tienda (Claude)" — id 166158106713 (NO publicado)
- Entorno: Node v22.22.2, Shopify CLI 4.5.2 — OK
- Preview: https://autods-user-store-27923-ndpmhhbj.myshopify.com?preview_theme_id=166158106713
- Última publicación: primera subida de validación (Dawn sin modificar)

## Notas de entorno importantes

- Esta sesión corre en un contenedor remoto (no es el ordenador del usuario).
  El login de `shopify theme` funciona con código de verificación (device
  code) — ya autenticado con éxito.
- `shopify store auth` (el mecanismo que documenta la skill para leer/escribir
  producto) usa un flujo OAuth con redirección a localhost que NO puede
  completarse en este entorno remoto. Alternativa que SÍ funciona y ya está en
  marcha: app personalizada "driveee" (Dev Dashboard, creada por AutoDS),
  instalada en la tienda, con scopes `write_products,write_files` (implican
  lectura). Client ID y Secret guardados SOLO fuera del repo
  (`/tmp/claude-.../scratchpad/.token` — token de acceso de 24h, nunca se
  commitea). Cada vez que caduque (~24h), repetir el intercambio:
  `POST https://<tienda>/admin/oauth/access_token` con
  `grant_type=client_credentials&client_id=...&client_secret=...` y volver a
  pedir el Client ID/Secret al usuario si esta sesión termina.
- El Client ID de la app es `91fea6d3c816f29f13409af4f2c73b77`. El Client
  Secret NO se guarda en este archivo (es sensible); está solo en el
  scratchpad de la sesión. Si hace falta en una sesión nueva, pedírselo de
  nuevo al usuario (Dev Dashboard → app driveee → Configuración → Secreto).
- Las consultas/mutaciones GraphQL de `scripts/gql/*.graphql` de la skill se
  usan igual, pero llamadas por HTTP directo (curl/node) con
  `X-Shopify-Access-Token: <token>` en vez de `shopify store execute`.

## Catálogo leído (12 productos activos, tienda de gadgets/tecnología)

Fotos de referencia (portada de cada uno) descargadas en `fotos-producto/`.
Fotos típicas de proveedor (collage, texto superpuesto, fondos inconsistentes)
— buena calidad de contenido pero necesitan cuidado o limpieza IA para hero.

0. 120W Cordless Handheld Vacuum Cleaner (mini, portátil, coche) — 4 fotos
1. WS2812B Smart Pixel LED Strip (RGB, direccionable) — 8 fotos, 24 variantes
2. Smart Fingerprint Padlock — 7 fotos
3. Salange P300 Mini Portable Projector (4K/8K, Android, WiFi) — 7 fotos
4. Mini SLR-Shaped 1080P Pocket DV Camera (cámara de acción) — 7 fotos
5. Mini Retro White Noise Bluetooth Speaker — 9 fotos
6. Mini Projector 1080P Full HD — 9 fotos, 12 variantes
7. Metal Expansion Phone Stand (magnético, carga 15W) — 9 fotos
8. EU Plug Smart Power Strip (USB, multitoma) — 7 fotos
9. E88 Pro Foldable Quadcopter Drone (4K, WiFi FPV) — 13 fotos ★ visual
10. D5 Starry Moon Lamp (lámpara LED 7 colores) — 9 fotos ★ visual
11. Bluetooth Sleep Headband (auriculares para dormir) — 8 fotos

Candidatos a héroe de portada (más fotogénicos/vistosos): dron (9), lámpara
luna (10), mini proyector (6), altavoz retro (5).

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión + sondeo
- [x] 2 Proyecto (Dawn descargado y primera subida de validación)
- [x] 3 Diseño — confirmado por el usuario: marca "VOLTA", enfoque en 4
      productos de la misma categoría ("esenciales de hogar inteligente"):
      aspiradora de mano, regleta inteligente, tira LED, candado con huella.
      Paleta: fondo #F7F8FA, texto #14161A, acento azul eléctrico #2F5FFF,
      esquinas redondeadas, tipografía Assistant (la de Dawn, reutilizada vía
      var(--font-heading-family)/var(--font-body-family) para que todo el
      tema — carrito, buscador — vaya a juego).
- [x] 3b Fotos IA — clave de OpenAI guardada en `clave-openai.txt` (fuera de
      git). Generadas y subidas a la galería de cada uno de los 4 productos
      destacados (fondo de estudio limpio, sin texto/marcas de agua) +
      favicon (monograma "V") + imagen de estilo de vida para la sección de
      marca. Coste aproximado: ~0,30-0,40 $ (6 imágenes, calidad medium/high).
- [x] 4 Construcción — secciones propias creadas (ver abajo) + portada
      montada en `templates/index.json`.
- [x] 5 Páginas — página de producto (`mt-producto.liquid` +
      `templates/product.mt.json`, sufijo `mt`) asignada automáticamente vía
      Admin API a los 12 productos activos del catálogo (no solo los 4
      destacados, para que cualquier producto que se abra desde el catálogo
      completo luzca igual de cuidado). Título + descripción reescritos en
      español para los 4 destacados. Header con nombre de marca editable
      (ajusta `logo_texto` en el editor si se sube un logo de imagen más
      adelante). Footer reescrito (marca + navegación + políticas +
      newsletter desactivada). Favicon propio.
      PENDIENTE (requiere acción del usuario, no técnica): políticas legales
      (privacidad, términos, devoluciones, envíos) — panel → Configuración →
      Políticas → "Crear a partir de plantilla". El footer ya enlaza ahí solo.
- [x] 6 Publicación (parcial) — subido como tema de trabajo NO publicado
      (id 166158106713), auto-revisado leyendo el HTML servido en preview
      (portada y ficha de producto, sin errores de Liquid/schema). Pendiente
      el visto bueno del usuario para publicarlo como tema activo.

## Precios (a petición del usuario, 2026-07-26)

Recalculados para los 4 productos destacados con margen ×3 sobre el coste
real (Admin API → `inventoryItem.unitCost`), redondeados a la baja en .99:
- Aspiradora: 26.99 → 28.99 (coste 9.51)
- Regleta inteligente: 16.99 → 39.99 (coste 13.11)
- Candado con huella: 13.00 → 30.99 (coste 10.32)
- Tira LED (24 variantes por longitud/voltaje/color): 12.99 a 125.99, cada
  una × 3 sobre su coste individual.
Los otros 8 productos del catálogo NO se han tocado (mantienen su precio
original con descuento ya configurado por AutoDS).

## Secciones creadas (assets/ y sections/)
- `mt-styles.css` / `mt-scripts.js` — tokens de marca + JS (reveal, hero
  rotativo, cuenta atrás, marquesina, galería y variantes de producto).
- `sections/mt-hero.liquid` — héroe rotativo (4 bloques = 4 productos).
- `sections/mt-beneficios.liquid` — barra de confianza (envío/garantía/
  devolución/pago).
- `sections/mt-productos-destacados.liquid` — rejilla de los 4 productos
  estrella con precio en vivo desde el catálogo.
- `sections/mt-historia.liquid` — historia de marca + cifras animadas.
- `sections/mt-resenas.liquid` — reseñas (texto de ejemplo, editable).
- `sections/mt-marquee-catalogo.liquid` — marquesina infinita.
- `sections/mt-cta-final.liquid` — llamada final a ver el catálogo.
- `sections/mt-producto.liquid` — página de producto completa (galería,
  variantes, precio dinámico, confianza, características, qué incluye).
- `templates/index.json` — portada montada con las secciones de arriba +
  `featured_collection` nativa de Dawn (todo el catálogo, se actualiza sola
  según se añadan productos).
- `templates/product.mt.json` — plantilla de producto (sufijo `mt`).
- Header (`sections/header.liquid`): añadido `logo_texto` (texto de marca
  editable, por defecto "VOLTA") como alternativa a subir una imagen de logo.
- Footer (`sections/footer-group.json`): marca + navegación + políticas.
- `assets/mt-favicon.png`, `mt-*-hero.jpg`, `mt-historia-fondo.jpg`.

## Correcciones tras feedback del usuario (2026-07-26, segunda ronda)

1. **Catálogo reducido a 3-4 productos.** Los otros 8 productos (dron,
   proyectores, cámara, altavoz, base de móvil, lámpara luna, diadema) se
   pasaron a **borrador** (`status: DRAFT`) vía Admin API — ya NO aparecen en
   la tienda online (ni en el catálogo, ni en el buscador, ni por enlace
   directo). Siguen existiendo en el backend por si se quieren recuperar.
   La sección nativa `featured_collection` (que mostraba "todo el catálogo")
   se ha quitado de la portada por quedar redundante con "Esenciales de hogar
   inteligente" ahora que solo hay 4 productos.
2. **Galería 100% limpia.** Antes solo se había subido 1 foto IA por producto
   y se dejaban las fotos de proveedor (con texto/collage) en la galería. Se
   generaron 2 fotos limpias más por producto (detalle + ángulo/vida
   cotidiana) y se **borraron todas las fotos originales de proveedor** de
   los 4 productos destacados. Cada uno tiene ahora 3 fotos propias, sin
   texto ni marcas de agua.
3. **Espaciado corregido.** Los huecos entre secciones eran demasiado grandes
   y desiguales (hasta 1000px sumados). Se ha reducido y homogeneizado el
   espaciado de todas las secciones (registrado en cada ajuste de "Espacio
   superior/inferior" del editor).

## Nota pendiente (cosmética, no bloqueante)
El título de la pestaña del navegador usa el nombre real de la tienda en
Shopify (`autods-user-store-27923`), no "VOLTA", porque ese nombre vive en
Configuración → General y no lo he tocado (cambiarlo no es necesario para
que la web se vea bien, pero si el usuario quiere que la pestaña diga
"VOLTA" hay que cambiarlo ahí).
