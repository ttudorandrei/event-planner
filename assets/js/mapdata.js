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
  console.log(venue);
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
  console.log(data);
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

const onSubmit = async (event) => {
  event.preventDefault();
  const data = await fetchData(
    "https://api.foursquare.com/v2/venues/574ee86d498ed3dc81888e48?client_id=IKFBFDDPWTL4CBLFKOWMQ0KLJVBZCPZH0R0ZO3Q3RLW54XOK&client_secret=04FJNRC04P5EGF5QOKKSB0QLBJRYOZBQ4G2BL4LZE1GWJOUF&v=20210406"
  );
  const venue = data.response.venue;
  const venueData = getDataAboutVenue(venue);
};

const onReady = async () => {
  const data = await fetchData(
    "https://api.foursquare.com/v2/venues/search?client_id=IKFBFDDPWTL4CBLFKOWMQ0KLJVBZCPZH0R0ZO3Q3RLW54XOK&client_secret=04FJNRC04P5EGF5QOKKSB0QLBJRYOZBQ4G2BL4LZE1GWJOUF&v=20210406&near=Solihull"
  );
  const venue = data.response.venues;
  const venueData = venue.map(getDataFromSearch);
  console.log(venueData);
};

$("#form").submit(onSubmit);
$(document).ready(onReady);
