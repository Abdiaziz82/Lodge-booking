document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Validate the form
        if (!validateForm()) {
            return;
        }

        // Generate a unique ID
        const uniqueId = new Date().getTime().toString(); // Simple unique ID

        // Collect form data
        const formData = {
            id: uniqueId,
            checkIn: document.getElementById('checkin').value,
            checkOut: document.getElementById('checkout').value,
            guests: document.getElementById('guests').value,
            fullName: document.getElementById('fullname').value,
            phoneNumber: document.getElementById('phone').value,
            emailAddress: document.getElementById('email').value,
            additionalInfo: document.getElementById('additional-info').value
        };

        // Send data to the endpoint
        fetch('http://localhost:3000/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Optionally, show a success message or redirect the user
            alert('Reservation made successfully!');
            // Optionally clear the form
            document.getElementById('bookingForm').reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            // Optionally, show an error message
            document.getElementById('error').textContent = 'An error occurred. Please try again.';
        });
    });

    function validateForm() {
        const checkIn = document.getElementById('checkin').value;
        const checkOut = document.getElementById('checkout').value;
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        if (!checkIn || !checkOut || !fullname || !phone || !email) {
            document.getElementById('error').textContent = 'Please fill out all required fields.';
            return false;
        }
        // Additional validation logic can be added here

        document.getElementById('error').textContent = ''; // Clear any previous error messages
        return true;
    }
});
