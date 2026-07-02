// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Hiwot Demissew Portfolio loaded!');
    
    // Get visitor count
    getVisitorCount();
    
    // Setup contact form - HONEST message
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const nav = document.querySelector('nav ul');
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('nav a, .footer-links a').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
});

// Get visitor count
async function getVisitorCount() {
    const BACKEND_URL = 'http://localhost:3000';
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/visitors`);
        const data = await response.json();
        document.getElementById('visitor-count').textContent = data.count;
    } catch (error) {
        console.log('💡 Backend not running - showing welcome message');
        document.getElementById('visitor-count').textContent = '👋 Welcome!';
    }
}

// Handle form submission - HONEST message
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const BACKEND_URL = 'http://localhost:3000';
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('form-message');
    const submitBtn = event.target.querySelector('.btn-submit');
    
    // Validate
    if (!name || !email || !message) {
        formMessage.textContent = '⚠️ Please fill in all fields';
        formMessage.className = 'error';
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        formMessage.textContent = '⚠️ Please enter a valid email address';
        formMessage.className = 'error';
        return;
    }
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            formMessage.innerHTML = `
                ✅ <strong>Thank you for reaching out!</strong><br>
                📧 Please contact me directly at <strong>Bruktawitaschalew74@gmail.com</strong><br>
                📞 Or call me at <strong>+251 988 581 811</strong><br>
                <small>I will get back to you as soon as possible!</small>
            `;
            formMessage.className = 'success';
            event.target.reset();
        } else {
            formMessage.innerHTML = `
                ⚠️ Please contact me directly at <strong>Bruktawitaschalew74@gmail.com</strong>
            `;
            formMessage.className = 'error';
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.innerHTML = `
            📧 Please contact me directly at <strong>Bruktawitaschalew74@gmail.com</strong><br>
            📞 Or call <strong>+251 988 581 811</strong>
        `;
        formMessage.className = 'info';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Smooth scroll
function smoothScroll(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            duration: 800
        });
    }
}

// Mobile menu responsiveness
window.addEventListener('resize', () => {
    const nav = document.querySelector('nav ul');
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
});