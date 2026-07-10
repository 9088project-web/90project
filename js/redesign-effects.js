(function () {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('luxe-redesign-ready');

  const glow = document.createElement('div');
  glow.className = 'luxe-cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  if (!reduceMotion && window.matchMedia?.('(pointer: fine)').matches) {
    document.body.classList.add('has-pointer');
    window.addEventListener('pointermove', event => {
      glow.style.transform = `translate3d(${event.clientX - 110}px, ${event.clientY - 110}px, 0)`;
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll([
    '.service-card',
    '.signature-copy',
    '.signature-steps article',
    '.price-card',
    '.panel',
    '.feature-card',
    '.case-card',
    '.faq-grid article',
    '.referral-grid article'
  ].join(','));

  revealItems.forEach((item, index) => {
    item.classList.add('luxe-reveal');
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .16 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  if (!reduceMotion && window.matchMedia?.('(pointer: fine)').matches) {
    document.querySelectorAll('.service-card, .price-card, .feature-card, .signature-steps article').forEach(card => {
      card.classList.add('luxe-tilt');
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) - .5;
        const y = ((event.clientY - rect.top) / rect.height) - .5;
        card.style.setProperty('--tilt-y', `${x * 5.5}deg`);
        card.style.setProperty('--tilt-x', `${y * -5.5}deg`);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
      });
    });
  }

  const hero = document.querySelector('.hero');
  if (hero && !reduceMotion) {
    window.addEventListener('scroll', () => {
      const progress = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      hero.style.setProperty('--hero-lift', `${progress * -18}px`);
    }, { passive: true });
  }
})();
