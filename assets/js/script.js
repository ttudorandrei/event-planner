const CLIENT_ID = "IKFBFDDPWTL4CBLFKOWMQ0KLJVBZCPZH0R0ZO3Q3RLW54XOK";
const CLIENT_SECRET = "04FJNRC04P5EGF5QOKKSB0QLBJRYOZBQ4G2BL4LZE1GWJOUF";
const FOURSQUARE_BASE_URL = `https://api.foursquare.com/v2`;

// local storage functions
const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("favorites"));
  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const addToWishlist = (data) => {
  const favoriteItems = getFromLocalStorage();
  favoriteItems.push(data);
  localStorage.setItem("favorites", JSON.stringify(favoriteItems));
};

const onSubmitAddToWishlist = (event) => {
  // get data from the modal and create an object
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
  addToWishlist(wishlistItem);
};

// get data functions
const getFormData = () => {
  // get the city and country from the inputs
  const city = $("#form-input-search").val();
  const countryValue = $("#country-input").val();

  // check which checkbox has been checked
  const wantsRestaurants = $("#restaurant").is(":checked");
  const wantsArts = $("#arts-entertainment").is(":checked");
  const wantsOutdoors = $("#outdoor-recreation").is(":checked");

  // add data into an object
  const formData = {
    city,
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

const getVenueTypeIcon = (venue) => {
  // if a venue icon is returned, construct icon url
  const venueIcon = venue[0].icon;
  if (venueIcon === undefined) {
    return "";
  } else {
    const prefix = venueIcon.prefix;
    const suffix = venueIcon.suffix;
    return `${prefix}64${suffix}`;
  }
};

const getDataFromSearch = (venue) => {
  // pull necessary data from the api
  const data = {
    venueName: venue.name,
    venueId: venue.id,
    venueType: getVenueType(venue.categories),
    venueTypeIcon: getVenueTypeIcon(venue.categories),
  };
  return data;
};

const getImages = (venueImages) => {
  // if there is an image for that venue, access image and construct image url
  if (venueImages.count === 0) {
    return "/assets/images/placeholder.png";
  } else {
    const imagesArray = venueImages.groups[0].items;
    const imageUrl = constructImageUrl(imagesArray[0]);
    return imageUrl;
  }
};

//if this piece of information is missing, the "Currently Unavailable"
const getOpeningHours = (openingHours) => {
  if (openingHours === undefined) {
    return "Currently Unavailable";
  } else {
    return openingHours.status;
  }
};

const getContactDetails = (contactDetails) => {
  if (contactDetails === undefined) {
    return "Currently Unavailable";
  } else {
    return contactDetails;
  }
};

const getRating = (rating) => {
  if (rating === undefined) {
    return "Currently Unavailable";
  } else {
    return rating;
  }
};

const getDescription = (description) => {
  if (description === undefined) {
    return "";
  } else {
    return description;
  }
};

const getUrl = (url) => {
  if (url === undefined) {
    return "Currently Unavailable";
  } else {
    return url;
  }
};

//this stores the venue data into an object
const getDataAboutVenue = (venue) => {
  const data = {
    name: venue.name,
    id: venue.id,
    description: getDescription(venue.description),
    image: getImages(venue.photos),
    url: getUrl(venue.url),
    openingHours: getOpeningHours(venue.defaultHours),
    address: venue.location.formattedAddress,
    contactDetails: getContactDetails(venue.contact.phone),
    rating: getRating(venue.rating),
  };
  return data;
};

// fetch data functions
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.meta.code !== 200) {
      renderErrorMessage();
    } else {
      return data;
    }
  } catch (error) {}
};

const fetchFoursquareData = async (url) => {
  const data = await fetchData(url);

  if (data !== undefined) {
    const venue = data.response.venues;
    const venueData = venue.map(getDataFromSearch);
    return venueData;
  }
};

// construct url functions
const createFoursquareUrl = (data) => {
  // if the user wants a category, add the category id to the url
  let categories = "";

  if (data.wantsRestaurants) {
    categories += "4d4b7105d754a06374d81259,";
  }

  if (data.wantsArts) {
    categories += "4d4b7104d754a06370d81259,";
  }

  if (data.wantsOutdoors) {
    categories += "4d4b7105d754a06377d81259,";
  }

  const foursquareUrl = `${FOURSQUARE_BASE_URL}/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210406&near=${data.city},${data.countryValue}&categoryId=${categories}`;

  return foursquareUrl;
};

//this is constructing the img url
const constructImageUrl = (image) => {
  const prefix = image.prefix;
  const suffix = image.suffix;
  return `${prefix}300x500${suffix}`;
};

// on click functions
const onClickClose = () => {
  $("#comments-input").val("");
  $("#date-input").val("");
};

const onClickModal = async (event) => {
  // get id from current target and pass into url
  const currentTarget = event.currentTarget;
  const venueId = $(currentTarget).data("id");
  const venueUrl = `${FOURSQUARE_BASE_URL}/venues/${venueId}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210406`;

  // fetch data from foursquare api and render modal
  const data = await fetchData(venueUrl);
  const venue = data.response.venue;
  const venueData = getDataAboutVenue(venue);
  renderModal(venueData);
};

// render functions
const renderErrorMessage = () => {
  // clear any info on page
  $("#slider").empty();

  renderNavBar();
  // create and append error message
  const errorMessage = `<div class="row error-container">
  <div class="col l6 offset-l3 error">
  <h3>Something went wrong!</h3>
  <div class="p-2">Oops, we were not able to find the city you are looking for. Please enter a valid city name. If the problem persists, please try again at a later time.</div>
  </div>
  </div>`;

  // append to slider
  $("#slider").append(errorMessage);
};

//this function is used to render the modal
const renderModal = (data) => {
  $("#url").empty();
  $("#modal-image").empty();
  $("#contact-details").text("");

  // construct modal url and image
  const modalUrl = `<a href="${data.url}" target="_blank" id="modal-url">${data.url}</a>`;
  const modalImage = `<img
  src="${data.image}"
  width="100"
  height="auto"
  alt=""
  class="center-block"
  id="image"
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
};

//this function builds and appends the venue cards
const renderFoursquareCards = (data) => {
  const card = `<a href="#details" class="modal-trigger"
><div class="col s12 l6">
  <div class="card-panel p-1" data-id="${data.venueId}">
    <div class="row">
      <div class="col l3 s3">
        <img
          src="${data.venueTypeIcon}"
          alt=""
          class="responsive-img"
        />
      </div>
      <div class="col l8 s8 m-1">
        <div class="white-text">${data.venueName}</div>
        <div class="white-text venue-type">${data.venueType}</div>
      </div>
    </div>
  </div>
</div></a
>`;

  $("#foursquare-container").append(card);
  $(`[data-id='${data.venueId}']`).click(onClickModal);
};

//this will render the navbar in the search-results page
const renderNavBar = () => {
  const navbarContainer = `<nav id="navbar-wrapper"></nav>`;
  //generate navbar
  const navBar = `
  <div>
  <form id="nav-form" class="nav-wrapper row">
    <!-- search icon -->
    <div class="input-field  col l2 text-black">
        <input id="form-input-search" class="city-input text-black" type="search" placeholder="Search for a city" required />
      
    </div>

    <!-- Choose a Country dropdown -->
    <div class="input-field navbar-item-color col l2 m12 s12">
      <select id="country-input">
        <option value="" disabled selected>Choose a Country</option>
        <option value="GB">Great Britain</option>
        <option value="AD">Andorra</option>
        <option value="AR">Argentina</option>
        <option value="AU">Australia</option>
        <option value="AT">Austria</option>
        <option value="AZ">Azerbaijan</option>
        <option value="BS">Bahamas</option>
        <option value="BB">Barbados</option>
        <option value="BE">Belgium</option>
        <option value="BM">Bermuda</option>
        <option value="BR">Brazil</option>
        <option value="BG">Bulgaria</option>
        <option value="CA">Canada</option>
        <option value="CL">Chile</option>
        <option value="CN">China</option>
        <option value="CO">Colombia</option>
        <option value="CR">Costa Rica</option>
        <option value="HR">Croatia</option>
        <option value="CY">Cyprus</option>
        <option value="CZ">Czech Republic</option>
        <option value="DK">Denmark</option>
        <option value="DO">Dominican Republic</option>
        <option value="EC">Ecuador</option>
        <option value="EE">Estonia</option>
        <option value="FO">Faroe Islands</option>
        <option value="FI">Finland</option>
        <option value="FR">France</option>
        <option value="GE">Georgia</option>
        <option value="DE">Germany</option>
        <option value="GH">Ghana</option>
        <option value="GI">Gibraltar</option>
        <option value="GR">Greece</option>
        <option value="HK">Hong Kong</option>
        <option value="HU">Hungary</option>
        <option value="IS">Iceland</option>
        <option value="IN">India</option>
        <option value="IE">Ireland</option>
        <option value="IL">Israel</option>
        <option value="IT">Italy</option>
        <option value="JM">Jamaica</option>
        <option value="JP">Japan</option>
        <option value="KR">Korea, Republic of</option>
        <option value="LV">Latvia</option>
        <option value="LB">Lebanon</option>
        <option value="LT">Lithuania</option>
        <option value="LU">Luxembourg</option>
        <option value="MY">Malaysia</option>
        <option value="MT">Malta</option>
        <option value="MX">Mexico</option>
        <option value="MC">Monaco</option>
        <option value="ME">Montenegro</option>
        <option value="MA">Morocco</option>
        <option value="NL">Netherlands</option>
        <option value="AN">Netherlands Antilles</option>
        <option value="NZ">New Zealand</option>
        <option value="ND">Northern Ireland</option>
        <option value="NO">Norway</option>
        <option value="PE">Peru</option>
        <option value="PL">Poland</option>
        <option value="PT">Portugal</option>
        <option value="RO">Romania</option>
        <option value="RU">Russian Federation</option>
        <option value="LC">Saint Lucia</option>
        <option value="SA">Saudi Arabia</option>
        <option value="RS">Serbia</option>
        <option value="SG">Singapore</option>
        <option value="SK">Slovakia</option>
        <option value="SI">Slovenia</option>
        <option value="ZA">South Africa</option>
        <option value="ES">Spain</option>
        <option value="SE">Sweden</option>
        <option value="CH">Switzerland</option>
        <option value="TW">Taiwan</option>
        <option value="TH">Thailand</option>
        <option value="TT">Trinidad and Tobago</option>
        <option value="TR">Turkey</option>
        <option value="UA">Ukraine</option>
        <option value="AE">United Arab Emirates</option>
        <option value="US">
          United States of America
        </option>
        <option value="UY">Uruguay</option>
        <option value="VE">Venezuela</option>
      </select>
    </div>

    <!-- Multiple choice dropdown -->
    <!-- this is working but closes only when clicked on the container div, in this case the <nav></nav> -->
    <div class="input-field navbar-item-color col l2 m12 s12">
      <select multiple>
        <option value="" disabled selected>Choose a Category</option>
        <option value="1" id="restaurant">Restaurants</option>
        <option value="2" id="arts-entertainment">Arts & Entertainment</option>
        <option value="3" id="outdoor-recreation">Outdoor & Recreation</option>
      </select>
    </div>

    <div class="row col l6 m12 s12 navbar-item-color">
          <!-- button -->
          <div class="col navbar-item-color l4 m6 s6">
            <button class="waves-effect waves-light btn-small">Search</button>
          </div>

          <!-- Link to Wishlist page -->
          <span class="col navbar-item-color l4 m6 s6 offset-l4">
            <ul id="nav-mobile" class="right">
              <li><a href="./wishlist-page.html">Wishlist</a></li>
            </ul>
          </span>
        </div>
  </form>
</div>`;

  // append navbar
  $(".header").after(navbarContainer);
  $("#navbar-wrapper").append(navBar);
  $("select").formSelect();
  $("#nav-form").submit(onSubmit);
};

const renderSearchResultsPage = (data) => {
  // remove previous content
  $("#slider").remove();
  $("#navbar-wrapper").remove();
  $("#search-results-footer").remove();
  $("#search-results-page-container").empty();

  renderNavBar();

  //creates the search result container
  const searchResultsPageContainer = `<div class="row" id="search-results-page-container"></div>`;

  //creates the venues section
  const foursquareSection = `<section class="col l8 m12 s12 venues-section" id="foursquare-container">
  </section>`;

  //creates the widget section
  const ticketmasterSection = `
  <!-- Section for Ticketmaster Widget -->
        <section class="col l4 m12 s12 widget-section">
                    <div class="container" id="ticketmaster-container"></div>
        </section>`;

  //widget source code
  const widget = `<div w-type="event-discovery" w-tmapikey="0GNTLEb6ffjAj82DU3Zip5wqIzQqqi1f" w-googleapikey="YOUR_GOOGLE_API_KEY" w-keyword="" w-theme="simple" w-colorscheme="light" w-width="" w-height="500" w-size="10" w-border="0" w-borderradius="10" w-postalcode="" w-radius="25" w-city="${data.city}" w-period="week" w-layout="fullwidth" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-sorting="groupByName" w-id="id_9npyeo7" w-countrycode="${data.countryValue}" w-source="" w-branding="Ticketmaster" w-latlong=""></div>`;

  const widgetScript = `<script src="https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js"></script>`;

  // Footer Code
  const footer = `<!-- Footer -->
  <footer class="page-footer" id="search-results-footer">
    <div class="container center-align pb-1">© 2021 Copyright Sights & Sounds Team</div>
  </footer>`;

  // append all elements
  $("#content-container").addClass("mt-2");
  $("#content-container").append(searchResultsPageContainer);
  $("#search-results-page-container").append(
    foursquareSection,
    ticketmasterSection
  );
  $("#ticketmaster-container").append(widget);
  $("#widget-script").append(widgetScript);
  $("body").append(footer);
};

// on submit and on ready functions
const onSubmit = async (event) => {
  // on submit of form - get the data from the form, create foursquare url and fetch foursquare data using that url
  event.preventDefault();
  if ($("#form-input-search").val() !== "") {
    const formData = getFormData();
    const foursquareUrl = createFoursquareUrl(formData);
    const foursquareData = await fetchFoursquareData(foursquareUrl);

    // if the foursquare data is not returned undefined - render the search results page and the cards
    if (foursquareData !== undefined) {
      renderSearchResultsPage(formData);
      foursquareData.forEach(renderFoursquareCards);
    }
  } else {
    renderErrorMessage();
  }
};

const onReady = () => {
  // activates carousel
  $(".slider").slider({
    height: 900,
    indicators: false,
    interval: 3000,
  });

  // activates modal
  $(".modal").modal();

  // target form and add submit event listener
  $("#form").submit(onSubmit);

  // activates dropdown on form
  $("select").formSelect();

  // activates date picker in results modal
  $(".datepicker").datepicker();
};

//function to run on ready
$(document).ready(onReady);

//function to run on submit
$("#set-to-wishlist").submit(onSubmitAddToWishlist);

$("#close-button").click(onClickClose);
