document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Precise Scroll Flip for Nav
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. High-Performance Reveal Observer
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Contact Form Logic (Add to contact page)
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            btn.innerText = 'Sending...';
            // Integration with EmailJS or similar would go here
            setTimeout(() => {
                btn.innerText = 'Message Sent';
                form.reset();
            }, 1500);
        });
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual Public Key
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const btn = document.getElementById('send-btn');
        const status = document.getElementById('form-status');
        
        btn.innerText = 'Sending...';

        // These IDs come from your EmailJS dashboard
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                btn.innerText = 'Sent';
                status.innerText = 'Message received. We will get back to you soon.';
                contactForm.reset();
            }, (error) => {
                btn.innerText = 'Error';
                status.innerText = 'Something went wrong. Please try again.';
            });
    });
}