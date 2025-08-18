document.addEventListener('DOMContentLoaded', function() {
  const jobsContainer = document.querySelector('.jobs-container');
  const noJobsMessage = document.getElementById('noJobsMessage');

  function loadCareerJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    if (jobs.length === 0) {
      noJobsMessage.style.display = 'block';
      return;
    } else {
      noJobsMessage.style.display = 'none';
    }

    jobsContainer.innerHTML = ''; // Clear existing jobs
    
    jobs.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.className = 'job-card';
      jobCard.innerHTML = `
        <div class="job-header">
          <h3>${job.title}</h3>
          <span class="job-location">${job.location}</span>
        </div>
        <div class="job-details">
          <p><strong>Experience:</strong> ${job.experience}</p>
          <p>${job.job_description}</p>
          <div class="job-skills">
            ${job.skills.split(',').map(skill => `<span>${skill.trim()}</span>`).join('')}
          </div>
        </div>
        <a href="#" class="apply-btn" data-job-title="${job.title}">Apply Now</a>
      `;
      jobsContainer.appendChild(jobCard);
    });

    // Add event listeners for apply buttons
    document.querySelectorAll('.apply-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const jobTitle = this.getAttribute('data-job-title');
        document.getElementById('jobTitle').value = jobTitle;
        document.getElementById('applicationModal').style.display = 'block';
      });
    });
  }

  // Load jobs when page loads
  loadCareerJobs();

  // Modal functionality
  const modal = document.getElementById('applicationModal');
  const closeModal = document.querySelector('.close-modal');
  
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // File upload display
  const fileInput = document.getElementById('resume');
  const fileNameDisplay = document.getElementById('fileName');
  
  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      fileNameDisplay.textContent = this.files[0].name;
    } else {
      fileNameDisplay.textContent = 'No file chosen';
    }
  });

  // Form submission
//   const applicationForm = document.getElementById('jobApplicationForm');
//   applicationForm.addEventListener('submit', function(e) {
//     e.preventDefault();
//     // Here you would typically send the form data to a server
//     alert('Application submitted successfully!');
//     this.reset();
//     fileNameDisplay.textContent = 'No file chosen';
//     modal.style.display = 'none';
//   });
});

