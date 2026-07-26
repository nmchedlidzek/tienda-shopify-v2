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
- `shopify store auth` (necesario para leer/escribir el producto vía Admin
  API) usa un flujo OAuth con redirección a localhost que NO puede completarse
  en este entorno remoto (no hay navegador del usuario que pueda alcanzar el
  puerto local del contenedor). Pendiente: pedir al usuario un token de Admin
  API mediante una app personalizada creada desde su panel (alternativa sin
  navegador), para poder leer/escribir el producto por HTTP directo en vez de
  `shopify store execute`.

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión (tema OK; datos del producto pendiente del token de app personalizada)
- [x] 2 Proyecto (Dawn descargado y primera subida de validación)
- [ ] 3 Diseño
- [ ] 4 Construcción
- [ ] 5 Páginas
- [ ] 6 Publicación

## Decisiones de diseño
(se rellena en la fase 3)

## Secciones creadas
(se rellena en la fase 4)
