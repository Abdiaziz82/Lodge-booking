document.addEventListener('DOMContentLoaded', () => {
  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      const cardsContainer = document.getElementById('cards-container');

      data.rooms.forEach(room => {
        let ratingStars = '';
        for (let i = 0; i < 5; i++) {
          if (i < room.rating) {
            ratingStars += `
              <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" style="color: tomato;">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>`;
          } else {
            ratingStars += `
              <svg class="w-4 h-4 text-gray-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>`;
          }
        }

        const card = `
          <a href="#" class="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row md:max-w-6xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" style="margin-bottom: 25px; width: 20000px">
            <img class="object-cover w-full h-96 md:h-auto md:w-70" src="${room.image}" alt="${room.name}">
            <div class="flex flex-col justify-between p-4 leading-normal">
              <!-- Card Content -->
              <div class="flex items-center justify-between mb-4">
                <h5 class="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">${room.name}</h5>
                <div class="flex items-center">
                  <!-- Display rating stars -->
                  ${ratingStars}
                </div>
              </div>
              <div>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${room.price}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${room.description}</p>
              </div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr class="bg-white border-dotted-top border-dotted-bottom dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" style="padding: 15px;">
                        <div class="flex items-center">
                          <i class="fa-solid fa-bed"></i>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="height: 20px; margin-left: 10px;">
                            <path d="..."/>
                          </svg>
                          <span class="ml-2" style="margin-left: 10px;">Accommodations</span>
                        </div>
                      </th>
                      <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" style="padding: 15px;">
                        <div class="flex items-center">
                          <i class="fa-solid fa-wifi"></i>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="height: 20px; margin-left: 10px;">
                            <path d="..."/>
                          </svg>
                          <span class="ml-2" style="margin-left: 10px;">Quick Service</span>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex mt-4">
                <button type="button" class="text-white font-medium text-sm px-5 py-2.5 me-2 mb-2" style="background-color: rgb(61, 11, 11); padding: 10px; margin-right: 30px; width: 130px;"
                  onmouseover="this.style.background='linear-gradient(to right, #3D0B0B, #6B2323)';" 
                  onmouseout="this.style.background='rgb(61, 11, 11)';"
                  onclick="window.location.href='room-details.html?name=${encodeURIComponent(room.name)}';">
                  VIEW DETAILS
                </button>
                <button type="button" class="text-white font-medium text-sm px-5 py-2.5 me-2 mb-2" 
                  style="background-color: tomato; padding: 10px; width: 130px;"
                  onmouseover="this.style.background='linear-gradient(to right, tomato, #ca3a06)';" 
                  onmouseout="this.style.background='tomato';"
                  onclick="window.location.href='room-details.html?name=${encodeURIComponent(room.name)}';">
                  BOOK NOW
                </button>
              </div>
            </div>
          </a>
        `;

        cardsContainer.innerHTML += card;
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
