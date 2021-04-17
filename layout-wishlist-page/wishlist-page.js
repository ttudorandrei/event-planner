const mockObject = {
  venueId: "55e208b8498e8745284c3f82",
  venueName: "Starbucks",
  venueType: "Coffee Shop",
};

const mockObjectTwo = {
  venueId: "55e208b8498e8745284c3f83",
  venueName: "Starbucks",
  venueType: "Coffee Shop",
};

const mockObjectThree = {
  venueId: "55e208b8498e8745284c3f81",
  venueName: "Starbucks",
  venueType: "Coffee Shop",
};

const mockArray = [mockObject, mockObjectTwo, mockObjectThree];

const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("favorites"));
  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const onRemoveFromFavorites = function (event) {
  // const removeButton = $(this);
  // const venueId = removeButton.data("venue");
  // console.log(removeButton, venueId);
  const target = $(event.target);
  const currentTarget = $(event.currentTarget);
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

const appendWishlistCard = (mockArray) => {
  const appendCard = (item) => {
    const wishlistCard = `<div class="col s12 m8 offset-m2 l6 offset-l3" >
    <div class="card-panel grey lighten-5 z-depth-1">
      <div class="row valign-wrapper">
        <div class="col l2">Date</div>
        <div class="col s2 l2">
          <img
            src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
            alt=""
            class="circle responsive-img"
          />
          <!-- notice the "circle" class -->
        </div>
        <div class="col l4">
          <span class="black-text">
            This is a square image. Add the "circle" class to it to make
            it appear circular.
          </span>
        </div>
        <div class="col l2">comments</div>
        <div class="col l2">
          <button class="btn remove-button" name="remove-btn" data-venue="${item.venueId}">Remove</button>
        </div>
      </div>
    </div>
  </div>`;

    $("#wishlist-card-container").append(wishlistCard);
  };

  mockArray.forEach(appendCard);
};

//DONE for each favorite inside the array render a card
//for each card deleteFromFavorites()
//take the favorites as an array or go an re fetch the favorites from local storage
//update favorites array without the favorite that we are deleting
//reset favorites in storage

const removeFromLocalStorage = (event) => {
  //this should remove the targeted item from the array
  //use splice?
};

$("#remove-button").on("click,", removeFromLocalStorage(event));

const onReady = () => {
  //this sets the mock array in local storage
  const favorites = JSON.stringify(mockArray);
  localStorage.setItem("favorites", favorites);

  //this generates a card for every object inside the array
  appendWishlistCard(mockArray);
};

$("#wishlist-card-container").on("click", onRemoveFromFavorites);

$(document).ready(onReady);
