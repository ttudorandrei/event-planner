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

const onSubmit = (event) => {
  event.preventDefault();
  const formData = getFormData();
  const foursquareUrl = createFoursquareUrl(formData);
  fetchFoursquareData(foursquareUrl);
  console.log(formData);
  console.log(foursquareUrl);
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
