// V A R I A B L E S
// The element data will be sent to
let dogContainer = document.getElementById("dogData");
// Button to load more user results
let loadMore = document.getElementById("loadMore");
// Page limit tracking
let userCount = 25;
let urls = ['https://jsonplaceholder.typicode.com/comments', 'https://random.dog/woof.json'];

// JSON DATA FETCH
let grabData = (userCount) => {
  fetch(urls[0])
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
  // Loop for the NEXT 25 users added to page, from 0
  for (let i = count - 25; i < count; i++) {
    // User element container
    let content = document.createElement('div');
    // Grab Photos with another fetch
    fetch(urls[1])
      .then(data => data.json())
      .then(imgs => {
        content.className = `user`; // assign Class
        content.id = `${dogs[i].id}`; // assign ID
        // Exclude video formats
        if (!imgs.url.includes("mp4" || "webm")) {
          content.innerHTML += `
          <img src="${imgs.url}" class="profilePhoto">`;
        } else {
          content.innerHTML += `
          <img src="./assets/img/dogImg.jpg" class="profilePhoto">`;
        }
        content.innerHTML += `
        <h3 class="name heading" id="${dogs[i].postId}">${dogs[i].name}</h3>
        <p class="email info">${dogs[i].email}</p>
        <p class="description">${dogs[i].body}</p>`;
        content.innerHTML += `</div>`;
      });
    // append content to document
    dogContainer.append(content);
  }
  // Increase user limit tracking
  userCount += 25;
}

// EVENT HANDLERS
loadMore.addEventListener("click", loadUsers => {
  // Maximum users reached
  if (userCount >= 501) {
    console.log(`User Limit Reached: 500`);
    return;
  } else {
    console.log(`Loading 25 more users: ${userCount}`);
    grabData(userCount);
  };
});

// Load initial 25 users
grabData(userCount);
