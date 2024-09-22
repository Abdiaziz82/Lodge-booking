// Get the room name from the URL
const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('name');

// Fetch room details from db.json
document.addEventListener("DOMContentLoaded", function() {
  // Fetch room details as before
  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      const room = data.rooms.find(r => r.name === roomName);

      if (room) {
        document.getElementById('room-name').textContent = room.name;
        document.getElementById('second-room-name').textContent = room.name; // Second H1
        document.getElementById('room-description').textContent = room.description;
      } else {
        document.getElementById('room-name').textContent = 'Room not found';
        document.getElementById('second-room-name').textContent = 'Room not found';
      }
    })
    .catch(error => {
      console.error('Error fetching room details:', error);
      document.getElementById('room-name').textContent = 'Error loading room details';
      document.getElementById('second-room-name').textContent = 'Error loading room details';
    });

  // Carousel logic as before
});


// Carousel section
let index = 0;
const interval = 3000; // Change slide every 3 seconds

const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function updateCarousel() {
    const newTransformValue = -index * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
}

function autoSlide() {
    index = (index + 1) % totalItems;
    updateCarousel();
}

setInterval(autoSlide, interval);




// POSTING DATA TO debugger.JSON


document.addEventListener("DOMContentLoaded", function() {
  // Select the form element
  const bookingForm = document.querySelector("form");
  const errorMessageDiv = document.getElementById("error-message");

  // Add an event listener for form submission
  bookingForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Collect the form data
      const formData = {
          checkIn: document.getElementById("checkIn").value,
          checkOut: document.getElementById("checkOut").value,
          guests: document.getElementById("guests").value,
          roomType: document.getElementById("roomType").value,
          fullName: document.getElementById("fullName").value,
          phoneNumber: document.getElementById("phoneNumber").value,
          emailAddress: document.getElementById("emailAddress").value,
          additionalInfo: document.getElementById("additionalInfo").value
      };

      // Validate form data
      let isValid = true;
      let errorMessage = "";

      for (const key in formData) {
          if (formData[key] === "" || formData[key] == null) {
              isValid = false;
              errorMessage += `${key.replace(/([A-Z])/g, ' $1').toUpperCase()} is required.<br>`;
          }
      }

      if (!isValid) {
          errorMessageDiv.innerHTML = errorMessage;
          return; // Prevent form submission
      }

      // Clear previous error messages
      errorMessageDiv.innerHTML = "";

      // Send the form data to the server (json-server)
      fetch("http://localhost:3000/bookings", {  // Update the URL if necessary
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
          console.log("Booking submitted:", data);
          alert("Booking submitted successfully!");

          // Optionally, reset the form after submission
          bookingForm.reset();
      })
      .catch(error => {
          console.error("Error submitting booking:", error);
          alert("There was an error submitting your booking. Please try again.");
      });
  });
});
