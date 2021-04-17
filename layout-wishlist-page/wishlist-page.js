const mockObject = {
  venueId: "55e208b8498e8745284c3f82",
  venueName: "Starbucks",
  venueType: "Coffee Shop",
};

const mockArray = [mockObject, mockObject];

const appendWishlistCard = () => {
  const wishlistCard = `<div class="col s12 m8 offset-m2 l6 offset-l3">
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
      <div class="col l2">Remove</div>
    </div>
  </div>
</div>`;

  $("#wishlist-card-container").append(wishlistCard);
};

//for each favorite inside the array render a card
//for each card deleteFromFavorites()
//take the favorites as an array or go an re fetch the favorites from local storage
//update favorites array without the favorite that we are deleting
//reset favorites in storage

const onReady = () => {
  const favorites = JSON.stringify(mockArray);
  localStorage.setItem("favorites", favorites);
  mockArray.map(appendWishlistCard);
};

$(document).ready(onReady);
