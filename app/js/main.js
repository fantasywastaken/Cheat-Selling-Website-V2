const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let rafId = null;

document.addEventListener('mousemove', (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${e.clientX - 12.5}px, ${e.clientY - 12.5}px, 0)`;
        cursorDot.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
    });
});

const interactiveElements = document.querySelectorAll('a, button, .product-card');
interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.background = 'rgba(28, 220, 246, 0.1)';
    });
    elem.addEventListener('mouseleave', () => {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursor.style.background = 'transparent';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

const commonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.classList.contains('product-card')) {
                const features = entry.target.querySelectorAll('.product-features li');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '-20px'
});

document.querySelectorAll('.product-card, .testimonial-card, .smooth-translate')
    .forEach(element => commonObserver.observe(element));

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;
    const scrolled = window.scrollY > scrollThreshold;

    requestAnimationFrame(() => {
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay');
                setTimeout(() => {
                    entry.target.setAttribute('data-loaded', 'true');
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    testimonials.forEach(card => observer.observe(card));
});