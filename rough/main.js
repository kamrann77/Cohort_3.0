document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  const menuBtn = document.createElement('button');
  menuBtn.innerHTML = '<i class="ri-menu-line"></i>';
  menuBtn.className = 'mobile-toggle-btn';
  menuBtn.setAttribute('aria-label', 'Toggle navigation');
  menuBtn.style.cssText = `
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: auto;
  `;

  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-dropdown';
  mobileMenu.style.cssText = `
    display: none;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid #e4e4e7;
  `;

  const links = ['Work', 'Services', 'About', 'Blog', 'Contact'];
  links.forEach(text => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = text;
    a.style.cssText = 'text-decoration: none; color: #111; font-size: 1.05rem; font-weight: 300;';
    mobileMenu.appendChild(a);
  });

  navbar.appendChild(menuBtn);
  navbar.insertAdjacentElement('afterend', mobileMenu);

  const checkWidth = () => {
    if (window.innerWidth <= 768) {
      menuBtn.style.display = 'block';
    } else {
      menuBtn.style.display = 'none';
      mobileMenu.style.display = 'none';
    }
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    menuBtn.innerHTML = isOpen
      ? '<i class="ri-menu-line"></i>'
      : '<i class="ri-close-line"></i>';
  });

  window.addEventListener('resize', checkWidth);
  checkWidth();
});