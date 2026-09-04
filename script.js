(() => {
  // iOS Safari-friendly full viewport height.
  const setVh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  setVh();
  window.addEventListener('resize', setVh, { passive: true });

  const scenes = [...document.querySelectorAll('.scene')];
  const dots = [...document.querySelectorAll('.nav-dot')];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      scenes.forEach(scene => scene.classList.toggle('is-visible', scene === entry.target));
      dots.forEach(dot => dot.classList.toggle('active', dot.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { threshold: 0.58 });

  scenes.forEach(scene => observer.observe(scene));

  // Slow background movement makes the fixed scene feel cinematic while content changes.
  let ticking = false;
  const chakra = document.querySelector('.chakra-wrap');
  window.addEventListener('scroll', () => {
    if (ticking || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.max(-18, Math.min(18, (window.scrollY % window.innerHeight) / window.innerHeight * 18 - 9));
      chakra.style.marginTop = `${y}px`;
      ticking = false;
    });
  }, { passive: true });

  const rsvpButton = document.getElementById('rsvpButton');
  const panel = document.getElementById('rsvpPanel');
  const close = document.getElementById('closeRsvp');
  rsvpButton.addEventListener('click', () => {
    panel.hidden = false;
    rsvpButton.setAttribute('aria-expanded', 'true');
  });
  close.addEventListener('click', () => {
    panel.hidden = true;
    rsvpButton.setAttribute('aria-expanded', 'false');
    rsvpButton.focus();
  });
})();
