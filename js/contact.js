document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-message-success');
    const warningMessage = document.getElementById('form-message-warning');
    
    // Reset messages
    successMessage.style.display = 'none';
    warningMessage.style.display = 'none';
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Show submitting state
        const submitBtn = contactForm.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        contactForm.querySelector('.submitting').textContent = 'Sending...';
        
        // Replace with your Web App URL
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbwjrolLwr9mrrYTmC6Axm81HrfnIXTRUefrlzQh30Z1TXM-Wie3Dx2OgYwkz_E3LYA/exec';
        
        // Send data to Google Sheets
        fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // Show success message
            successMessage.style.display = 'block';
            warningMessage.style.display = 'none';
            contactForm.reset();
        })
        .catch(error => {
            // Show error message
            warningMessage.style.display = 'block';
            warningMessage.textContent = 'Error sending message. Please try again later.';
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            contactForm.querySelector('.submitting').textContent = '';
        });
    });
    
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            warningMessage.style.display = 'block';
            warningMessage.textContent = 'Please fill in all fields.';
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            warningMessage.style.display = 'block';
            warningMessage.textContent = 'Please enter a valid email address.';
            return false;
        }
        
        // Clear any previous warnings
        warningMessage.style.display = 'none';
        return true;
    }
});