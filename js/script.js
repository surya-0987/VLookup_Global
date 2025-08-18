document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation to elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .team-member, .about-image, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .about-image, .about-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});







// CAREER PAGE APPLICATION FORM
// Application Form Functionality
// document.addEventListener('DOMContentLoaded', function() {
//     const modal = document.getElementById('applicationModal');
//     const applyButtons = document.querySelectorAll('.apply-btn');
//     const closeModal = document.querySelector('.close-modal');
//     const fileInput = document.getElementById('resume');
//     const fileName = document.getElementById('fileName');
    
//     // Show modal when Apply Now is clicked
//     applyButtons.forEach(button => {
//         button.addEventListener('click', function(e) {
//             e.preventDefault();
//             modal.style.display = 'block';
//             document.body.style.overflow = 'hidden'; // Prevent scrolling
//         });
//     });
    
//     // Close modal when X is clicked
//     closeModal.addEventListener('click', function() {
//         modal.style.display = 'none';
//         document.body.style.overflow = 'auto';
//     });
    
//     // Close modal when clicking outside
//     window.addEventListener('click', function(e) {
//         if (e.target === modal) {
//             modal.style.display = 'none';
//             document.body.style.overflow = 'auto';
//         }
//     });
    
//     // Show selected file name
//     fileInput.addEventListener('change', function() {
//         if (this.files.length > 0) {
//             fileName.textContent = this.files[0].name;
//         } else {
//             fileName.textContent = 'No file chosen';
//         }
//     });
    
//     // Form submission
//     const applicationForm = document.getElementById('jobApplicationForm');
//     applicationForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         // Here you would typically send the form data to your server
//         alert('Application submitted successfully!');
//         modal.style.display = 'none';
//         document.body.style.overflow = 'auto';
//         this.reset();
//         fileName.textContent = 'No file chosen';
//     });
// });






//Mission Section Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Set up the Intersection Observer
    const missionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const heading = entry.target.querySelector('.mission-heading');
                const texts = entry.target.querySelectorAll('.mission-text');
                
                heading.classList.add('animate');
                texts.forEach(text => text.classList.add('animate'));
                
                // Unobserve after animation to prevent retriggering
                missionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust when the animation triggers
    });

    // Observe the mission section
    const missionSection = document.querySelector('.mission');
    if (missionSection) {
        missionObserver.observe(missionSection);
    }
});