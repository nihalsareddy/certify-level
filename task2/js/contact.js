document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = e.target.querySelector('button[type="submit"]');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate form submission
        setTimeout(() => {
            submitButton.style.display = 'none';
            successMessage.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                submitButton.style.display = 'block';
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                successMessage.style.display = 'none';
            }, 3000);
        }, 1000);
    });
});