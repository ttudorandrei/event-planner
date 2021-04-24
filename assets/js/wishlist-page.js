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

  // we need to remove the old favorites
  localStorage.removeItem("favorites");

  // set the local storage to the new favorites
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

//this function will render the modal for every object in local storage array
const renderModal = (data) => {
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
  $("#opening-hours").text(data.hours);
  $("#address").text(data.address);
  $("#contact-details").text(data.contact);
  $("#rating").text(data.rating);
  $("#url").append(modalUrl);
  $("#details").attr("data-venue-id", data.id);
  $("#details").data("venue-id", data.id);
  $("#comments-input").val(data.textInput);
  $("#date-input").val(data.dateInput);
};

//this will make modal pop up on click of the DETAILS button
const onDetailsClick = (event) => {
  const venueId = event.data.favoriteId;
  const favorites = getFromLocalStorage();
  const findId = (favorites) => {
    return favorites.id === venueId;
  };
  const favoriteItem = favorites.find(findId);
  renderModal(favoriteItem);
};

// this will generate and append the card based on objects in local storage
const appendWishlistCard = (favorites) => {
  const appendCard = (favorite) => {
    const wishlistCard = `<div class="col m10 s12 offset-m1" >
    <div class="card-panel z-depth-1">
      <div class="row">
        <div class="col m1 s12 center-align mt-1">${favorite.dateInput}</div>
        <div class="col m2 s12 center-align mt-1">
          <img
            src="./assets/images/favourites.png"
            alt="golden star icon"
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
        <a href="#details" class="btn modal-trigger details" data-favorite-id="${favorite.id}"><div >Details</div></a>
        </div>
        <div class="col m3 s12 center-align mt-1">
          <button class="btn red remove-button remove" name="remove-btn" data-favorite-id="${favorite.id}">Remove</button>
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

const onReady = () => {
  //this sets the mock array in local storage
  const favorites = getFromLocalStorage();

  //this generates a card for every object inside the array
  appendWishlistCard(favorites);

  $(".modal").modal();
};

$("#set-to-wishlist").submit(updateWishlist);

$(document).ready(onReady);
