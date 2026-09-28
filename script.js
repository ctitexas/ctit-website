const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('foundingForm');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = form.querySelector('.form-message');
    const button = form.querySelector('button[type="submit"]');
    const label = button.querySelector('.button-label');
    const webhookUrl = form.dataset.webhookUrl?.trim();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();

    message.className = 'form-message';
    message.textContent = '';

    if (!name || !email || !form.elements.email.checkValidity()) {
      message.classList.add('is-error');
      message.textContent = 'Please enter a valid name and email address.';
      return;
    }

    if (!webhookUrl || webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
      message.classList.add('is-error');
      message.textContent = 'The institutional webhook has not been configured yet.';
      return;
    }

    const payload = {
      source: 'ctitexas.org',
      form: 'founding-list',
      name,
      email,
      submitted_at: new Date().toISOString(),
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent
    };

    button.disabled = true;
    label.textContent = 'Sending…';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Webhook returned HTTP ${response.status}`);
      }

      message.classList.add('is-success');
      message.textContent = `Thank you, ${name}. Your information was sent successfully.`;
      form.reset();
    } catch (error) {
      console.error('CTIT webhook submission error:', error);
      message.classList.add('is-error');
      message.textContent = 'We could not send your information. Please try again in a moment.';
    } finally {
      button.disabled = false;
      label.textContent = 'Join the Founding List';
    }
  });
}