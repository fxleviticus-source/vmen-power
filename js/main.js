/* VMEN Power Technology — shared behaviour */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Welcome animation ---------------- */
  var welcome = document.getElementById('welcome');
  if (welcome) {
    var canvas = welcome.querySelector('canvas');
    var alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem('vmen_intro_seen') === '1'; } catch (e) {}

    function closeWelcome() {
      welcome.classList.add('hide');
      document.body.style.overflow = '';
      try { sessionStorage.setItem('vmen_intro_seen', '1'); } catch (e) {}
      setTimeout(function () { welcome.style.display = 'none'; }, 850);
    }

    if (alreadySeen) {
      welcome.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
      if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
        function size() {
          w = canvas.width = welcome.clientWidth * dpr;
          h = canvas.height = welcome.clientHeight * dpr;
          canvas.style.width = welcome.clientWidth + 'px';
          canvas.style.height = welcome.clientHeight + 'px';
        }
        size();
        window.addEventListener('resize', size);

        // Build a jagged lightning bolt path across the screen
        function buildBolt() {
          var pts = [];
          var startX = w * (0.25 + Math.random() * 0.5);
          var segments = 9;
          var x = startX, y = 0;
          pts.push([x, y]);
          for (var i = 1; i <= segments; i++) {
            y = (h / segments) * i;
            x += (Math.random() - 0.5) * w * 0.16;
            pts.push([x, y]);
          }
          return pts;
        }

        var bolts = [buildBolt()];
        var t0 = performance.now();
        var strikeAt = [300, 650, 1500]; // ms offsets for pulses
        var dust = [];
        for (var i = 0; i < 46; i++) {
          dust.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + .3, s: Math.random() * .3 + .05, a: Math.random() });
        }

        function drawBolt(pts, alpha, glow) {
          ctx.save();
          ctx.strokeStyle = 'rgba(120,175,255,' + alpha + ')';
          ctx.lineWidth = 2 * dpr;
          ctx.shadowBlur = glow;
          ctx.shadowColor = 'rgba(61,139,255,.9)';
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
          ctx.stroke();
          ctx.restore();
        }

        function frame(now) {
          var elapsed = now - t0;
          ctx.clearRect(0, 0, w, h);

          // ambient navy vignette drift
          var g = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, w * 0.7);
          g.addColorStop(0, 'rgba(20,35,80,.35)');
          g.addColorStop(1, 'rgba(5,9,18,0)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);

          // floating dust / particles
          dust.forEach(function (d) {
            d.y -= d.s;
            if (d.y < 0) d.y = h;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(122,176,255,' + (0.15 + d.a * 0.25) + ')';
            ctx.arc(d.x, d.y, d.r * dpr, 0, Math.PI * 2);
            ctx.fill();
          });

          // lightning strikes at scheduled times
          strikeAt.forEach(function (t, idx) {
            var localT = elapsed - t;
            if (localT > 0 && localT < 220) {
              var alpha = 1 - localT / 220;
              drawBolt(bolts[0], alpha, 26 * dpr);
              if (idx === strikeAt.length - 1) {
                // full-screen flash on final strike
                ctx.fillStyle = 'rgba(120,175,255,' + (0.12 * (1 - localT / 220)) + ')';
                ctx.fillRect(0, 0, w, h);
              }
            }
            if (localT > 0 && localT < 40 && idx === 0) {
              bolts[0] = buildBolt();
            }
          });

          if (elapsed < 2600) {
            requestAnimationFrame(frame);
          }
        }
        requestAnimationFrame(frame);
      }

      var minShow = setTimeout(closeWelcome, 3100);
      welcome.addEventListener('click', function () {
        clearTimeout(minShow);
        closeWelcome();
      });
    }
  }

  /* ---------------- Hero rotating image slideshow ---------------- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots span');
  if (slides.length > 1) {
    var cur = 0;
    setInterval(function () {
      slides[cur].classList.remove('is-active');
      if (dots[cur]) dots[cur].classList.remove('is-active');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('is-active');
      if (dots[cur]) dots[cur].classList.add('is-active');
    }, 4200);
  }

  /* ---------------- Header scroll state ---------------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- Mobile nav ---------------- */
  var burger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Contact / enquiry forms ---------------- */
  document.querySelectorAll('form[data-enquiry]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.parentElement.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  });

  /* ---------------- Footer year ---------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------- Gallery filter + lightbox (projects page) ---------------- */
  var filterBtns = document.querySelectorAll('.gallery-filters [data-filter]');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var show = f === 'all' || item.getAttribute('data-cat') === f;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lb-caption');
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    lightbox.addEventListener('click', function () {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

});
