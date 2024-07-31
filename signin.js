document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.togglePassword');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const modalText = successModal.querySelector('p');
    const closeSpan = document.querySelector('.close');

    

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.firstChild.classList.toggle('fa-eye');
        this.firstChild.classList.toggle('fa-eye-slash');
    });



    class User{
      constructor(email , password){
     this.email  = email;
     this.password = password;
      }  
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitBtn.innerHTML = 'Logging in...<i class="fa fa-cog fa-spin"></i>';

       
         let emailval = emailInput.value;
         let passwordVal =  passwordInput.value;
         let user = new User(emailval , passwordVal)
          
          console.log(user);
        fetch('https://quickfix-sy96.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then((response)=>{
            if(response.ok){
                console.log(response)               
            }
            return response.json()
            // modal successful shit
            modalText.textContent = 'Login successful!';
            successModal.style.display = "block";
            submitBtn.innerHTML = 'Log In';
            // Redirect after 3000 freaking miliseconds
            setTimeout(function() {
                window.location.href = '/home.html';
            }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            modalText.textContent = '! ' + error;
            successModal.style.display = "block";
            submitBtn.innerHTML = 'Log In';
        });
    });

    
    closeSpan.onclick = function() {
        successModal.style.display = "none";
    };

    
    window.onclick = function(event) {
        if (event.target == successModal) {
            successModal.style.display="none";
}
};
});


