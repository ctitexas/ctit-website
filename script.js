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
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = form.querySelector('.form-message');
  const name = form.elements.name.value.trim();
  message.textContent = `Thank you${name ? ', ' + name : ''}. The form UI is ready to connect to your email/CRM endpoint.`;
  form.reset();
});
