// VARIABLES
// The element data will be sent to
let dogContainer = document.getElementById("dogData");
// Button to load more user results
let loadMore = document.getElementById("loadMore");
// Page limit tracking
let userCount = 25;

// JSON DATA FETCH
let grabData = (userCount) => {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Populate page function called
      fillPage(data, userCount);
    })
    .catch(err => {
      return err;
    });
};

// Populate page function
let fillPage = (dogs, count) => {
  // User element container
  let content = "";
  for (let i = 0; i < count; i++) {
    // Variable to hold eat user element
    content += `
    <div class="users" id=${dogs[i].id}>
    <h3 class="name" id="${dogs[i].postId}">${dogs[i].name}<h3>
    <p class="email">${dogs[i].email}<p>
    <p class="description">${dogs[i].body}<p>
    </div>`;
  }
  // Increase user limit tracking
  userCount += 25;

  // Fill page with data
  dogContainer.innerHTML = content;
}

// EVENT HANDLERS
loadMore.addEventListener("click", loadUsers => {
  if (userCount >= 525) {
    console.log(`User Limit Reached: 500`);
    return;
  } else {
    console.log(`Loading 25 more users: ${userCount}`);
    grabData(userCount);
  };
});

// Load initial 25 users
grabData(userCount);
