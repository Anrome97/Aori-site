/* ============================================
   AORI - Main JavaScript
   Transitions & Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initPageTransitions();
  initScrollAnimations();
  initFilterSystem();
  initDetailNav();
});

function initPageTransitions() {
  var transition = document.querySelector('.page-transition');
  if (!transition) return;

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('javascript')) return;

    e.preventDefault();
    transition.classList.add('active');

    setTimeout(function() {
      window.location.href = href;
    }, 500);
  });

  function resetTransition() {
    transition.classList.remove('active');
    transition.classList.remove('exit');
  }

  window.addEventListener('load', function() {
    setTimeout(resetTransition, 60);
  });

  // Al retroceder/avanzar el navegador restaura la página desde bfcache
  // sin disparar 'load', dejando el overlay visible (página en blanco).
  window.addEventListener('pageshow', function() {
    setTimeout(resetTransition, 60);
  });
}

function initScrollAnimations() {
  var elements = document.querySelectorAll('.animate-in');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(function(el) { observer.observe(el); });
}

function initFilterSystem() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.shuffle-item');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');

      items.forEach(function(item) {
        var groups = item.getAttribute('data-groups');
        if (filter === 'all' || (groups && groups.includes(filter))) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(function() {
            item.style.display = 'block';
            setTimeout(function() {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          }, 300);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(function() { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

function initDetailNav() {
  var nav = document.querySelector('.detail-nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  });
}