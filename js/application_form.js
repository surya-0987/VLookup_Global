// document.addEventListener('DOMContentLoaded', function() {
//   const modal = document.getElementById('applicationModal');
//   const closeModal = document.querySelector('.close-modal');
//   const jobTitleInput = document.getElementById('jobTitle');
//   const form = document.getElementById('jobApplicationForm');
//   const fileInput = document.getElementById('resume');
//   const fileNameDisplay = document.getElementById('fileName');
//   const fileUploadArea = document.getElementById('fileUploadArea');

//   // Set job title when Apply button is clicked (from external code)
//   window.setApplicationJobTitle = function(jobTitle) {
//     jobTitleInput.value = jobTitle;
//     modal.style.display = 'block';
//   };

//   // Close modal
//   closeModal.addEventListener('click', function() {
//     modal.style.display = 'none';
//   });
  
//   // Close when clicking outside modal
//   window.addEventListener('click', function(e) {
//     if (e.target === modal) {
//       modal.style.display = 'none';
//     }
//   });
  
//   // File upload handling
//   fileInput.addEventListener('change', function() {
//     if (this.files.length > 0) {
//       const file = this.files[0];
//       if (file.type === 'application/pdf') {
//         fileNameDisplay.textContent = file.name;
//         fileUploadArea.classList.add('file-selected');
//       } else {
//         alert('Please upload a PDF file only.');
//         this.value = '';
//         fileNameDisplay.textContent = 'No file chosen';
//         fileUploadArea.classList.remove('file-selected');
//       }
//     }
//   });
  
//   // Drag and drop functionality
//   fileUploadArea.addEventListener('dragover', function(e) {
//     e.preventDefault();
//     this.classList.add('dragover');
//   });
  
//   fileUploadArea.addEventListener('dragleave', function() {
//     this.classList.remove('dragover');
//   });
  
//   fileUploadArea.addEventListener('drop', function(e) {
//     e.preventDefault();
//     this.classList.remove('dragover');
    
//     if (e.dataTransfer.files.length) {
//       const file = e.dataTransfer.files[0];
//       if (file.type === 'application/pdf') {
//         fileInput.files = e.dataTransfer.files;
//         fileNameDisplay.textContent = file.name;
//         this.classList.add('file-selected');
//       } else {
//         alert('Please upload a PDF file only.');
//       }
//     }
//   });
  
//   // Form submission
//   form.addEventListener('submit', async function(e) {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     const formData = new FormData(form);
//     const resumeFile = fileInput.files[0];
    
//     const submitBtn = form.querySelector('.submit-btn');
//     submitBtn.disabled = true;
//     submitBtn.textContent = 'Submitting...';
    
//     try {
//       const resumeData = await readFileAsBase64(resumeFile);
      
//       const payload = {
//   fullName: formData.get('fullName'),
//   contactNumber: formData.get('contactNumber'),
//   email: formData.get('email'),
//   jobTitle: formData.get('jobTitle'),
//   currentCTC: formData.get('currentCTC'),
//   expectedCTC: formData.get('expectedCTC'),
//   experience: formData.get('experience'),
//   noticePeriod: formData.get('noticePeriod'),
//   resumeName: resumeFile.name,
//   resumeData: resumeData.split(',')[1] // Base64 without prefix
// };
      
//       // Replace with your Google Apps Script Web App URL
//       const scriptUrl = 'https://script.google.com/macros/s/AKfycbwrL0P1hVYZrPFENgvqOwLls671ucOv4Izk8MbK2INTN-53XMs_Fhde_0YGwk0gGdS8/exec';

//       const response = await fetch(scriptUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });
      
//       const result = await response.json();
      
//       if (result.status === 'success') {
//         alert('Application submitted successfully!');
//         form.reset();
//         fileNameDisplay.textContent = 'No file chosen';
//         fileUploadArea.classList.remove('file-selected');
//         modal.style.display = 'none';
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error submitting application. Please try again.');
//     } finally {
//       submitBtn.disabled = false;
//       submitBtn.textContent = 'Submit Application';
//     }
//   });
  
//   // Helper function to read file as base64
//   function readFileAsBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//       reader.readAsDataURL(file);
//     });
//   }
  
//   // Form validation
//   function validateForm() {
//     const requiredFields = form.querySelectorAll('[required]');
//     let isValid = true;
    
//     requiredFields.forEach(field => {
//       if (!field.value.trim()) {
//         field.classList.add('error');
//         isValid = false;
//       } else {
//         field.classList.remove('error');
//       }
//     });
    
//     // Validate email
//     const email = form.querySelector('#email');
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email.value)) {
//       email.classList.add('error');
//       isValid = false;
//     }
    
//     // Validate PDF file
//     if (!fileInput.files.length) {
//       fileUploadArea.classList.add('error');
//       isValid = false;
//     } else {
//       fileUploadArea.classList.remove('error');
//     }
    
//     return isValid;
//   }
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('jobApplicationForm');
//     const fileUpload = document.getElementById('resume');
//     const fileName = document.getElementById('fileName');
//     const messagesDiv = document.getElementById('formMessages');
    
//     // Update file name display when file is selected
//     fileUpload.addEventListener('change', function() {
//         if (this.files.length > 0) {
//             fileName.textContent = this.files[0].name;
//         } else {
//             fileName.textContent = 'No file chosen';
//         }
//     });
    
//     // Form validation and submission
//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         messagesDiv.innerHTML = '';
        
//         // Validate form
//         if (!validateForm()) {
//             return;
//         }
        
//         // Disable submit button during processing
//         const submitBtn = form.querySelector('.submit-btn');
//         submitBtn.disabled = true;
//         submitBtn.textContent = 'Submitting...';
        
//         // Prepare form data
//         const formData = new FormData(form);
        
//         // Send data to Google Apps Script
//         fetch('https://script.google.com/macros/s/AKfycbxozr3axO3rwjHLGAygrR6z_jcNPuUkLW8bUmb6bRQyAx03fNha4iMxArdwHXaXhfvV/exec', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.success) {
//                 showMessage('Application submitted successfully!', 'success');
//                 form.reset();
//                 fileName.textContent = 'No file chosen';
//             } else {
//                 showMessage('Error: ' + data.message, 'error');
//             }
//         })
//         .catch(error => {
//             showMessage('There was a problem submitting your application. Please try again.', 'error');
//             console.error('Error:', error);
//         })
//         .finally(() => {
//             submitBtn.disabled = false;
//             submitBtn.textContent = 'Submit Application';
//         });
//     });
    
//     function validateForm() {
//         let isValid = true;
        
//         // Validate email format
//         const email = document.getElementById('email').value;
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             showMessage('Please enter a valid email address', 'error');
//             isValid = false;
//         }
        
//         // Validate phone number (basic validation)
//         const phone = document.getElementById('contactNumber').value;
//         if (!/^[0-9]{10,15}$/.test(phone)) {
//             showMessage('Please enter a valid phone number (10-15 digits)', 'error');
//             isValid = false;
//         }
        
//         // Validate CTC fields
//         const currentCTC = document.getElementById('currentCTC').value;
//         const expectedCTC = document.getElementById('expectedCTC').value;
//         if (!/^\d+(\.\d{1,2})?$/.test(currentCTC) || !/^\d+(\.\d{1,2})?$/.test(expectedCTC)) {
//             showMessage('Please enter valid CTC values (numbers only)', 'error');
//             isValid = false;
//         }
        
//         // Validate file size
//         const resumeFile = fileUpload.files[0];
//         if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
//             showMessage('Resume file must be less than 5MB', 'error');
//             isValid = false;
//         }
        
//         return isValid;
//     }
    
//     function showMessage(message, type) {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `message ${type}`;
//         messageDiv.textContent = message;
//         messagesDiv.appendChild(messageDiv);
        
//         // Auto-hide after 5 seconds
//         setTimeout(() => {
//             messageDiv.remove();
//         }, 5000);
//     }
// });


// const scriptURL =                       
//         "https://script.google.com/macros/s/AKfycbz_nhPu4m1i0BUgl4TZo5hO0bK189gaucQlEcnmoasKUyGLGINzctz8jEPGr0BEupqi/exec";
//         const form = document.forms["jobApplicationForm"];
//         const fileInput = document.getElementById("resume");

//         form.addEventListener("submit", async (e) => {
//                 e.preventDefault();
//                 const formData = new FormData(form);
//                 // var ex = document.getElementById("ex").checked;
//                 // var age = document.getElementById("age").checked;
               
//                 // if (age) {
//                 //     formData.append("age", "Yes");
//                 // } else {
//                 //     formData.append("age", "No");
//                 // }

//                 // if (ex) {
//                 //     formData.append("ex", "Yes");
//                 // } else {
//                 //     formData.append("ex", "No");
//                 // }

//                 // Handle the file upload
//                 const fileInput = document.getElementById("resume");
//                 if (fileInput.files.length > 0) {
//                     const file = fileInput.files[0];
//                     const reader = new FileReader();

//                     // Size validation here, only less than 2MB allowed
//                     if (file.size > 1024 * 1024 * 2) {
//                         swal("Error", "File size should be less than 2MB.", "error");
//                         return;
//                     }

//                     reader.onload = async function () {
//                         formData.append("resume", reader.result.split(",")[1]); // Append base64 data
//                         await submitForm(formData);
//                     };

//                     reader.readAsDataURL(file);
//                 } else {
//                     // No file uploaded
//                     await submitForm(formData);
//                 }
//                 });

//         async function submitForm(formData) {
//             // Get the submit button and change its text to "Loading..."
//             const submitButton = document.querySelector("button[type='submit']");
//             submitButton.disabled = true;
//             submitButton.innerText = "Loading...";

//             // Submit the form data to the Google Sheet
//             fetch(scriptURL, { method: "POST", body: formData })
//                 .then((response) => {
//                     swal("Done", "Submitted Successfully.", "success");
//                     form.reset();
//                 })
//                 .catch((error) => {
//                     swal("Error", "Something went wrong. Please try again!", "error");
//                 })
//                 .finally(() => {
//                     // Reset the submit button back to "Submit"
//                     submitButton.disabled = false;
//                     submitButton.innerText = "Submit";
//                 });
//         }




const scriptURL = "https://script.google.com/macros/s/AKfycbxRfiHOLXBoZP8yVqyql-NCV132oisJ6n4qhghUeUE-2fITTqXCIK9iaiNZZ9X1MH-J/exec";
const form = document.forms["jobApplicationForm"];

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    // var password = document.getElementById("pass").value;
    // var confirmPassword = document.getElementById("re_pass").value;
    
    // if (password !== confirmPassword) {
    //     alert("Passwords do not match.");
    //     return;
    // }

    // Handle the file upload
    const fileInput = document.getElementById("resume");
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        // Size validation (2MB limit)
        if (file.size > 1024 * 1024 * 2) {
            alert("File size should be less than 2MB.");
            return;
        }

        reader.onload = async function() {
            formData.append("resume", reader.result.split(",")[1]); // Append base64 data
            formData.append("resumeName", file.name); // Add the original filename
            await submitForm(formData);
        };
        reader.readAsDataURL(file);
    } else {
        // Submit without file
        await submitForm(formData);
    }
});

async function submitForm(formData) {
    const submitButton = document.getElementById("submitBtn");
    submitButton.disabled = true;
    submitButton.value = "Submitting...";

    try {
        const response = await fetch(scriptURL, { 
            method: "POST", 
            body: formData 
        });
        const result = await response.json();
        
        if (result.result === 'success') {
            alert("Submitted successfully!");
            form.reset();
        } else {
            alert("Submission failed: " + (result.error || 'Unknown error'));
        }
    } catch (error) {
        alert("Error: " + error.message);
    } finally {
        submitButton.disabled = false;
        submitButton.value = "Submit";
    }
}