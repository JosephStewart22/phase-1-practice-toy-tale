let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
// hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// Selecting toy form and adding event listener for submission
document.querySelector(".add-toy-form").addEventListener("submit",toyHandler);
// Function to handle submit inputs
function toyHandler(e) {
e.preventDefault()
let toyObject = {
  name: e.target.name.value,
  image: e.target.image.value,
  likes: 10000
}
cardRender(toyObject);
serverPost(toyObject);
}
// Access the list of toys from an API (mocked using JSON Server)
//GETS DATA FROM SERVER
function serverGet(url) {
return fetch(url) 
  .then (response => response.json())
  .then (data => data.forEach(toy => cardRender(toy)));
}
serverGet("http://localhost:3000/toys");
// render each of them in a "card" on the page
function cardRender (toys) {
let cardData = document.createElement("li")
cardData.innerHTML += 
`<div class="card">
<h2>${toys.name}</h2>
<img src="${toys.image}" class="toy-avatar" />
<p>${toys.likes} Likes</p>
<button class="like-btn" id="${toys.id}">Like ❤️</button>
</div>
`
document.querySelector("#toy-collection").append(cardData);
cardData.querySelector(".like-btn").addEventListener("click", () => {
  toys.likes += 1
  cardData.querySelector(".card p").innerText = toys.likes
})
}
//POST DATA TO SERVER
function serverPost(toyObject) {
  return fetch("http://localhost:3000/toys", {
  method: 'POST',
  headers: {
  "Content-Type": "application/json"
},
  body:JSON.stringify(toyObject) 
    })
    // .then(res => res.json())
}
//PATCH DATA TO SERVER
function serverPatch(toyObject) {
  return fetch("http://localhost:3000/toys", {
  method: 'PATCH',
  headers: {
  "Content-Type": "application/json"
},
  body:JSON.stringify(toyObject) 
    })
    .then(res => res.json())
}
// Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM
// Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM
//When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.