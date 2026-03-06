document.addEventListener('DOMContentLoaded', function () {

    // ── Active nav highlight ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const resolvedPage = (currentPage === '' || currentPage === '/') ? 'index.html' : currentPage;

    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        item.classList.remove('active', 'text-accent-400');
        item.classList.add('text-slate-300');
        const existingDot = item.querySelector('.nav-dot');
        if (existingDot) existingDot.remove();

        if (href === resolvedPage) {
            item.classList.add('active', 'text-accent-400');
            item.classList.remove('text-slate-300');
            const dot = document.createElement('span');
            dot.className = 'nav-dot';
            item.appendChild(dot);
        }
    });

    // ── Breadcrumb ──
    const breadcrumbEl = document.getElementById('breadcrumb');
    if (breadcrumbEl) {
        const map = {
            'index.html': 'home',
            'about.html': 'about',
            'techstack.html': 'tech-stack',
            'experience.html': 'experience',
            'contact.html': 'contact',
            '': 'home'
        };
        breadcrumbEl.textContent = map[resolvedPage] || resolvedPage;
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

    // ── Contact form ──
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                const result = await response.json();
                if (response.status === 200) {
                    contactForm.classList.add('hidden');
                    contactSuccess.classList.remove('hidden');
                } else {
                    alert(result.message || 'Something went wrong. Please try again.');
                }
            })
            .catch(() => {
                alert('Something went wrong. Please try again.');
            });
        });
    }
});