const CLIENT_ID = "IKFBFDDPWTL4CBLFKOWMQ0KLJVBZCPZH0R0ZO3Q3RLW54XOK";
const CLIENT_SECRET = "04FJNRC04P5EGF5QOKKSB0QLBJRYOZBQ4G2BL4LZE1GWJOUF";
const FOURSQUARE_BASE_URL = `https://api.foursquare.com/v2`;

const getFormData = () => {
  const city = $("#form-input").val();
  const countryValue = $("#country-input").val();
  console.log(countryValue);

  const wantsRestaurants = $("#restaurant").is(":checked");
  const wantsArts = $("#arts-entertainment").is(":checked");
  const wantsOutdoors = $("#outdoor-recreation").is(":checked");

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
  const data = {
    venueName: venue.name,
    venueId: venue.id,
    venueType: getVenueType(venue.categories),
    venueTypeIcon: getVenueTypeIcon(venue.categories),
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
  return venueData;
};

const constructImageUrl = (image) => {
  const prefix = image.prefix;
  const suffix = image.suffix;
  return `${prefix}300x500${suffix}`;
};

const getImages = (venueImages) => {
  if (venueImages.groups.length === 0) {
    return "no image";
  } else {
    const imagesArray = venueImages.groups[0].items;
    const imageUrl = imagesArray.map(constructImageUrl);
    return imageUrl;
  }
};

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
    return contactDetails.phone;
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

const getDataAboutVenue = (venue) => {
  const data = {
    name: venue.name,
    description: getDescription(venue.description),
    images: getImages(venue.photos),
    url: getUrl(venue.url),
    openingHours: getOpeningHours(venue.defaultHours),
    address: venue.location.formattedAddress,
    contactDetails: getContactDetails(venue.contact),
    rating: getRating(venue.rating),
  };
  console.log(data);
  return data;
};

const renderModal = (data) => {
  $("#url").empty();
  $("#modal-image").empty();

  const modalUrl = `<a href="${data.url}" target="_blank">${data.url}</a>`;
  const modalImage = `<img
  src="${data.images[1]}"
  width="100"
  height="auto"
  alt=""
  class="center-block"
/>`;

  $("#modal-image").append(modalImage);
  $("#h4-modal").text(data.name);
  $("#description").text(data.description);
  $("#opening-hours").text(data.openingHours);
  $("#address").text(data.address);
  $("#contact-details").text(data.contactDetails);
  $("#rating").text(data.rating);
  $("#url").append(modalUrl);
};

//changes on 18-08-2021
// this function will retrieve whatever data is in local storage
// const getFromLocalStorage = () => {
//   const localStorageData = JSON.parse(localStorage.getItem("favorites"));
//   if (localStorageData === null) {
//     return [];
//   } else {
//     return localStorageData;
//   }
// };

//   const addToFavourite = (event, data) => {
//   event.preventDefault();

//   // const favoriteItems = JSON.parse(localStorage.getItem("favorites"));
//   const favoriteItems = getFromLocalStorage();

//   favoriteItems.push(data);

//   localStorage.setItem("favorites", JSON.stringify(favoriteItems));
// };

// const onClickAddFavourite = (event) => {
//   event.preventDefault();
//   const currentTarget = $(event.currentTarget);

// const elementName =

//   //this is working with mock data
//   const objectIntoWishlist = {
//     name: currentTarget,
//     // date: "today",
//   };
//   console.log(objectIntoWishlist);
// };

// $("#set-to-wishlist").click(addToFavourite, onClickAddFavourite);

// end of changes

const onClick = async (event) => {
  const currentTarget = event.currentTarget;
  const venueId = $(currentTarget).data("id");
  const venueUrl = `${FOURSQUARE_BASE_URL}/venues/${venueId}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210406`;

  const data = await fetchData(venueUrl);
  const venue = data.response.venue;
  const venueData = getDataAboutVenue(venue);
  renderModal(venueData);
};

const renderFoursquareCards = (data) => {
  const card = `<a href="#details" class="modal-trigger"
><div class="col s12 l6">
  <div class="card-panel black p-1" data-id="${data.venueId}">
    <div class="row valign-wrapper>
      <div class="col s3">
        <img
          src="${data.venueTypeIcon}"
          alt=""
          class="responsive-img"
        />
      </div>
      <div class="col s9">
        <div class="white-text">${data.venueName}</div>
        <div class="white-text">${data.venueType}</div>
      </div>
    </div>
  </div>
</div></a
>`;

  $("#foursquare-container").append(card);
  $(`[data-id='${data.venueId}']`).click(onClick);
};

const renderSearchResultsPage = (data) => {
  $("#slider").empty();
  $("#navbar-wrapper").remove();
  $("#search-results-page-container").empty();

  const navbarContainer = `    <nav id="navbar-wrapper"></nav>
`;

  //generates navbar
  const navBar = `
  <div class="nav-wrapper row">
  <form id="nav-form">
    <!-- search icon -->
    <div class="input-field col l2">
      <input id="form-input" type="search" required />
      <label class="label-icon" for="search"
        ><i class="fas fa-icon">Search</i></label
      >
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

    <!-- button -->
    <div class="col navbar-item-color l2 m12 s12">
      <button class="waves-effect waves-light btn-small">Button</button>
    </div>

    <!-- Link to Wishlist page -->
    <span class="col navbar-item-color l2 m12 s12 offset-l2">
      <ul id="nav-mobile" class="right">
        <li><a href="wishlist.html">Wishlist</a></li>
      </ul>
    </span>
  </form>
</div>`;

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

  $(".header").after(navbarContainer);

  $("#navbar-wrapper").append(navBar);

  // Function to facilitate form select in navbar
  $("select").formSelect();

  $("#content-container").append(searchResultsPageContainer);

  $("#search-results-page-container").append(
    foursquareSection,
    ticketmasterSection
  );

  $("#ticketmaster-container").append(widget);

  $("#widget-script").append(widgetScript);

  $("#nav-form").submit(onSubmit);
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

  const foursquareUrl = `${FOURSQUARE_BASE_URL}/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210406&near=${data.city},${data.countryValue}&categoryId=${url}`;

  return foursquareUrl;
};

const onSubmit = async (event) => {
  event.preventDefault();
  const formData = getFormData();

  const foursquareUrl = createFoursquareUrl(formData);
  const foursquareData = await fetchFoursquareData(foursquareUrl);
  renderSearchResultsPage(formData);
  foursquareData.forEach(renderFoursquareCards);
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

  //this will read data from local storage
  getFromLocalStorage();
};

$(document).ready(onReady);
