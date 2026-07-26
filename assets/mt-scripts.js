document.addEventListener('DOMContentLoaded', function () {
  [initReveal, initHero, initCountUp, initMarquee, initGaleriaProducto, initVariantesProducto, initFaq].forEach(function (fn) {
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
    if (!miniaturas.length) return;
    miniaturas.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var index = btn.getAttribute('data-mt-miniatura');
        miniaturas.forEach(function (b) { b.classList.remove('mt-activa'); });
        imagenes.forEach(function (img) { img.classList.remove('mt-activa'); });
        btn.classList.add('mt-activa');
        var target = seccion.querySelector('[data-mt-galeria-imagen="' + index + '"]');
        if (target) target.classList.add('mt-activa');
      });
    });
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
