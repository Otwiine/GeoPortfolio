document.addEventListener('DOMContentLoaded', function () {
    const pages = ['dashboard', 'about', 'techstack', 'experience', 'contact'];
    const breadcrumbEl = document.getElementById('breadcrumb');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    function navigateTo(page) {
        // Hide all pages
        pages.forEach(p => {
            const section = document.getElementById('page-' + p);
            if (section) section.classList.remove('active');
        });

        // Show target page
        const targetSection = document.getElementById('page-' + page);
        if (targetSection) {
            targetSection.classList.add('active');
            // Re-trigger animations
            targetSection.querySelectorAll('.fade-in-up').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // force reflow
                el.style.animation = '';
            });
        }

        // Update nav active states
        document.querySelectorAll('#desktopNav .nav-item, #mobileNav .nav-item').forEach(item => {
            item.classList.remove('active');
            item.classList.remove('text-accent-400');
            item.classList.add('text-slate-300');
            const dot = item.querySelector('.ml-auto');
            if (dot) dot.remove();
        });

        document.querySelectorAll(`[data-page="${page}"]`).forEach(item => {
            item.classList.add('active');
            item.classList.remove('text-slate-300');
            item.classList.add('text-accent-400');
            const dot = document.createElement('span');
            dot.className = 'ml-auto w-2 h-2 rounded-full bg-accent-400';
            item.appendChild(dot);
        });

        // Update breadcrumb
        if (breadcrumbEl) {
            breadcrumbEl.textContent = page === 'techstack' ? 'tech-stack' : page;
        }

        // Close mobile menu
        closeMobileMenu();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Make navigateTo globally accessible
    window.navigateTo = navigateTo;

    // Desktop & mobile nav clicks
    document.querySelectorAll('#desktopNav .nav-item, #mobileNav .nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });

    // Mobile menu
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

    // Contact form
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
