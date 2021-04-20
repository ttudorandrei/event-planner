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
const onRemoveFromFavorites = function (event) {
  const target = $(event.target);
  // const currentTarget = $(event.currentTarget);
  if (target.is(`button[name="remove-btn"]`)) {
    const venueId = target.data("venue");
    const favorites = getFromLocalStorage();

    const callback = (each) => {
      if (venueId !== each.venueId) {
        return true;
      } else {
        return false;
      }
    };

    const filteredFavorites = mockArray.filter(callback);
    console.log(filteredFavorites);
  }
};

const renderModal = (data) => {
  //   $("#url").empty();
  //   $("#modal-image").empty();
  //   const modalUrl = `<a href="${data.url}" target="_blank">${data.url}</a>`;
  //   const modalImage = `<img
  //   src="${data.images[1]}"
  //   width="100"
  //   height="auto"
  //   alt=""
  //   class="center-block"
  // />`;
  //   // append modal display information
  //   $("#modal-image").append(modalImage);
  // $("#h4-modal").text("name");
  //   $("#description").text(data.description);
  //   $("#opening-hours").text(data.openingHours);
  //   $("#address").text(data.address);
  //   $("#contact-details").text(data.contactDetails);
  //   $("#rating").text(data.rating);
  //   $("#url").append(modalUrl);
  // };
};

const onClick = (event) => {
  const currentTarget = event.currentTarget;
  console.log(currentTarget);
};

// this will generate the card based on objects in local storage. Utlimately, it should contain data from the object.
const appendWishlistCard = (favorites) => {
  const appendCard = (favorite) => {
    console.log(favorite);
    const wishlistCard = `<div class="col m12 l10 offset-l1" >
    <div class="card-panel grey lighten-5 z-depth-1 modal-trigger" data-favorite-id="${favorite.id}">
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
        <div class="col l5 m12 offset-m1">${favorite.textInput}</div>
        <div class="col l2 m12">
          <button class="btn remove-button" name="remove-btn" data-venue="">Remove</button>
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
};

$("#wishlist-card-container").on("click", onRemoveFromFavorites);

$(document).ready(onReady);
