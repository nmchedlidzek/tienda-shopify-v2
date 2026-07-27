# Estado del proyecto — autods-user-store-27923-ndpmhhbj

- Tienda: autods-user-store-27923-ndpmhhbj.myshopify.com
- Carpeta: raíz de este repositorio
- Tema base: Dawn (descargado 2026-07-26, vía `shopify theme init --clone-url`)
- Tema de trabajo en Shopify: "Tienda (Claude)" — id 166158106713 — **PUBLICADO
  (tema activo/live)** desde que el usuario lo publicó él mismo.
- Entorno: Node v22.22.2, Shopify CLI 4.5.2 — OK
- Dominio real de la tienda: **myvolta.es** (comprado y puesto como dominio
  principal por el usuario). El myshopify.com (ahora con handle
  `voltaaaa-store`, antes `autods-user-store-27923`) redirige automáticamente
  a myvolta.es. IMPORTANTE: `shopify theme push` a partir de ahora necesita
  el flag `--allow-live` porque el tema ya está publicado.
- Nombre de cuenta Shopify (Configuración → General): el usuario lo cambió a
  VOLTA (antes "autods-user-store-27923").

## Sexta ronda: 8 productos nuevos + categorías (misma noche)

Usuario importó 8 productos nuevos desde AutoDS (variedad de nicho, no solo
"hogar inteligente"). Se procesaron igual que los 4 originales: fotos IA
limpias (fondo de estudio, sin texto), título/descripción en español,
precio ×3 sobre coste, plantilla `mt` asignada. Los 8 productos nuevos:
difusor de aromas, tira LED para coche, altavoz bici, altavoz ducha, tira
LED RGB con app, diadema bluetooth para dormir, báscula de cocina,
limpiador de pantallas. (Ojo: el altavoz de bici trae de fábrica el logo
"T&G" visible en la foto — es la marca real del fabricante, no algo que
haya inventado yo; mencionado al usuario pendiente de decidir si le vale.)

Se crearon 4 colecciones (categorías) y se repartieron los 12 productos
activos:
- **Hogar inteligente** (`hogar-inteligente`): aspiradora, regleta, candado,
  difusor de aromas — 4 productos.
- **Iluminación LED** (`iluminacion-led`): tira LED WS2812B, tira LED RGB app,
  tira LED coche — 3 productos.
- **Audio y sonido** (`audio-y-sonido`): altavoz bici, altavoz ducha, diadema
  — 3 productos.
- **Cocina y accesorios** (`cocina-y-accesorios`): báscula, limpiapantallas
  — 2 productos.

Nueva sección `sections/mt-categorias.liquid` (rejilla de categorías) añadida
a la portada tras la barra de confianza. `mt-productos-destacados` pasa a
llamarse "Los más vendidos" (los 4 originales). Los 8 productos ocultados
antes (dron, proyectores, cámara, lámpara luna, etc.) siguen en borrador,
el usuario decidió dejarlos así.

RESUELTO: usuario reinstaló la app con el scope `write_publications`
concedido; las 4 colecciones se publicaron en el canal "Tienda online"
(`publishablePublish`) y ya cargan correctamente (200) en myvolta.es.

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

## Tercera ronda de correcciones (misma noche, tras captura real del usuario)

1. **FALLO GRAVE encontrado y corregido**: las secciones con animación de
   aparición al hacer scroll (`.mt-reveal`) tenían `opacity: 0` por defecto en
   el CSS puro, dependiendo de que el JavaScript llegara a tiempo a añadir
   `.mt-visible`. En la práctica, se veían huecos en blanco enormes entre el
   héroe y el pie (confianza, destacados, historia, reseñas — todo
   invisible). Arreglado con un patrón "a prueba de fallos": el contenido es
   SIEMPRE visible por defecto; solo si el JS arranca bien se añade
   `.mt-reveal-armed` y a partir de ahí se anima. Además cada función de
   `mt-scripts.js` corre ahora en su propio try/catch para que un fallo en
   una no bloquee las demás.
2. **Contraste mejorado**: el fondo gris claro (`--mt-bg`) se ha oscurecido
   ligeramente (de #F7F8FA a #EEF1F7) y las tarjetas de producto llevan
   borde sutil, para que las secciones no se fundan unas con otras en blanco.
3. **Fotos más "llenas"**: las fotos de producto (que traen aire alrededor
   por ser fotos de estudio) se recortan un poco más de cerca con un zoom
   sutil (`transform: scale`) en las tarjetas, para que el producto se vea
   más grande dentro de su marco.
4. **Preguntas frecuentes** (`sections/mt-faq.liquid`, acordeón): añadida a
   la portada y a la página de producto.
5. **Reseñas con avatar**: cada reseña ahora lleva un círculo con la
   inicial del nombre (color de marca), insignia de "verificado" y un campo
   de detalle (ej. "Compra verificada"), inspirado en el ejemplo que pasó el
   usuario.

Pendiente para una próxima ronda (footer más completo estilo "Explora /
Ayuda y legal" con enlaces reales): necesita permiso adicional de la Admin
API (gestión de menús de navegación) que hoy no está concedido — se puede
pedir cuando el usuario quiera ese nivel de detalle en el pie.

## Cuarta ronda: pie de página + honestidad del contenido (misma noche)

1. **Pie de página**: añadida columna fija "Ayuda y legal" (no depende de
   menús de Shopify, así que no necesita permisos nuevos): Contacto
   (`mailto:` al correo real de la tienda) + enlaces a políticas nativas
   (aparecerán en cuanto el usuario las rellene en el panel). Se quitó el
   bloque de navegación duplicado que solo mostraba "Search".
2. **Contenido de relleno corregido tras pregunta directa del usuario**:
   - Las reseñas llevaban una insignia de "verificado" siendo texto 100%
     inventado — **quitada** (`verificado: false` por defecto) y marcadas
     como "Reseña de ejemplo — sustitúyela" hasta que el usuario ponga
     reseñas reales.
   - Quitada la cifra "Envío en 48h" de la sección de historia (inventada,
     poco realista para dropshipping) y la de "2 años de garantía"
     (también inventada). Sustituidas por cifras seguras: nº de productos
     seleccionados y "revisados antes de vender".
   - PENDIENTE de verificar con el usuario (no se ha tocado, solo señalado):
     el texto de la FAQ dice "envío en 3-7 días laborables" y "devolución
     en 30 días" — son valores de mercado habituales que redacté yo, NO
     confirmados con el proveedor real. Antes de publicar en serio, pedir al
     usuario sus tiempos de envío reales y confirmar la política de
     devoluciones.

## Quinta ronda: pie completo + políticas legales reales

1. **Permiso ampliado**: se añadió el scope `write_legal_policies` a la app
   "driveee" (shopify.app.toml + deploy) y el usuario reinstaló la app para
   concederlo.
2. **Políticas escritas de verdad vía Admin API** (`shopPolicyUpdate`),
   adaptadas al modelo real del negocio (dropshipping sin stock propio,
   confirmado por el usuario): Envíos, Devoluciones, Términos y condiciones.
   Redactadas en español, con el aviso legal de que son una BASE y no
   asesoría legal — el usuario debería revisarlas o pasarlas a un gestor
   antes de un lanzamiento serio.
   - Privacidad: el usuario desactivó la gestión automática desde el panel
     y se reescribió también en español vía API. Las 4 políticas
     (envíos, devoluciones, términos, privacidad) están ya en español.
3. **Pie de página completo**: dos columnas —"Explora" (Inicio, Comprar,
   Cómo funciona, Opiniones, con anclas reales a las secciones de la
   portada) y "Ayuda y legal" (Contacto por email, Preguntas frecuentes,
   y las políticas — con etiqueta en español aunque el título nativo de
   Shopify esté en inglés).

## Nota pendiente (cosmética, no bloqueante)
El título de la pestaña del navegador usa el nombre real de la tienda en
Shopify (`autods-user-store-27923`), no "VOLTA", porque ese nombre vive en
Configuración → General y no lo he tocado (cambiarlo no es necesario para
que la web se vea bien, pero si el usuario quiere que la pestaña diga
"VOLTA" hay que cambiarlo ahí).

## Séptima ronda: precios competitivos (misma noche)

A petición del usuario, se investigaron precios reales de la competencia
(Amazon España, búsquedas por categoría) y se recalcularon TODOS los
precios de los 12 productos con un multiplicador ajustado por categoría
(entre x2,0 y x2,75 sobre coste — nunca por debajo de x2), en vez del x3
plano anterior que dejaba varios productos por encima de mercado
(sobre todo el difusor de aromas y la tira LED de coche, que bajaron un
~30-35%). Resumen de multiplicadores aplicados:

- Difusor de aromas: x2,0 (48-50€ → 33€)
- Tira LED coche: x2,2 (63-112€ → 46-82€)
- Altavoz bici: x2,3 (42-43€ → 32-33€)
- Altavoz ducha: x2,6 (17-18€ → 15€)
- Tira LED RGB app: x2,2 (34-39€ → 25-28€)
- Diadema: x2,75 (24-25€ → 22-23€)
- Báscula cocina: x2,65 (15€ → 13-14€)
- Limpiapantallas: x2,55 (17€ → 14-15€)
- Aspiradora: x2,6 (29€ → 25€)
- Regleta: x2,15 (40€ → 29€)
- Candado: x2,7 (31€ → 28€)
## Octava ronda: animaciones más visibles + fotos mínimas por producto

El usuario avisó de que las animaciones "respiración" de las fotos (tarjetas
de producto, tarjetas de categoría, galería de producto) apenas se notaban
pese a estar correctamente desplegadas. Se subió la intensidad en los tres
sitios: rango de zoom ampliado de ~1,00-1,06 a 1,08-1,24 (antes apenas un
5-6%, ahora ~15%), duración acortada de 7-9s a 5s, y el zoom al pasar el
ratón por encima subido a 1,3x. Afecta a:
- `assets/mt-styles.css` → `.mt-card-media img` / `@keyframes mt-card-breathe`
- `sections/mt-categorias.liquid` → `@keyframes mt-cat-breathe`
- `sections/mt-producto.liquid` → `@keyframes mt-kenburns`

También se detectó que la tarjeta de categoría "Audio y sonido" usaba la
misma foto que el producto destacado "Altavoz Bluetooth para Ducha" en "Los
más vendidos" (y lo mismo pasaba con "Hogar inteligente" vs el difusor de
aromas) — el usuario lo señaló como algo que quedaba raro/repetitivo.
Solucionado asignando fotos distintas a cada tarjeta de categoría vía el
setting `imagen_asset`: Audio y sonido → foto del altavoz de bici, Hogar
inteligente → foto del candado (ninguna de las dos coincide ya con las
fotos de "Los más vendidos").

El usuario pidió mínimo 3 fotos por producto para que la galería
auto-rotatoria tenga contenido real que animar (antes solo los 4 productos
originales tenían 3 fotos; los 8 nuevos solo tenían 1). Se generaron 2 fotos
adicionales por producto (ángulo distinto + foto de estilo de vida en un
hogar) con `generar-foto.mjs` usando la foto ya limpia como referencia, y se
subieron vía `stagedUploadsCreate` + `productCreateMedia`. Los 12 productos
activos del catálogo tienen ahora 3 fotos cada uno.

**Nota técnica**: la API de subida `stagedUploadsCreate` cambió de formato
—ya no devuelve parámetros de formulario POST estilo Google Cloud Storage
clásico, sino una URL firmada V4 para subir con `PUT` directo (headers
`Content-Type`, cuerpo = bytes del archivo). El flujo antiguo con
`FormData`/POST devolvía 403 `SignatureDoesNotMatch`. Ajustado en el script
de subida.

**Pago no configurado**: el usuario probó a comprar en la tienda real y el
checkout mostró "This store can't accept payments right now" — no hay
ningún método de pago activado todavía. Esto requiere que el propio usuario
active Shopify Payments (o PayPal) en Configuración → Pagos con sus datos
bancarios/fiscales reales; no es algo que se pueda hacer vía API. Pendiente
de que el usuario lo active y se verifique el checkout.

**Productos nuevos detectados a medio importar**: mientras se trabajaba se
detectaron 5 productos más ya ACTIVOS y visibles en la tienda en vivo
(cargador de coche, luz solar de pared, ventilador 3 en 1, proyector de
galaxia, chimenea difusora) con título en inglés, precio a coste (sin
margen) y sin categoría asignada — el usuario mencionó que iba a añadir
más productos. Señalado al usuario, pendiente de confirmación antes de
procesarlos igual que la tanda anterior (título/descripción en español,
fotos limpias, precio competitivo, categoría).

## Novena ronda: hero de portada en móvil + 5 productos nuevos procesados

**Hero de portada — foto fea + hueco en blanco en móvil**: el usuario señaló
dos problemas de la portada:
1. La foto de la tira LED en el carrusel superior (cables sueltos sobre
   fondo negro, foto cruda del proveedor) se sustituyó por la foto de
   ambiente ya existente (tira instalada en un mueble de salón). El
   recuadro del hero pasó de 4:3.4 a formato cuadrado 1:1 y se le añadió
   la misma animación de "respiración" que el resto del sitio. Se añadió
   el mismo workaround `imagen_asset` (texto → asset_url) que ya usaban
   las tarjetas de categoría.
2. En móvil, la portada dejaba un hueco en blanco enorme debajo del hero:
   la media query `@media (max-width: 989px)` forzaba `position: relative`
   en TODAS las slides del hero (visible u ocultas), así que las 3 slides
   invisibles seguían ocupando su altura completa en el documento. Corregido
   restringiendo esa regla solo a `.mt-hero-slide.mt-visible`.

**5 productos nuevos procesados** (importados por el usuario desde AutoDS,
detectados a medio importar en la ronda anterior — título en inglés, precio
a coste, sin categoría, fotos crudas del proveedor):

| Producto | Categoría | Precio |
|---|---|---|
| Cargador de Coche Rápido 66W con Pantalla Digital y 4 Puertos USB | Hogar inteligente | 14,99-15,99€ |
| Foco Solar de Pared con Sensor de Movimiento, 190 LED, IP65 | Iluminación LED | 26,99€ |
| Mini Ventilador Portátil 3 en 1 con Humidificador y Luz Nocturna | Hogar inteligente | 31,99-32,99€ |
| Proyector de Galaxia y Olas del Océano LED con Mando a Distancia | Iluminación LED | 22,99€ (2 uds: 30,99€) |
| Difusor de Aromas con Efecto Chimenea 3D y Humidificador | Hogar inteligente | 68,99-69,99€ |

Para cada uno: título y descripción en español, fotos limpias generadas por
IA (mínimo 3 por producto: estudio + ángulo distinto + estilo de vida),
fotos crudas del proveedor eliminadas, precio con multiplicador ≥x2,3 sobre
coste (excepto el cargador de coche a x3,0, y el difusor chimenea a x2,0
por su coste ya elevado), y añadidos a su colección correspondiente.

**Nota sobre el difusor de chimenea**: el import de AutoDS traía mezclados
como si fueran "variantes de color" dos packs de aceites esenciales ("4
Packs Eo Set" / "6 Packs Eo Set") junto a las opciones reales del producto
(Blanco/Negro) — un cliente que eligiera "4 Packs Eo Set" pensando que era
un color habría recibido solo botes de aceite, no el difusor. Se eliminaron
esas 2 variantes-señuelo, dejando solo Blanco/Negro como opciones reales.
Es un diseño distinto (más grande, forma de chimenea rectangular) al
difusor geométrico que ya teníamos, así que no es un duplicado, aunque
ambos son de la misma marca del proveedor (Kinscoter) y categoría.

**Pendiente importante — moneda de la tienda**: la tienda está configurada
en USD (`currencyCode: "USD"`), no en EUR, pese a ser una tienda española
en myvolta.es — el checkout y las páginas de producto muestran precios en
dólares. Esto no se puede cambiar vía API; hay que cambiarlo el usuario
en Configuración → General → Moneda de la tienda (normalmente solo se
puede cambiar mientras no haya pedidos reales, que es el caso ahora).

## Décima ronda: fotos de ambiente corregidas + 9 productos nuevos más

**Fotos de ambiente del hero — correcciones**: al usuario le encantó el
estilo de las fotos de ambiente, pero señaló incoherencias en dos:
- Regleta: el enchufe aparecía suelto sin conectar a ninguna toma pese al
  testigo luminoso encendido. Nueva versión con el cable claramente
  enchufado a la pared (`mt-powerstrip-ambiente2.jpg`).
- Candado: la escena en una mochila no resultaba creíble. Nueva versión
  asegurando la puerta de una taquilla de gimnasio, un uso real
  (`mt-padlock-ambiente2.jpg`).

**9 productos nuevos procesados** (el usuario dijo haber importado 7, pero
al revisar el catálogo activo aparecieron 9 sin procesar — puede que 2
llevaran ahí desde antes sin catalogar; se avisó al usuario y se
procesaron los 9):

| Producto | Categoría | Precio |
|---|---|---|
| Quitapelusas Eléctrico y Removedor de Pelo de Mascota | Hogar inteligente | 9,99-20,99€ |
| Alfombrilla de Baño de Diatomita Antideslizante | Hogar inteligente | 28,99-73,99€ (10 tamaños) |
| Estante de Baño de Aluminio sin Taladro | Hogar inteligente | 17,99-18,99€ |
| Abrebotellas de Pared de Aleación de Zinc | Cocina y accesorios | 8,99€ |
| Abridor Eléctrico Automático de Vino | Cocina y accesorios | 30,99€ |
| Guirnalda de Luces LED Rama de Abedul | Iluminación LED | 14,99-34,99€ |
| Copa de Cóctel Creativa (varios diseños) | Cocina y accesorios | 4,99-25,99€ |
| Quemador de Incienso Cerámico de Reflujo | Hogar inteligente | 23,99€ |
| Termo de Viaje de Acero Inoxidable | Cocina y accesorios | 22,99-25,99€ |

Mismo proceso que las rondas anteriores: título y descripción en español,
3 fotos limpias por producto generadas por IA (estudio + ángulo distinto +
estilo de vida, sustituyendo las fotos crudas del proveedor), precio con
multiplicador ≥x2,0 sobre coste, y asignados a la colección que mejor
encaja.

**Nota sobre el encaje de categorías**: varios de estos productos (alfombrilla
de baño, estante de baño, copas de cóctel, abrebotellas) ya no son
estrictamente "gadgets de hogar inteligente" como el enfoque original de
la tienda, sino artículos generales de casa/cocina. Se han colocado en la
categoría más cercana disponible (Hogar inteligente o Cocina y accesorios)
sin crear categorías nuevas. Si el catálogo sigue creciendo en esta
dirección, en algún momento puede valer la pena crear una categoría nueva
tipo "Cocina y bar" o "Baño" en vez de forzarlo todo en las 4 actuales.

## Undécima ronda: "Los más vendidos" ampliado + aduanas actualizadas

**Los más vendidos**: ampliada de 4 a 6 productos (rejilla de 3 columnas
en vez de 4) para incluir el quemador de incienso y el proyector de
galaxia, a petición del usuario, junto a los 4 que ya estaban (aspiradora,
difusor, tira LED WS2812B, altavoz ducha). No hay datos reales de ventas
todavía (la tienda no ha vendido nada real), así que la selección se basó
en atractivo visual y potencial de conversión, no en ventas reales.

**Aduanas — cambio normativo real de julio 2026**: el usuario preguntó si
habría problemas con el envío del proveedor al comprador. Se investigó y
se confirmó un cambio reciente y relevante: desde el 1 de julio de 2026
la UE eliminó la exención de aduanas de 150€ y aplica una **tasa fija de
3€ por categoría de producto (código HS6)** en envíos desde fuera de la UE,
sin importar el valor del pedido (medida transitoria hasta 2028). El IVA
no cambia — ya se aplicaba desde 2021 vía IOSS. No se ha podido confirmar
cómo gestiona AutoDS concretamente esta tasa en sus envíos (si la absorbe,
la repercute, o genera retrasos); se recomendó al usuario consultarlo
directamente con AutoDS. Se actualizó el texto real de la política de
envíos (Aduanas e impuestos) y la respuesta de la FAQ para reflejar esto
con precisión en vez de la redacción genérica anterior ("es posible que
se apliquen aranceles").

## Duodécima ronda: pulido de microinteracciones (filosofía Emil Kowalski)

El usuario pidió mejorar la web con la "skill de Emil Kowalski" (diseñador
conocido por Vaul/Sonner y su curso de animación). No existe tal skill
instalada en esta sesión/rama — apareció en otra rama (`claude/emil-design-eng-skill-alnjmp`)
de otra conversación distinta, así que no estaba disponible aquí. Se
revisó el contenido de ese archivo (SKILL.md, 674 líneas, solo texto de
referencia, sin código ejecutable) antes de aplicar nada, y se usaron sus
principios directamente sobre el CSS de la tienda:

- **Feedback táctil en botones**: `:active { transform: scale(0.97) }` en
  todos los `.mt-btn` (incluye el botón de añadir al carrito, los CTA del
  hero y de las secciones), en las tarjetas de producto/categoría, en las
  miniaturas de la galería y en los selectores de variante — así la
  interfaz responde al instante a la pulsación.
- **`transition: all` eliminado**: sustituido por las propiedades exactas
  en los selectores de variante del producto (antes transicionaba todo,
  ahora solo border-color/background/color/transform).
- **Acordeón de FAQ más rápido**: de 350ms a 250ms (la guía recomienda
  150-250ms para este tipo de elemento; 350ms se siente algo lento).
- Se confirmó que ya cumplíamos otro principio clave sin querer: nunca
  animar entradas desde `scale(0)` (el reveal-on-scroll ya partía de
  `scale(0.98)`, no de 0).

## Decimotercera ronda: puntos del hero tapados por la sombra del botón (móvil)

El usuario mandó una captura desde el móvil mostrando que "lo azul tapa
los 4 recuadritos de abajo" — los puntos de navegación del carrusel del
hero (4 rectángulos pequeños, uno por diapositiva) viven en
`.mt-hero-dots`, posicionados en `position: absolute; bottom: 8px` dentro
del contenedor del hero. En escritorio esto cae muy por debajo del botón
gracias al `min-height` fijo. En móvil, al quitarse ese `min-height`, el
borde inferior del contenedor queda muy cerca del botón "Ver producto", y
la sombra azul difuminada del botón (`box-shadow` con blur de 24px) se
solapaba visualmente con los puntos, tapándolos.

Arreglado reservando una franja propia de 36px debajo del contenido en
móvil (`padding-bottom: 36px` en `.mt-hero-height`) y centrando los puntos
dentro de esa franja (`.mt-hero-dots { justify-content: center; left:0;
right:0; bottom:0; }`), separados del botón y de su sombra.

## Decimocuarta ronda: fotos más estéticas y consistentes (categorías + destacados)

El usuario señaló que varias tarjetas (categorías y "Los más vendidos")
mezclaban fotos de estudio planas sobre fondo blanco con la foto de la
tira LED, mucho más atmosférica sobre fondo oscuro — quedaba
inconsistente. Se unificó el estilo:

**Tarjetas de categoría** (mt-categorias.liquid, ya tenía el workaround
`imagen_asset`):
- Hogar inteligente: candado sobre fondo blanco → nueva foto de ambiente
  (candado asegurando un armario de madera oscura, luz cálida nocturna,
  `mt-padlock-categoria.jpg`, generada de nuevo)
- Iluminación LED: pasa a usar la foto de la rama de abedul iluminada
  (`mt-abedul-hero.jpg`, ya existente, oscura y cálida) en vez de que la
  colección eligiera automáticamente la primera foto (que era la tira LED
  de coche, poco favorecedora)
- Audio y sonido: altavoz de bici sobre fondo blanco → foto de estilo de
  vida ya existente (`mt-bicispeaker-c.jpg`, en un salón acogedor)
- Cocina y accesorios: termo sobre fondo blanco → nueva foto de ambiente
  (termo en una cocina de madera oscura al atardecer,
  `mt-termo-categoria.jpg`, generada de nuevo)

**"Los más vendidos"** (mt-productos-destacados.liquid — se le añadió el
mismo workaround `imagen_asset` que ya tenían el hero y las categorías,
antes solo usaba `product.featured_image`):
- Aspiradora → foto de ambiente ya existente (limpiando un sofá)
- Difusor → foto de estilo de vida ya existente (salón acogedor) en vez
  de la de estudio
- Tira LED WS2812B → la foto de ambiente ya existente (mueble de salón)
  en vez de la de estudio con cables sueltos
- Altavoz ducha → foto de estilo de vida ya existente (baño con gotas de
  agua) en vez de la de estudio
- Incienso y proyector de galaxia → ya tenían fotos atmosféricas de por
  sí, el proyector pasa a usar su foto de dormitorio nocturno en vez de
  la de estudio

Ninguna de estas fotos necesitó generarse de cero salvo las 2 de candado
y termo — el resto ya existían de rondas anteriores (fotos "b"/"c" de
cada producto) y solo hacía falta enlazarlas.

## Decimoquinta ronda: hero — más cambios de foto/producto, permiso de envíos

- La foto de la regleta (estilo UGC) le siguió sin gustar al usuario, que
  pidió cambiar el producto entero de esa diapositiva. Sustituida por el
  difusor de aromas (efecto llama), con nueva foto estilo UGC
  (`mt-difusor-ugc.jpg`) — luz natural, fondo de madera clara, encuadre
  de cliente real. `mt-powerstrip-ugc.jpg` se eliminó por quedar huérfana.
- **Permiso de envíos añadido**: se añadió `read_shipping`/`write_shipping`
  al scope de la app (shopify.app.toml en `/tmp/app-config`, fuera del
  repo), se desplegó y el usuario reinstaló la app. Con esto se pudo
  comprobar la configuración real de envíos por primera vez:
  - **Todos los 30 productos** (activos y borradores) están en el perfil
    **"AutoDS Free Shipping"**, que cubre la zona "Resto del mundo" con
    envío gratis — es decir, la tienda YA envía a cualquier país sin
    coste, incluida España. No hay ningún problema de configuración aquí.
  - Existe un segundo perfil ("General profile", el que Shopify crea por
    defecto) que solo cubre Estados Unidos con tarifas de pago
    ($8 estándar / $15 exprés), pero tiene 0 productos asignados — no
    afecta a nada, se puede ignorar o borrar si se quiere limpiar.

## Decimosexta ronda: Mercados (España/EE.UU./Internacional), bug de idioma e incidente de theme push

**Configuración de Mercados**: el usuario creó 3 mercados en el panel de
Shopify (no vía API, a mano): "España" (EUR), "United States" (USD, FX
dinámico) y "World" (~237 países restantes, con "usar monedas locales" —
recomendado para que cada visitante vea el precio en su propia moneda).
Esto es necesario además del envío: los Mercados controlan si un país
puede completar el checkout, aparte de si el envío llega allí.

**Bug de idioma corregido**: la cabecera HTTP `content-language` marcaba
"en-US" pese a que todo el contenido está en español. Causa real: en la
convención de temas de Shopify, el archivo de idioma con el sufijo
`.default` en el nombre es el idioma por defecto del tema — y el tema
tenía `en.default.json` (inglés) en vez de `es.default.json`. Se
renombraron los 4 archivos afectados (`en.default.json` → `en.json`,
`en.default.schema.json` → `en.schema.json`, `es.json` →
`es.default.json`, `es.schema.json` → `es.default.schema.json`) para que
español sea el idioma por defecto real del tema.

**INCIDENTE — la tienda estuvo caída unos minutos**: al hacer
`shopify theme push` tras el renombrado de locales, el CLI intentó
además **borrar del tema remoto casi todos los demás archivos**
(secciones, assets, snippets) —aparentemente confundido por el cambio de
nombres de los locales—, dejando solo `config/`, `layout/` y
`templates/` en el tema remoto; la web devolvía 404. Los únicos archivos
que sobrevivieron sin querer fueron los que Shopify protege de borrado
en un tema publicado (`layout/theme.liquid`, `config/settings_data.json`,
`config/settings_schema.json`, `templates/gift_card.liquid` — de ahí los
errores "no se pudo eliminar" en la consola, que en este caso fueron
positivos). Se detectó con un curl inmediato tras el push (404) y se
solucionó al momento haciendo `shopify theme push` de nuevo completo
desde el repositorio local (que estaba intacto en todo momento) —
recuperado en menos de un minuto, confirmado con `theme pull` que las 65
secciones y 279 assets volvían a estar todos en el tema remoto.
**Lección**: revisar siempre la salida completa de `theme push` en busca
de errores de "no se pudo eliminar" antes de dar por bueno un push, no
solo el mensaje final de "success"/"pushed with errors".

## Decimoséptima ronda: fotos de categoría demasiado oscuras

El usuario dijo que las 4 fotos de categoría (candado, abedul, altavoz de
bici, termo) quedaban "muy agobiantes" juntas — demasiado oscuras/de
ambiente nocturno en conjunto. Se regeneraron las 4 con un tono mucho más
suave y luminoso mismo estilo UGC (luz de día natural, fondos claros y
aireados) en vez del ambiente nocturno cinematográfico anterior:
`mt-padlock-categoria2.jpg`, `mt-abedul-categoria2.jpg`,
`mt-bicispeaker-categoria2.jpg`, `mt-termo-categoria2.jpg`. Las versiones
oscuras anteriores (candado y termo v1) se eliminaron del repo.

Se verificó con especial cuidado tras el incidente de la ronda anterior:
salida completa del push revisada (sin errores de borrado) y comprobación
inmediata de la web (200 OK) antes y después de la propagación.
