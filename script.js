document.addEventListener('DOMContentLoaded', () => {

    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        const targetDate = new Date('February 21, 2026 09:00:00 GMT+0530').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = "HACKING IS LIVE!";
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML =
                `${String(days).padStart(2, '0')}:` +
                `${String(hours).padStart(2, '0')}:` +
                `${String(minutes).padStart(2, '0')}:` +
                `${String(seconds).padStart(2, '0')}`;
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    function handleScroll() {
        if (window.scrollY > 50) {
            navMenu.classList.add('is-scrolled');
        } else {
            navMenu.classList.remove('is-scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('is-active');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && navLinks.classList.contains('is-active')) {
                navLinks.classList.remove('is-active');
            }
        });
    }

    const scrollElements = document.querySelectorAll('.scroll-reveal');

    function elementInView(el, offset = 100) {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight - offset));
    }

    function handleScrollReveal() {
        scrollElements.forEach(el => {
            if (elementInView(el)) {
                el.classList.add('is-visible');
            }
        });
    }

    handleScrollReveal();
    window.addEventListener('scroll', handleScrollReveal);

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });

    const psCards = document.querySelectorAll('.ps-card');
    if (psCards.length) {
        psCards.forEach(card => {
            const header = card.querySelector('.ps-card-header');

            function toggleCard() {
                const isOpen = card.classList.contains('is-open');
                psCards.forEach(c => {
                    c.classList.remove('is-open');
                    const h = c.querySelector('.ps-card-header');
                    if (h) h.setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    card.classList.add('is-open');
                    if (header) header.setAttribute('aria-expanded', 'true');
                }
            }

            if (header) {
                header.addEventListener('click', toggleCard);
            }
        });
    }

    const copyEmailLink = document.getElementById('copy-email');
    if (copyEmailLink) {
        copyEmailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'yah2k26@svce.acm.org';
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                console.log('Email address copied to clipboard!');
            } catch (err) {
                console.error('Could not copy text: ', err);
            } finally {
                document.body.removeChild(tempInput);
            }
        });
    }

    // -----------------------------
    // 7. STARFIELD BACKGROUND
    // -----------------------------
    const canvas = document.getElementById('starfield');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let numStars = 150;
        let w, h;

        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: Math.random() * 2 + 1,
                speed: Math.random() * 1 + 0.2
            });
        }

        function animateStars() {
            ctx.clearRect(0, 0, w, h);
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(76, 255, 255, 0.8)'; // neon sky-blue
                ctx.shadowColor = 'rgba(76, 255, 255, 0.9)';
                ctx.shadowBlur = 8;
                ctx.fill();

                star.x += star.speed;
                if (star.x > w + 2) star.x = -2;
            });
            requestAnimationFrame(animateStars);
        }

        animateStars();
    }

});
