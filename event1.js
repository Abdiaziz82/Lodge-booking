document.getElementById('reservationForm').addEventListener('submit', function(event) {

    event.preventDefault();
    
  
    clearErrors();

    let isValid = true;

  
    const firstName = document.getElementById('firstName').value;
    if (firstName.trim() === '') {
        showError('firstNameError', 'First Name is required.');
        isValid = false;
    }

  
    const lastName = document.getElementById('lastName').value;
    if (lastName.trim() === '') {
        showError('lastNameError', 'Last Name is required.');
        isValid = false;
    }

 
    const phoneNumber = document.getElementById('phoneNumber').value;
    const phonePattern = /^[0-9]{10}$/; // Example pattern for 10-digit phone numbers
    if (!phonePattern.test(phoneNumber)) {
        showError('phoneNumberError', 'Enter a valid phone number.');
        isValid = false;
    }

 
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        showError('emailError', 'Enter a valid email address.');
        isValid = false;
    }

  
    const checkInDate = document.getElementById('checkInDate').value;
    if (checkInDate === '') {
        showError('checkInDateError', 'Check In Date is required.');
        isValid = false;
    }

    
    if (isValid) {
     
        const formData = new FormData(document.getElementById('reservationForm'));
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
     
    }
});

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.textContent = '');
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}