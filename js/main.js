document.addEventListener('DOMContentLoaded', function () {

    // ── Active nav highlight based on current page ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        item.classList.remove('active', 'text-accent-400');
        item.classList.add('text-slate-300');
        const existingDot = item.querySelector('.nav-dot');
        if (existingDot) existingDot.remove();

        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active', 'text-accent-400');
            item.classList.remove('text-slate-300');
            const dot = document.createElement('span');
            dot.className = 'nav-dot ml-auto w-2 h-2 rounded-full bg-accent-400';
            item.appendChild(dot);
        }
    });

    // ── Breadcrumb ──
    const breadcrumbEl = document.getElementById('breadcrumb');
    if (breadcrumbEl) {
        const map = {
            'index.html': 'dashboard',
            'about.html': 'about',
            'techstack.html': 'tech-stack',
            'experience.html': 'experience',
            'contact.html': 'contact',
            '': 'dashboard'
        };
        breadcrumbEl.textContent = map[currentPage] || currentPage;
    }

    // ── Mobile menu ──
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // ── Contact form (contact.html only) ──
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            contactForm.classList.add('hidden');
            contactSuccess.classList.remove('hidden');
            setTimeout(() => {
                contactForm.classList.remove('hidden');
                contactSuccess.classList.add('hidden');
                contactForm.reset();
            }, 4000);
        });
    }
});
