const CLIENT_ID = "IKFBFDDPWTL4CBLFKOWMQ0KLJVBZCPZH0R0ZO3Q3RLW54XOK";
const CLIENT_SECRET = "04FJNRC04P5EGF5QOKKSB0QLBJRYOZBQ4G2BL4LZE1GWJOUF";
const FOURSQUARE_BASE_URL = `https://api.foursquare.com/v2`;

const getFormData = () => {
  const inputValue = $("#form-input").val();
  const countryValue = $("#country-input").val();

  const wantsRestaurants = $("#restaurant").is(":checked");
  const wantsArts = $("#arts-entertainment").is(":checked");
  const wantsOutdoors = $("#outdoor-recreation").is(":checked");

  const formData = {
    inputValue,
    countryValue,
    wantsRestaurants,
    wantsArts,
    wantsOutdoors,
  };

  return formData;
};
const getVenueType = (venue) => {
  if (venue.length === 0) {
    return "Unknown";
  } else {
    return venue[0].name;
  }
};

const getDataFromSearch = (venue) => {
  const data = {
    venueName: venue.name,
    venueId: venue.id,
    venueType: getVenueType(venue.categories),
  };
  return data;
};
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const fetchFoursquareData = async (url) => {
  const data = await fetchData(url);
  const venue = data.response.venues;
  const venueData = venue.map(getDataFromSearch);
  console.log(venueData);
};

const searchBar = () => {
  $("#slider").empty();

  const navBar = `<nav>
  <div class="nav-wrapper row">
    <form>
      <!-- search icon -->
      <div class="input-field col l2">
        <input id="search" type="search" required />
        <label class="label-icon" for="search"
          ><i class="material-icons">search</i></label
        >
      </div>

      <!-- Choose a Country dropdown -->
      <div class="input-field navbar-item-color col l2 m12 s12">
        <select>
          <option value="" disabled selected>Choose a Country</option>
          <option value="greatBritain">Great Britain</option>
          <option value="andorra">Andorra</option>
          <option value="argentina">Argentina</option>
          <option value="australia">Australia</option>
          <option value="austria">Austria</option>
          <option value="azerbaijan">Azerbaijan</option>
          <option value="bahamas">Bahamas</option>
          <option value="barbados">Barbados</option>
          <option value="belgium">Belgium</option>
          <option value="bermuda">Bermuda</option>
          <option value="brazil">Brazil</option>
          <option value="bulgaria">Bulgaria</option>
          <option value="canada">Canada</option>
          <option value="chile">Chile</option>
          <option value="china">China</option>
          <option value="colombia">Colombia</option>
          <option value="costaRica">Costa Rica</option>
          <option value="croatia">Croatia</option>
          <option value="cyprus">Cyprus</option>
          <option value="czechRepublic">Czech Republic</option>
          <option value="denmark">Denmark</option>
          <option value="dominicanRepublic">Dominican Republic</option>
          <option value="ecuador">Ecuador</option>
          <option value="estonia">Estonia</option>
          <option value="faroeIslands">Faroe Islands</option>
          <option value="finland">Finland</option>
          <option value="france">France</option>
          <option value="georgia">Georgia</option>
          <option value="germany">Germany</option>
          <option value="ghana">Ghana</option>
          <option value="gibraltar">Gibraltar</option>
          <option value="greece">Greece</option>
          <option value="hongKong">Hong Kong</option>
          <option value="hungary">Hungary</option>
          <option value="iceland">Iceland</option>
          <option value="india">India</option>
          <option value="ireland">Ireland</option>
          <option value="israel">Israel</option>
          <option value="italy">Italy</option>
          <option value="jamaica">Jamaica</option>
          <option value="japan">Japan</option>
          <option value="koreaRepublicOf">Korea, Republic of</option>
          <option value="latvia">Latvia</option>
          <option value="lebanon">Lebanon</option>
          <option value="lithuania">Lithuania</option>
          <option value="luxembourg">Luxembourg</option>
          <option value="malaysia">Malaysia</option>
          <option value="malta">Malta</option>
          <option value="mexico">Mexico</option>
          <option value="monaco">Monaco</option>
          <option value="montenegro">Montenegro</option>
          <option value="morocco">Morocco</option>
          <option value="netherlands">Netherlands</option>
          <option value="netherlandsAntilles">Netherlands Antilles</option>
          <option value="newZealand">New Zealand</option>
          <option value="northernIreland">Northern Ireland</option>
          <option value="norway">Norway</option>
          <option value="peru">Peru</option>
          <option value="poland">Poland</option>
          <option value="portugal">Portugal</option>
          <option value="romania">Romania</option>
          <option value="russianFederation">Russian Federation</option>
          <option value="saintLucia">Saint Lucia</option>
          <option value="saudiArabia">Saudi Arabia</option>
          <option value="serbia">Serbia</option>
          <option value="singapore">Singapore</option>
          <option value="slovakia">Slovakia</option>
          <option value="slovenia">Slovenia</option>
          <option value="southAfrica">South Africa</option>
          <option value="spain">Spain</option>
          <option value="sweden">Sweden</option>
          <option value="switzerland">Switzerland</option>
          <option value="taiwan">Taiwan</option>
          <option value="thailand">Thailand</option>
          <option value="trinidadAndTobago">Trinidad and Tobago</option>
          <option value="turkey">Turkey</option>
          <option value="ukraine">Ukraine</option>
          <option value="unitedArabEmirates">United Arab Emirates</option>
          <option value="unitedStatesOfAmerica">
            United States of America
          </option>
          <option value="uruguay">Uruguay</option>
          <option value="venezuela">Venezuela</option>
        </select>
      </div>

      <!-- Checkboxes -->
      <!-- <div class="col s5">
        <label class="checkbox">
          <input type="checkbox" class="filled-in" checked="checked" />
          <span>Restaurants</span>
        </label>
        <label class="checkbox">
          <input type="checkbox" class="filled-in" checked="checked" />
          <span>Arts & Entertainment</span>
        </label>
        <label class="checkbox">
          <input type="checkbox" class="filled-in" checked="checked" />
          <span>Outdoor & Recreation</span>
        </label>
      </div> -->

      <!-- Multiple choice dropdown -->
      <!-- this is working but closes only when clicked on the container div, in this case the <nav></nav> -->
      <div class="input-field navbar-item-color col l2 m12 s12">
        <select multiple>
          <option value="" disabled selected>Choose a Category</option>
          <option value="1">Restaurants</option>
          <option value="2">Arts & Entertainment</option>
          <option value="3">Outdoor & Recreation</option>
        </select>
      </div>

      <!-- button -->
      <div class="col navbar-item-color l2 m12 s12">
        <a class="waves-effect waves-light btn-small">Button</a>
      </div>

      <!-- Link to Wishlist page -->
      <span class="col navbar-item-color l2 m12 s12 offset-l2">
        <ul id="nav-mobile" class="right">
          <li><a href="wishlist.html">Wishlist</a></li>
        </ul>
      </span>
    </form>
  </div>
</nav>`;
  $("#slider").append(navBar);
};

const restaurantCard = (fourSquareData) => {
  const h5 = `<h5>Restaurants</h5>`;
  const card = `<div class="col s12 l6">
  <div class="card-panel white">
    <div class="row valign-wrapper">
      <div class="col s2">
        <img
          src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
          alt=""
          class="circle responsive-img"
        />
      </div>
      <div class="col s10">
        <span class="black-text">Venue Name Here</span>
      </div>
    </div>
  </div>
  </div>`;

  $("#slider").append(h5, card);
};

const artsCard = (fourSquareData) => {
  const h5 = `<h5>Arts & Entertainment</h5>`;
  const card = `<div class="col s12 l6">
  <div class="card-panel white">
    <div class="row valign-wrapper">
      <div class="col s2">
        <img
          src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
          alt=""
          class="circle responsive-img"
        />
      </div>
      <div class="col s10">
        <span class="black-text">Venue Name Here</span>
      </div>
    </div>
  </div>
  </div>`;

  $("#slider").append(h5, card);
};

const outdoorCard = (fourSquareData) => {
  const h5 = `<h5>Outdoor & Recreation</h5>`;
  const card = `<div class="col s12 l6">
  <div class="card-panel white">
    <div class="row valign-wrapper">
      <div class="col s2">
        <img
          src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
          alt=""
          class="circle responsive-img"
        />
      </div>
      <div class="col s10">
        <span class="black-text">Venue Name Here</span>
      </div>
    </div>
  </div>
  </div>`;

  $("#slider").append(h5, card);
};

const onSubmit = (event) => {
  event.preventDefault();
  const formData = getFormData();
  const foursquareUrl = createFoursquareUrl(formData);
  fetchFoursquareData(foursquareUrl);
  console.log(formData);
  console.log(foursquareUrl);
  searchBar();
  restaurantCard();
  artsCard();
  outdoorCard();
};

const onReady = () => {
  $(".slider").slider({
    height: 900,
    indicators: false,
    interval: 3000,
  });

  // target form and add submit event listener
  $("#form").submit(onSubmit);

  // activates dropdown on form
  $("select").formSelect();
};

const createFoursquareUrl = (data) => {
  let url = "";

  if (data.wantsRestaurants) {
    url += "4d4b7105d754a06374d81259,";
  }

  if (data.wantsArts) {
    url += "4d4b7104d754a06370d81259,";
  }

  if (data.wantsOutdoors) {
    url += "4d4b7105d754a06377d81259,";
  }

  const foursquareUrl = `${FOURSQUARE_BASE_URL}/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210406&near=${data.inputValue}&categoryId=${url}`;

  return foursquareUrl;
};

// activates carousel
$(document).ready(onReady);
