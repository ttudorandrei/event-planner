// this function will retrieve whatever data is in local storage
const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("favorites"));
  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

// this will target the button and remove the object from local storage
const onRemoveFromFavorites = (event) => {
  const favoriteId = event.data.favoriteId;
  const favoriteItems = getFromLocalStorage();
  const filterItemToBeRemoved = (favorite) => favorite.id !== favoriteId;

  const filteredFavorites = favoriteItems.filter(filterItemToBeRemoved);
  console.log(favoriteId);

  // // we need to remove the old favorites
  localStorage.removeItem("favorites");

  // // set the local storage to the new favorites
  localStorage.setItem("favorites", JSON.stringify(filteredFavorites));

  appendWishlistCard(filteredFavorites);
};

const saveWishlistItem = (data) => {
  // we have our favorites from local storage as favorite items
  const favoriteItems = getFromLocalStorage();
  const findId = (favorite) => {
    return favorite.id === data.id;
  };
  // we have index of the favorite that we want to update
  const favoriteItemToUpdateIndex = favoriteItems.findIndex(findId);

  // we need a new array for our favorites that we can then update the item
  const newFavorites = [...favoriteItems];
  newFavorites[favoriteItemToUpdateIndex].textInput = data.textInput;

  // we need to remove the old favorites
  localStorage.removeItem("favorites");
  // set the local storage to the new favorites
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};

const updateWishlist = (event) => {
  event.preventDefault();
  const image = $("#image").attr("src");
  const name = $("#h4-modal").text();
  const description = $("#description").text();
  const hours = $("#opening-hours").text();
  const address = $("#address").text();
  const contact = $("#contact-details").text();
  const rating = $("#rating").text();
  const url = $("#modal-url").attr("href");
  const textInput = $("#comments-input").val();
  const dateInput = $("#date-input").val();
  const id = $("#details").data("venue-id");
  const wishlistItem = {
    id,
    image,
    name,
    description,
    hours,
    address,
    contact,
    rating,
    url,
    textInput,
    dateInput,
  };
  saveWishlistItem(wishlistItem);
};

const renderModal = (data) => {
  console.log(data);
  $("#url").empty();
  $("#modal-image").empty();

  const modalUrl = `<a href="${data.url}" target="_blank">${data.url}</a>`;
  const modalImage = `<img
    src="${data.image}"
    width="100"
    height="auto"
    alt=""
    class="center-block"
  />`;
  // append modal display information
  $("#modal-image").append(modalImage);
  $("#h4-modal").text(data.name);
  $("#description").text(data.description);
  $("#opening-hours").text(data.openingHours);
  $("#address").text(data.address);
  $("#contact-details").text(data.contactDetails);
  $("#rating").text(data.rating);
  $("#url").append(modalUrl);
  $("#details").attr("data-venue-id", data.id);
  $("#details").data("venue-id", data.id);
  console.log("thing", data.textInput);
  $("#comments-input").val(data.textInput);
};

const onDetailsClick = (event) => {
  // const currentTarget = event.currentTarget;
  const venueId = event.data.favoriteId;
  // console.log(event.data);
  const favorites = getFromLocalStorage();
  const findId = (favorites) => {
    return favorites.id === venueId;
  };
  const favoriteItem = favorites.find(findId);
  renderModal(favoriteItem);
};

// this will generate the card based on objects in local storage. Utlimately, it should contain data from the object.
const appendWishlistCard = (favorites) => {
  const appendCard = (favorite) => {
    const wishlistCard = `<div class="col m10 offset-m1" >
    <div class="card-panel grey lighten-5 z-depth-1">
      <div class="row">
        <div class="col m1 s12 center-align mt-1">${favorite.dateInput}</div>
        <div class="col m2 s12 center-align mt-1">
          <img
            src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
            alt=""
            class="circle"
            width="80px" 
            height="auto"
          />
          <!-- notice the "circle" class -->
        </div>
        <div class="col m3 s12 center-align mt-1">
          <span class="black-text">${favorite.name}</span>
        </div>
        <div class="col m3 s12 center-align mt-1 ">
        <a href="#details" class="btn orange modal-trigger details" data-favorite-id="${favorite.id}"><div >Details</div></a>
        </div>
        <div class="col m3 s12 center-align mt-1">
          <button class="btn remove-button remove" name="remove-btn" data-favorite-id="${favorite.id}">Remove</button>
        </div>
      </div>
    </div>
  </div>`;

    $("#wishlist-card-container").append(wishlistCard);
    $(`.details[data-favorite-id='${favorite.id}']`).click(
      { favoriteId: favorite.id },
      onDetailsClick
    );
    $(`.remove[data-favorite-id='${favorite.id}']`).click(
      { favoriteId: favorite.id },
      onRemoveFromFavorites
    );
  };

  $("#wishlist-card-container").empty();

  // this is going to append a card to the card container, for every object in local storage
  favorites.forEach(appendCard);
};

//take the favorites as an array or go an re fetch the favorites from local storage
//update favorites array without the favorite that we are deleting
//reset favorites in storage

const onReady = () => {
  //this sets the mock array in local storage
  const favorites = getFromLocalStorage();

  //this generates a card for every object inside the array
  appendWishlistCard(favorites);

  $(".modal").modal();
};

// $("#wishlist-card-container").click(onRemoveFromFavorites);

$("#set-to-wishlist").submit(updateWishlist);

$(document).ready(onReady);

// DONE change scope of the on click to be the details button
// get the favorite id when clicking the remove button
