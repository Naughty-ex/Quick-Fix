const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const passwordInput = document.getElementById('password'); 
    const passwordRequirement = document.getElementById('passwordRequirement');
    const passwordMatch = document.getElementById('passwordMatch');
    let timeout;

    password.addEventListener('input', function() {
        clearTimeout(timeout);
        const strength = calculatePasswordStrength(password.value);
        passwordStrength.innerHTML = strength.message;
        passwordStrength.className = 'strength ' + strength.class;
        timeout = setTimeout(() => clearMessage(passwordStrength), 3000);

        if(password.value.length >= 8) {
            passwordRequirement.style.display = 'none';
        } else {
            passwordRequirement.style.display = 'block';
            passwordRequirement.textContent = 'Password must be at least 8 characters long!';
        }
    });

    confirmPassword.addEventListener('input', function() {
        passwordMatch.textContent = password.value !== confirmPassword.value ? "Passwords do not match!" : "";
        passwordMatch.className = password.value !== confirmPassword.value ? 'validation' : '';
    });
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitBtn.innerHTML = 'Signing up...<i class="fa fa-cog fa-spin"></i>';
    });
});



function toggleVisibility(fieldId, toggleIcon) {
    const field = document.getElementById(fieldId);
    const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
    field.setAttribute('type', type);
    toggleIcon.firstChild.classList.toggle('fa-eye');
    toggleIcon.firstChild.classList.toggle('fa-eye-slash');
}

function setupPasswordToggle() {
    const togglePassword = document.querySelector('.togglePassword');
    const toggleConfirmPassword = document.querySelector('.toggleConfirmPassword');

    togglePassword.addEventListener('click', function() {
        toggleVisibility('password', this);
    });

    toggleConfirmPassword.addEventListener('click', function() {
        toggleVisibility('confirmPassword', this);
    });
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function displayPasswordStrength() {
    const strength = calculatePasswordStrength(password.value);
    passwordStrength.textContent = strength.message;
    passwordStrength.className = strength.class;
    setTimeout(() => {
        passwordStrength.textContent = '';
        passwordStrength.className = '';
    }, 500); // Hide the message after 3 seconds
}

// Debounce the displayPasswordStrength function
password.addEventListener('input', debounce(displayPasswordStrength, 1000));


function calculatePasswordStrength(password) {
    let strength = { message: '', class: '' };
    if (password.length >= 6 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength.message = 'Strong Password!';
        strength.class = 'strong';
    } else if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength.message = 'Fair Password!';
        strength.class = 'fair';
    } else {
        strength.message = 'Weak Password!';
        strength.class = 'weak';
    }
    return strength;
}

function setupFormSubmission() {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submission prevented.");

        // Example of simple form validation
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!fullName || !email || !password || password !== confirmPassword) {
            console.log("Form validation failed.");
            // Here, you can update the UI to inform the user of the validation failure
            return; // Stop the function if validation fails
        }

        // If validation passes, prepare the data to be sent
        const formData = {
            name: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            // other form fields as necessary
        };

        // Use Fetch API to submit form data asynchronously
        fetch('https://quickfix-sy96.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        // after submit 
       .then(response => response.json())
.then(data => {
    console.log('Success:', data);
    // Display the success modal
    const modal = document.getElementById('successModal' + data.message);
    const span = document.getElementsByClassName('close')[0];

    // modal.style.display = "block";
    window.location.href = 'signin.html';

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    //     // Redirect after closing the modal
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //         window.location.href = 'signin.html'; // Redirect after closing the modal
    //     }
    // }
})
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors, e.g., displaying an error message to the user
        });
    });
}


// Execute setup functions after the DOM is fully loaded nn
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordToggle();
    setupFormSubmission();
});
//  Passwords match check
 if (confirmPassword.value !== password.value) {
   
     isValid = false;
     
     password.value = null;
     confirmPassword.value = null;
     container.insertBefore(errorPwdMessage , form)  
     setTimeout(()=>{
         errorPwdMessage.remove();
        },1000)                           ;
 }