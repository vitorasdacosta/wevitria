// Arquivo: assets/js/main.js
// Funcionalidade do menu mobile com melhorias de acessibilidade e teclado

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];

  function isMenuOpen() {
    return nav && nav.classList.contains('active');
  }

  function openMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');

    // foco no primeiro link do menu
    if (navLinks.length) navLinks[0].focus();
    // impedir scroll atrás do menu (opcional)
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
    document.documentElement.style.overflow = '';
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      isMenuOpen() ? closeMenu() : openMenu();
    });

    // fechar ao clicar em um link (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen()) closeMenu();
      });
    });

    // fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) {
        closeMenu();
      }
    });

    // fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && isMenuOpen()) {
        closeMenu();
      }
    });

    // acessibilidade extra: manter foco dentro do menu quando aberto (trap simples)
    document.addEventListener('keydown', (e) => {
      if (!isMenuOpen() || e.key !== 'Tab') return;

      const focusable = Array.from(nav.querySelectorAll('a, button')).filter(el => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // Pequenas melhorias: adicionar outline visível para quem navega por teclado
  const style = document.createElement('style');
  style.innerHTML = `
    .btn:focus, .nav a:focus, .menu-toggle:focus { outline: 3px solid rgba(0,86,210,0.15); outline-offset: 3px; }
  `;
  document.head.appendChild(style);
});
