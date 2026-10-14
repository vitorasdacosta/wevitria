(() => {
  const header = document.getElementById('main-header');
  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  // Mobile navigation: keep the three main links visible directly in the header.
  const mobileNavStyles = document.createElement('link');
  mobileNavStyles.rel = 'stylesheet';
  mobileNavStyles.href = 'assets/css/mobile-nav.css';
  document.head.appendChild(mobileNavStyles);

  const mobileQuery = window.matchMedia('(max-width: 760px)');
  const firstNavLink = () => nav?.querySelector('a');

  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 18);
  };

  const setMenuState = (open, { moveFocus = false } = {}) => {
    if (!nav) return;

    const isMobile = mobileQuery.matches;

    // On mobile the navigation is always visible; the hamburger is not used.
    if (isMobile) {
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Menu de navegação');
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'false');
      nav.inert = false;
      return;
    }

    const nextOpen = Boolean(open);

    menuButton?.setAttribute('aria-expanded', String(nextOpen));
    menuButton?.setAttribute('aria-label', nextOpen ? 'Fechar menu' : 'Abrir menu');

    nav.classList.toggle('open', nextOpen);
    nav.setAttribute('aria-hidden', 'false');
    nav.inert = false;

    if (moveFocus && nextOpen) {
      firstNavLink()?.focus();
    }
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Establish the correct initial state for desktop/mobile.
  setMenuState(false);

  menuButton?.addEventListener('click', () => {
    if (mobileQuery.matches) return;
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!open, { moveFocus: !open });
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileQuery.matches) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileQuery.matches &&
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
