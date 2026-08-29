document.addEventListener('DOMContentLoaded', function () {

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Preloader — once per session, homepage only
  --------------------------------------------------------------------- */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var alreadyShown = sessionStorage.getItem('vmenWelcomeShown');
    if (alreadyShown || reducedMotion) {
      preloader.style.display = 'none';
    } else {
      sessionStorage.setItem('vmenWelcomeShown', '1');
      window.setTimeout(function () {
        preloader.classList.add('is-hidden');
        window.setTimeout(function () { preloader.style.display = 'none'; }, 650);
      }, 1350);
    }
  }

  /* ---------------------------------------------------------------------
     Hero background slideshow (always advances; CSS handles reduced motion)
  --------------------------------------------------------------------- */
  document.querySelectorAll('.hero-bg').forEach(function (heroBg) {
    var slides = Array.prototype.slice.call(heroBg.querySelectorAll('.slide'));
    if (slides.length < 2) return;
    var dotsWrap = heroBg.querySelector('.hero-dots');
    var current = 0;
    var timer = null;
    var interval = 5000;

    slides.forEach(function (_, i) {
      if (!dotsWrap) return;
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show background image ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function goTo(index) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
      var img = slides[current].querySelector('img');
      if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
    }
    function next() { goTo(current + 1); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, interval);
    }
    restart();
  });

  /* ---------------------------------------------------------------------
     Sticky nav shrink shadow
  --------------------------------------------------------------------- */
  var navWrap = document.querySelector('.nav-wrap');
  var onScrollNav = function () {
    if (!navWrap) return;
    if (window.scrollY > 12) navWrap.classList.add('is-scrolled');
    else navWrap.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------------------------------------------------------------------
     Mobile menu + accordion submenu
  --------------------------------------------------------------------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));
    });
    mobileMenu.querySelectorAll('.mobile-menu-inner > a, .mobile-submenu a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
      });
    });
    mobileMenu.querySelectorAll('.mobile-submenu-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var submenu = btn.closest('.mobile-menu-toggle-row').nextElementSibling;
        var isOpen = submenu.classList.contains('is-open');
        submenu.classList.toggle('is-open', !isOpen);
        btn.classList.toggle('is-open', !isOpen);
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------------------
     Back to top
  --------------------------------------------------------------------- */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    document.addEventListener('scroll', function () {
      if (window.scrollY > 500) toTop.classList.add('is-visible');
      else toTop.classList.remove('is-visible');
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------------------
     Contact form -> mailto / WhatsApp handoff (no backend available)
  --------------------------------------------------------------------- */
  var quoteForm = document.getElementById('vmen-quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('q-name').value;
      var phone = document.getElementById('q-phone').value;
      var email = document.getElementById('q-email').value;
      var product = document.getElementById('q-product').value;
      var message = document.getElementById('q-message').value;
      var text = 'Hi VMEN Power Technology, I would like a quote.\n' +
        'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email +
        '\nProduct/Service: ' + product + '\nMessage: ' + message;
      window.open('https://wa.me/260777777894?text=' + encodeURIComponent(text), '_blank');
    });
  }
});
