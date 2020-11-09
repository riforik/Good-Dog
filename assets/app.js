// V A R I A B L E S
// The element data will be sent to
const dogContainer = document.getElementById("dogData");
// Button to load more user results
const loadMore = document.getElementById("loadMore");
// Page limit tracking & url array
let userCount = 25;
const urls = ['https://jsonplaceholder.typicode.com/comments', 'https://random.dog/woof.json'];

// JSON User Data Fetch
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
    let content = document.createElement('section');
    // Grab Photos with another fetch
    fetch(urls[1])
      .then(data => data.json())
      .then(imgs => {
        content.className = `user`; // assign Class
        content.id = `${dogs[i].id}`; // assign ID
        // Exclude video formats
        if (!imgs.url.includes("mp4" || "webm")) {
          content.innerHTML += `<figure>
        <img src="${imgs.url}?size=small" class="profilePhoto" alt="User"> </figure>`;
        } else {
          content.innerHTML += ` <figure>
        <img src="./assets/img/dogImg.jpg" class="profilePhoto" alt="User"> </figure>`;
        }
        content.innerHTML += ` <summary>
        <h3 class="name heading" id="${dogs[i].postId}">${dogs[i].name}</h3>
        <span class="email info">${dogs[i].email}</span></summary>
        <p class="description">${dogs[i].body}</p>`;
        content.innerHTML += `</section>`; // close section
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
  if (userCount >= 525) {
    alert(`No more woofs`); // alert user
    return; // do not enter the population function
  } else {
    grabData(userCount); // enter the population function
  };
});

// Load initial 25 users
grabData(userCount);
