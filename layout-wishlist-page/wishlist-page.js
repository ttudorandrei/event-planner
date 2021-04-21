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
  const target = $(event.target);
  const favoriteId = target.data("venue");
  const favoriteItems = getFromLocalStorage();
  const filterItemToBeRemoved = (favorite) => favorite.venueId !== favoriteId;

  const filteredFavorites = favoriteItems.filter(filterItemToBeRemoved);
  console.log(target);

  // we need to remove the old favourites
  localStorage.removeItem("favorites");
  // set the local storage to the new favourites
  localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
};

const saveWishlistItem = (data) => {
  // we have our favourites from local storage as favourite items
  const favoriteItems = getFromLocalStorage();
  const findId = (favorite) => {
    return favorite.id === data.id;
  };
  // we have index of the favourite that we want to update
  const favoriteItemToUpdateIndex = favoriteItems.findIndex(findId);

  // we need a new array for our favourites that we can then update the item
  const newFavorites = [...favoriteItems];
  newFavorites[favoriteItemToUpdateIndex].textInput = data.textInput;

  // we need to remove the old favourites
  localStorage.removeItem("favorites");
  // set the local storage to the new favourites
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

const onClick = (event) => {
  const currentTarget = event.currentTarget;
  const venueId = $(currentTarget).data("favorite-id");
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
    const wishlistCard = `<div class="col m12 l10 offset-l1" >
    <div class="card-panel grey lighten-5 z-depth-1" data-favorite-id="${favorite.id}">
      <div class="row valign-wrapper">
        <div class="col l1 m12">${favorite.dateInput}</div>
        <div class="col l2 m12">
          <img
            src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
            alt=""
            class="circle"
            width="80px" 
            height="auto"
          />
          <!-- notice the "circle" class -->
        </div>
        <div class="col l2 m12">
          <span class="black-text">${favorite.name}</span>
        </div>
        <a href="#details" class="btn orange modal-trigger"><div class="col l5 m12 offset-m1">Details</div></a>
        <div class="col l2 m12">
          <button class="btn remove-button" name="remove-btn">Remove</button>
        </div>
      </div>
    </div>
  </div>`;

    $("#wishlist-card-container").append(wishlistCard);
    $(`[data-favorite-id='${favorite.id}']`).click(onClick);
  };

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

$("#wishlist-card-container").click(onRemoveFromFavorites);

$("#set-to-wishlist").submit(updateWishlist);

$(document).ready(onReady);

// change scope of the on click to be the details button
// get the favourite id when clicking the remove button
