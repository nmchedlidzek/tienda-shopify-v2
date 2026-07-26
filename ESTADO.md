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
- [x] 1 Conexión + sondeo (tema OK; catálogo leído por HTTP directo con token
      de app personalizada)
- [x] 2 Proyecto (Dawn descargado y primera subida de validación)
- [ ] 3 Diseño (propuesta enviada al usuario, pendiente de confirmación)
- [ ] 4 Construcción
- [ ] 5 Páginas
- [ ] 6 Publicación

## Decisiones de diseño
(pendiente de confirmación del usuario — ver mensaje 2)

## Secciones creadas
(se rellena en la fase 4)
