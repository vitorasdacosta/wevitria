(() => {
  const header = document.getElementById('main-header');
  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  const mobileQuery = window.matchMedia('(max-width: 1000px)');
  const firstNavLink = () => nav?.querySelector('a');

  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 18);
  };

  const setMenuState = (open, { moveFocus = false } = {}) => {
    if (!menuButton || !nav) return;

    const isMobile = mobileQuery.matches;
    const nextOpen = isMobile ? Boolean(open) : false;

    menuButton.setAttribute('aria-expanded', String(nextOpen));
    menuButton.setAttribute('aria-label', nextOpen ? 'Fechar menu' : 'Abrir menu');

    nav.classList.toggle('open', nextOpen);
    nav.setAttribute('aria-hidden', String(isMobile ? !nextOpen : false));

    // Prevent keyboard/assistive-technology focus from entering a hidden mobile menu.
    nav.inert = isMobile && !nextOpen;

    if (moveFocus && nextOpen) {
      firstNavLink()?.focus();
    }
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Establish the correct initial state for desktop/mobile.
  setMenuState(false);

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!open, { moveFocus: !open });
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileQuery.matches) {
        setMenuState(false);
        menuButton?.focus();
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileQuery.matches &&
        menuButton?.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuButton?.focus();
    }
  });

  mobileQuery.addEventListener?.('change', () => {
    setMenuState(false);
  });

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    // Content is visible by default (see CSS). Only now, once we know JS
    // and IntersectionObserver both work, do we opt elements into the
    // hidden/animate-in state - so a script failure never hides content.
    reveal.forEach(el => {
      el.classList.add('pending');
      observer.observe(el);
    });
  }

  const form = document.getElementById('lead-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();

    const nome = document.getElementById('nome')?.value.trim() ?? '';
    const whatsapp = document.getElementById('whatsapp')?.value.trim() ?? '';
    const email = document.getElementById('email')?.value.trim() ?? '';
    const desafio = document.getElementById('desafio')?.value.trim() ?? '';

    const text =
      `Olá! Gostaria de falar com a Wevitria.\n\n` +
      `Nome: ${nome}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `E-mail: ${email}\n\n` +
      `Qual o meu desafio:\n${desafio}`;

    const url =
      `https://api.whatsapp.com/send?phone=5521920012910&text=${encodeURIComponent(text)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
