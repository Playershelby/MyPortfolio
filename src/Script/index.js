const showMoreButton = document.getElementById('show-more-btn');
const extraCards = document.querySelectorAll('.extra-card');
const myLookSection = document.querySelector('.O-Meu-Olhar');

if (showMoreButton && extraCards.length > 0 && myLookSection) {
  showMoreButton.addEventListener('click', () => {
    const shouldShow = Array.from(extraCards).some((card) => card.hidden);

    extraCards.forEach((card) => {
      card.hidden = !shouldShow;
    });

    myLookSection.style.marginTop = shouldShow ? '250px' : '750px';
    showMoreButton.textContent = shouldShow ? 'Ver menos' : 'Saiba mais';
  });
}

// hero-sidebar
const heroSidebar = document.querySelector('.hero-sidebar');
const heroLinks = heroSidebar ? heroSidebar.querySelectorAll('a[data-target]') : [];
const sectionIds = ['inicio', 'servicos', 'Projetos', 'sobre', 'Contato'];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function setActiveSidebarItem(sectionId) {
  if (!heroLinks.length) return;

  heroLinks.forEach((link) => {
    const parent = link.closest('li');
    if (!parent) return;

    const isTarget = link.dataset.target === sectionId;
    parent.classList.toggle('is-active', isTarget);
    if (isTarget) parent.classList.add('active');
    else parent.classList.remove('active');
  });
}

if (heroLinks.length) {
  heroLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.dataset.target;
      const target = document.getElementById(targetId);

      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSidebarItem(targetId);
    });
  });
}

if (sections.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSidebarItem(entry.target.id);
        }
      });
    },
    {
      root: null,
      threshold: 0.35,
      rootMargin: '-10% 0px -45% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// 3D tilt effect para cards das seções 03, 04 e 05
const tiltCards = document.querySelectorAll('.project-card, .feature-card, .insight-card');

if (tiltCards.length) {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer) {
    tiltCards.forEach((card) => {
      let rafId = null;

      const applyTilt = (event) => {
        const rect = card.getBoundingClientRect();
        const relX = event.clientX - rect.left;
        const relY = event.clientY - rect.top;
        const percentX = relX / rect.width;
        const percentY = relY / rect.height;

        const rotateY = (percentX - 0.5) * 14;
        const rotateX = (0.5 - percentY) * 12;

        card.style.setProperty('--mx', `${percentX * 100}%`);
        card.style.setProperty('--my', `${percentY * 100}%`);
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      };

      card.addEventListener('mousemove', (event) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => applyTilt(event));
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });
  }
}
