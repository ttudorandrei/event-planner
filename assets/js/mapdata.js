const getVenueType = (venue) => {
  if (venue.length === 0) {
    return "Unknown";
  } else {
    return venue[0].name;
  }
};

const getData = (venue) => {
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

const onReady = async () => {
  const data = await fetchData(
    "https://api.foursquare.com/v2/venues/search?client_id=IKFBFDDPWTL4CBLFKOWMQ0KLJVBZCPZH0R0ZO3Q3RLW54XOK&client_secret=04FJNRC04P5EGF5QOKKSB0QLBJRYOZBQ4G2BL4LZE1GWJOUF&v=20210406&near=Solihull"
  );
  const venues = data.response.venues;
  const venueData = venues.map(getData);
  console.log(venueData);
};

$(document).ready(onReady);
