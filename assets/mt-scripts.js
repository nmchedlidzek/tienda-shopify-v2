document.addEventListener('DOMContentLoaded', function () {
  [initReveal, initHero, initCountUp, initMarquee, initGaleriaProducto, initVariantesProducto, initCantidadOferta, initFaq].forEach(function (fn) {
    try { fn(); } catch (e) { console.error('mt-scripts:', fn.name, e); }
  });
});

function initFaq() {
  document.querySelectorAll('.mt-faq-item').forEach(function (item) {
    var pregunta = item.querySelector('.mt-faq-pregunta');
    if (!pregunta) return;
    pregunta.addEventListener('click', function () {
      var abierto = item.classList.contains('mt-abierto');
      item.closest('.mt-faq-lista').querySelectorAll('.mt-faq-item').forEach(function (i) { i.classList.remove('mt-abierto'); });
      if (!abierto) item.classList.add('mt-abierto');
    });
  });
}

function initGaleriaProducto() {
  document.querySelectorAll('[data-mt-producto]').forEach(function (seccion) {
    var miniaturas = seccion.querySelectorAll('[data-mt-miniatura]');
    var imagenes = seccion.querySelectorAll('[data-mt-galeria-imagen]');
    var principal = seccion.querySelector('[data-mt-galeria]');
    if (!imagenes.length) return;

    var imagenesNormales = Array.prototype.filter.call(imagenes, function (img) { return !img.hasAttribute('data-mt-oferta-imagen'); });
    var ultimoIndexNormal = 0;

    function mostrar(index) {
      miniaturas.forEach(function (b) { b.classList.toggle('mt-activa', b.getAttribute('data-mt-miniatura') === String(index)); });
      imagenes.forEach(function (img) { img.classList.toggle('mt-activa', img.getAttribute('data-mt-galeria-imagen') === String(index)); });
      var actual = imagenes[index];
      if (actual && !actual.hasAttribute('data-mt-oferta-imagen')) ultimoIndexNormal = index;
    }

    miniaturas.forEach(function (btn) {
      btn.addEventListener('click', function () {
        detenerAuto();
        mostrar(btn.getAttribute('data-mt-miniatura'));
      });
    });

    var timer = null;
    function detenerAuto() { if (timer) { clearInterval(timer); timer = null; } }

    seccion._mtMostrarPorMediaId = function (mediaId) {
      if (!mediaId) return;
      var index = -1;
      imagenes.forEach(function (img, i) {
        if (img.getAttribute('data-mt-media-id') === String(mediaId)) index = i;
      });
      if (index === -1) return;
      detenerAuto();
      mostrar(index);
    };

    seccion._mtMostrarOferta = function () {
      var index = -1;
      imagenes.forEach(function (img, i) { if (img.hasAttribute('data-mt-oferta-imagen')) index = i; });
      if (index === -1) return;
      detenerAuto();
      mostrar(index);
    };

    seccion._mtOcultarOferta = function () {
      detenerAuto();
      mostrar(ultimoIndexNormal);
    };

    if (principal && principal.hasAttribute('data-mt-galeria-auto') && imagenesNormales.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var intervalo = parseInt(principal.getAttribute('data-mt-galeria-auto'), 10) || 4500;
      var actualPos = 0;
      timer = setInterval(function () {
        actualPos = (actualPos + 1) % imagenesNormales.length;
        var idx = Array.prototype.indexOf.call(imagenes, imagenesNormales[actualPos]);
        mostrar(idx);
      }, intervalo);
      principal.addEventListener('mouseenter', detenerAuto);
    }
  });
}

function initVariantesProducto() {
  document.querySelectorAll('[data-mt-producto-form]').forEach(function (form) {
    var seccion = form.closest('[data-mt-producto]');
    if (!seccion) return;
    var variantesScript = seccion.querySelector('[data-mt-variantes]');
    if (!variantesScript) return;
    var variantes;
    try { variantes = JSON.parse(variantesScript.textContent); } catch (e) { return; }

    var grupos = seccion.querySelectorAll('[data-mt-opcion-index]');
    var idInput = form.querySelector('[data-mt-variant-id]');
    var boton = seccion.querySelector('[data-mt-boton-add]');
    var botonTexto = seccion.querySelector('[data-mt-boton-texto]');
    var precioActual = seccion.querySelector('[data-mt-precio-actual]');
    var precioAntes = seccion.querySelector('[data-mt-precio-antes]');
    if (!grupos.length) return;

    function seleccionActual() {
      var valores = [];
      grupos.forEach(function (grupo) {
        var activo = grupo.querySelector('.mt-opcion-valor.mt-activa');
        valores.push(activo ? activo.getAttribute('data-mt-opcion-valor') : null);
      });
      return valores;
    }

    function encontrarVariante(valores) {
      return variantes.find(function (v) {
        return valores.every(function (val, i) {
          return val === null || v['option' + (i + 1)] === val;
        });
      });
    }

    function formatearDinero(centavos) {
      var base = (window.Shopify && Shopify.currency && Shopify.currency.active) || '';
      var valor = (centavos / 100).toFixed(2).replace('.', ',');
      return valor + ' ' + base;
    }

    function actualizar() {
      var variante = encontrarVariante(seleccionActual());
      if (!variante) return;
      idInput.value = variante.id;
      if (precioActual) precioActual.textContent = formatearDinero(variante.price);
      if (seccion._mtActualizarCantidadPrecios) seccion._mtActualizarCantidadPrecios(variante.price);
      if (precioAntes) {
        if (variante.compare_at_price && variante.compare_at_price > variante.price) {
          precioAntes.textContent = formatearDinero(variante.compare_at_price);
          precioAntes.style.display = '';
        } else {
          precioAntes.style.display = 'none';
        }
      }
      if (boton) {
        boton.disabled = !variante.available;
        if (botonTexto) botonTexto.textContent = variante.available
          ? (boton.getAttribute('data-mt-texto-disponible') || botonTexto.textContent)
          : (boton.getAttribute('data-mt-texto-agotado') || 'Agotado');
      }
      if (variante.featured_image_id && seccion._mtMostrarPorMediaId) {
        seccion._mtMostrarPorMediaId(variante.featured_image_id);
      }
    }

    grupos.forEach(function (grupo) {
      grupo.querySelectorAll('[data-mt-opcion-valor]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          grupo.querySelectorAll('[data-mt-opcion-valor]').forEach(function (b) { b.classList.remove('mt-activa'); });
          btn.classList.add('mt-activa');
          actualizar();
        });
      });
    });
  });
}

function initCantidadOferta() {
  document.querySelectorAll('[data-mt-producto]').forEach(function (seccion) {
    var selector = seccion.querySelector('[data-mt-cantidad-selector]');
    if (!selector) return;
    var form = seccion.querySelector('[data-mt-producto-form]');
    var cantidadInput = form ? form.querySelector('[data-mt-cantidad-input]') : null;
    var tiles = selector.querySelectorAll('.mt-cantidad-fila');

    function formatearDinero(centavos) {
      var base = (window.Shopify && Shopify.currency && Shopify.currency.active) || '';
      var valor = (centavos / 100).toFixed(2).replace('.', ',');
      return valor + ' ' + base;
    }

    function actualizarPrecios(precioCentavos) {
      tiles.forEach(function (tile) {
        var mult = parseInt(tile.getAttribute('data-mt-cantidad-mult'), 10) || 1;
        var valor = parseInt(tile.getAttribute('data-mt-cantidad-valor'), 10) || 1;
        var span = tile.querySelector('[data-mt-cantidad-precio]');
        var spanAntes = tile.querySelector('[data-mt-cantidad-precio-antes]');
        if (span) span.textContent = formatearDinero(precioCentavos * mult);
        if (spanAntes) spanAntes.textContent = formatearDinero(precioCentavos * valor);
      });
    }

    tiles.forEach(function (tile) {
      tile.addEventListener('click', function () {
        tiles.forEach(function (t) { t.classList.remove('mt-activa'); });
        tile.classList.add('mt-activa');
        if (cantidadInput) cantidadInput.value = tile.getAttribute('data-mt-cantidad-valor');
        if (tile.classList.contains('mt-cantidad-oferta')) {
          if (seccion._mtMostrarOferta) seccion._mtMostrarOferta();
        } else if (seccion._mtOcultarOferta) {
          seccion._mtOcultarOferta();
        }
      });
    });

    seccion._mtActualizarCantidadPrecios = actualizarPrecios;

    var precioBase = parseFloat(selector.getAttribute('data-mt-precio-base')) || 0;
    actualizarPrecios(Math.round(precioBase));
  });
}

function initReveal() {
  var els = document.querySelectorAll('.mt-reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('mt-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) {
    el.classList.add('mt-reveal-armed');
    observer.observe(el);
  });
}

function initHero() {
  var heroes = document.querySelectorAll('[data-mt-hero]');
  heroes.forEach(function (hero) {
    var slides = hero.querySelectorAll('[data-mt-hero-slide]');
    var dots = hero.querySelectorAll('[data-mt-hero-dot]');
    if (slides.length < 2) return;
    var current = 0;
    var interval = parseInt(hero.getAttribute('data-mt-hero-interval'), 10) || 6000;
    var timer;

    function show(index) {
      slides.forEach(function (s, i) { s.classList.toggle('mt-visible', i === index); });
      dots.forEach(function (d, i) { d.classList.toggle('mt-active', i === index); });
      current = index;
    }

    function next() { show((current + 1) % slides.length); }

    function restart() {
      clearInterval(timer);
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = setInterval(next, interval);
      }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); restart(); });
    });

    show(0);
    restart();
  });
}

function initCountUp() {
  var els = document.querySelectorAll('[data-mt-countup]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      observer.unobserve(el);
      var target = parseFloat(el.getAttribute('data-mt-countup'));
      var suffix = el.getAttribute('data-mt-countup-suffix') || '';
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  els.forEach(function (el) { observer.observe(el); });
}

function initMarquee() {
  document.querySelectorAll('[data-mt-marquee]').forEach(function (wrap) {
    var track = wrap.querySelector('.mt-marquee-track');
    if (!track) return;
    if (track.dataset.mtDuplicated) return;
    track.innerHTML += track.innerHTML;
    track.dataset.mtDuplicated = 'true';
    var speed = parseFloat(wrap.getAttribute('data-mt-marquee')) || 40;
    track.style.animationDuration = speed + 's';
  });
}
