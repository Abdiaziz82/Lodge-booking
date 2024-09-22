function sendMessage() {
    // Capture the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const room = document.getElementById('room').value;
    const message = document.getElementById('message').value;

    // Check for empty fields
    if (!name || !email || !phone || !room || !message) {
        // Show error message
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    // Hide error message if all fields are filled
    document.getElementById('error-message').style.display = 'none';

    // Wrap the data into an object
    const formData = {
        name: name,
        email: email,
        phone: phone,
        room: room,
        message: message
    };

    // Show the "Sending your message..." message
    document.getElementById('messageSending').style.display = 'block';

    // Send the form data to the local db.json
    fetch('http://localhost:3000/messages', { // Adjust the URL if your server is running on a different port
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        // Hide the "Sending your message..." message
        document.getElementById('messageSending').style.display = 'none';
        
        // Show the thank you popup
        document.getElementById('popup').classList.add('show');
        
        // Clear the form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('room').value = '';
        document.getElementById('message').value = '';
        
        setTimeout(() => {
            // Hide the thank you popup
            document.getElementById('popup').classList.remove('show');
        }, 3000);
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
        document.getElementById('messageSending').style.display = 'none';
    });
}
