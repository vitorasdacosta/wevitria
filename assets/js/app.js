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

  /* ── Form Handler: Validação PT-BR, Captcha Anti-spam e Envio Duplo (WhatsApp / E-mail) ── */
  const form = document.getElementById('lead-form');
  const captchaQuestionEl = document.getElementById('captcha-question');
  const captchaInputEl = document.getElementById('captcha-input');
  const captchaRefreshBtn = document.getElementById('captcha-refresh');
  const successBanner = document.getElementById('form-success');
  const successTitle = document.getElementById('success-title');
  const successDesc = document.getElementById('success-desc');

  let captchaExpected = 0;

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 2; // 2 a 9
    const num2 = Math.floor(Math.random() * 8) + 1; // 1 a 8
    captchaExpected = num1 + num2;
    if (captchaQuestionEl) {
      captchaQuestionEl.textContent = `${num1} + ${num2} = ?`;
    }
    if (captchaInputEl) {
      captchaInputEl.value = '';
    }
  };

  generateCaptcha();
  captchaRefreshBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    generateCaptcha();
  });

  const fields = [
    {
      id: 'nome',
      containerId: 'field-nome',
      validate: (v) => v.trim().length >= 2,
    },
    {
      id: 'whatsapp',
      containerId: 'field-whatsapp',
      validate: (v) => v.replace(/\D/g, '').length >= 10,
    },
    {
      id: 'email',
      containerId: 'field-email',
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    },
    {
      id: 'desafio',
      containerId: 'field-desafio',
      validate: (v) => v.trim().length >= 5,
    },
    {
      id: 'captcha-input',
      containerId: 'field-captcha',
      validate: (v) => parseInt(v.trim(), 10) === captchaExpected,
    }
  ];

  // Limpa o erro ao digitar
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    el?.addEventListener('input', () => {
      document.getElementById(f.containerId)?.classList.remove('has-error');
    });
  });

  const validateAll = () => {
    let isValid = true;
    let firstInvalid = null;

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const container = document.getElementById(f.containerId);
      const val = el ? el.value : '';

      if (!f.validate(val)) {
        isValid = false;
        container?.classList.add('has-error');
        if (!firstInvalid && el) {
          firstInvalid = el;
        }
      } else {
        container?.classList.remove('has-error');
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return isValid;
  };

  const handleSend = (channel) => {
    if (!validateAll()) {
      return;
    }

    const nome = document.getElementById('nome')?.value.trim() ?? '';
    const whatsapp = document.getElementById('whatsapp')?.value.trim() ?? '';
    const email = document.getElementById('email')?.value.trim() ?? '';
    const desafio = document.getElementById('desafio')?.value.trim() ?? '';

    if (channel === 'whatsapp') {
      const text =
        `Olá! Gostaria de falar com a Wevitria.\n\n` +
        `Nome: ${nome}\n` +
        `WhatsApp: ${whatsapp}\n` +
        `E-mail: ${email}\n\n` +
        `Qual o meu desafio:\n${desafio}`;

      const url = `https://api.whatsapp.com/send?phone=5521920012910&text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      if (successBanner) {
        successTitle.textContent = 'Mensagem pronta no WhatsApp!';
        successDesc.textContent = 'Abrimos seu WhatsApp com o resumo pronto para envio. Ficamos à sua disposição!';
        successBanner.classList.add('active');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else if (channel === 'email') {
      const subject = `Novo Contato via Site: ${nome}`;
      const body =
        `Olá, equipe Wevitria,\n\n` +
        `Gostaria de solicitar atendimento consultivo com as informações abaixo:\n\n` +
        `• Nome: ${nome}\n` +
        `• Telefone/WhatsApp: ${whatsapp}\n` +
        `• E-mail: ${email}\n\n` +
        `• Detalhes do desafio/necessidade:\n${desafio}\n\n` +
        `Aguardo retorno de vocês.`;

      const mailtoUrl = `mailto:contato@wevitria.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      if (successBanner) {
        successTitle.textContent = 'Mensagem preparada no seu E-mail!';
        successDesc.textContent = 'Seu programa de e-mail foi aberto com os dados preenchidos para envio direto a contato@wevitria.com.br.';
        successBanner.classList.add('active');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Renova o captcha para segurança adicional após o envio
    generateCaptcha();
  };

  document.getElementById('btn-submit-whatsapp')?.addEventListener('click', (e) => {
    e.preventDefault();
    handleSend('whatsapp');
  });

  document.getElementById('btn-submit-email')?.addEventListener('click', (e) => {
    e.preventDefault();
    handleSend('email');
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSend('whatsapp');
  });
})();
