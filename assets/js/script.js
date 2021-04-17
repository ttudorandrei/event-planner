const CLIENT_ID = "IKFBFDDPWTL4CBLFKOWMQ0KLJVBZCPZH0R0ZO3Q3RLW54XOK";
const CLIENT_SECRET = "04FJNRC04P5EGF5QOKKSB0QLBJRYOZBQ4G2BL4LZE1GWJOUF";
const FOURSQUARE_BASE_URL = `https://api.foursquare.com/v2`;

const getFormData = () => {
  const city = $("#form-input").val();
  const countryValue = $("#country-input").val();

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
  const prefix = venueIcon.prefix;
  const suffix = venueIcon.suffix;

  return `${prefix}64${suffix}`;
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
  const imagesArray = venueImages.groups[0].items;
  const imageUrl = imagesArray.map(constructImageUrl);
  return imageUrl;
};

const getDataAboutVenue = (venue) => {
  const data = {
    name: venue.name,
    description: venue.description,
    images: getImages(venue.photos),
    url: venue.url,
    openingHours: venue.hours.status,
    address: venue.location.formattedAddress,
    contactDetails: venue.contact.phone,
    rating: venue.rating,
  };
  return data;
};

const onClick = async (event) => {
  const currentTarget = event.currentTarget;
  const venueId = $(currentTarget).data("id");
  const venueUrl = `${FOURSQUARE_BASE_URL}/venues/${venueId}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210406`;

  const data = await fetchData(venueUrl);
  const venue = data.response.venue;
  const venueData = getDataAboutVenue(venue);
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

const renderModal = () => {
  const modal = `
  <div class="modal" id="details">
    <h4 class="m-1 center-align">Venue Name</h4>
    <div class="container details-container">
      <img
        src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
        width="100"
        height="auto"
        alt=""
        class="circle center-block"
      />
      <div class="info-container m-1 border-test">
        <div>Basic information goes here about the venue.</div>
        <ul>
          <li>- Opening Hours</li>
          <li>- Address</li>
          <li>- Contact Details</li>
          <li>- Reviews</li>
          <li>- URL</li>
        </ul>
      </div>
    </div>
    <form class="m-1 row">
      <input
        type="text"
        class="col s12 m12 l12"
        placeholder="User can write text here"
      />
      <input
        type="text"
        class="datepicker"
        placeholder="Select your date"
      />
      <a href="#" class="btn blue mb-1 col s12 m6 l6">Add to wishlist</a>
      <a
        href="#"
        class="btn red mb-1 col s12 m6 l6 modal-close"
        id="close-button"
        >Close</a
      >
    </form>
  </div>`;

  $("#foursquare-container").append(modal);
  $(".modal").modal();
};

const renderSearchResultsPage = (city) => {
  $("#slider").empty();

  const navbarContainer = `    <nav id="navbar-wrapper"></nav>
`;

  //gnerates navbar
  const navBar = `
  <div class="nav-wrapper row">
  <form>
    <!-- search icon -->
    <div class="input-field col l2">
      <input id="search" type="search" required />
      <label class="label-icon" for="search"
        ><i class="fas fa-icon">Search</i></label
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
</div>`;

  //genrated card based on data from api
  //   const card = `<a href="#details" class="modal-trigger"
  // ><div class="col s12 l6">
  //   <div class="card-panel white p-1">
  //     <div class="row valign-wrapper">
  //       <div class="col s3">
  //         <img
  //           src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
  //           alt=""
  //           class="responsive-img"
  //         />
  //       </div>
  //       <div class="col s9">
  //         <span class="black-text">Venue Name Here</span>
  //       </div>
  //     </div>
  //   </div>
  // </div></a
  // >`;

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
  const widget = `<div w-type="event-discovery" w-tmapikey="0GNTLEb6ffjAj82DU3Zip5wqIzQqqi1f" w-googleapikey="YOUR_GOOGLE_API_KEY" w-keyword="" w-theme="simple" w-colorscheme="light" w-width="" w-height="500" w-size="10" w-border="0" w-borderradius="10" w-postalcode="" w-radius="25" w-city="${city}" w-period="week" w-layout="fullwidth" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-sorting="groupByName" w-id="id_9npyeo7" w-countrycode="" w-source="" w-branding="Ticketmaster" w-latlong=""></div>`;

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

  const foursquareUrl = `${FOURSQUARE_BASE_URL}/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210406&near=${data.city}&categoryId=${url}`;

  return foursquareUrl;
};

const onSubmit = async (event) => {
  event.preventDefault();
  const formData = getFormData();
  const foursquareUrl = createFoursquareUrl(formData);
  const foursquareData = await fetchFoursquareData(foursquareUrl);
  renderSearchResultsPage(formData.city);
  foursquareData.forEach(renderFoursquareCards);
  renderModal();
};

const onReady = () => {
  // activates carousel
  $(".slider").slider({
    height: 900,
    indicators: false,
    interval: 3000,
  });

  // target form and add submit event listener
  $("#form").submit(onSubmit);

  // activates dropdown on form
  $("select").formSelect();

  // activates date picker in results modal
  $(".datepicker").datepicker();
};

$(document).ready(onReady);
