// document.querySelector('.login-form').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const defaultEmail = "admin@vlookupglobal.com";
//   const defaultPassword = "Admin@123";
//   const savedPassword = localStorage.getItem("adminPassword") || defaultPassword;

//   const email = this.email.value.trim();
//   const password = this.pass.value;

//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailPattern.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   // ✅ Proper validation
//   if (email !== defaultEmail || password !== savedPassword) {
//     alert("Invalid email or password.");
//     return;
//   }

//   // ✅ Redirect only if validation passes
//   window.location.href = "/admin/admin_career/admin_career.html"; // Update if your path differs
// });

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const eyeIcon = this;
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
});

// Login form submission
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const defaultEmail = "admin@vlookupglobal.com";
    const defaultPassword = "Admin@123";
    const savedPassword = localStorage.getItem("adminPassword") || defaultPassword;

    const email = this.email.value.trim();
    const password = this.pass.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (email !== defaultEmail || password !== savedPassword) {
        alert("Invalid email or password.");
        return;
    }

    window.location.href = "/admin/admin_career/admin_career.html";
});

// Forgot password modal functionality
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('mobileModal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('mobileModal').style.display = 'none';
    document.getElementById('mobileError').style.display = 'none';
});

document.querySelector('.modal-submit-btn').addEventListener('click', function() {
    const mobileInput = document.getElementById('adminMobileInput').value;
    const errorElement = document.getElementById('mobileError');
    
    if (mobileInput.endsWith('8328118821')) {
        window.location.href = "/admin/reset_password/admin_reset.html";
        document.getElementById('mobileModal').style.display = 'none';
    } else {
        errorElement.style.display = 'block';
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('mobileModal');
    if (event.target == modal) {
        document.getElementById('mobileModal').style.display = 'none';
        document.getElementById('mobileError').style.display = 'none';
    }
});