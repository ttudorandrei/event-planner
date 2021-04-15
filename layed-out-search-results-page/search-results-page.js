// Function to facilitate form select in navbar
$(document).ready(function () {
  $("select").formSelect();
});

// JS for WIDGET
const button = document.getElementById("button");
const cityInput = $("#city-name-input");
const country = $("#country");

// this function will dynamically create the widget and append it along with its script
const createWidget = () => {
  //this is the code for the widget
  const widget = `<div w-type="event-discovery" w-tmapikey="0GNTLEb6ffjAj82DU3Zip5wqIzQqqi1f" w-googleapikey="YOUR_GOOGLE_API_KEY" w-keyword="" w-theme="simple" w-colorscheme="light" w-width="300" w-height="500" w-size="10" w-border="0" w-borderradius="10" w-postalcode="" w-radius="25" w-city="${cityInput.val()}" w-period="week" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-sorting="groupByName" w-id="id_9npyeo7" w-countrycode="" w-source="" w-branding="Ticketmaster" w-latlong=""></div>`;

  //this is the code for the widget script. It needs to be dynamically created and appended along with the widget, otherwise it won`t work
  const widgetScript = `<script src="https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js"></script>`;

  //this code will make sure that the container is empty before appending any widgets and then append. This will ultimately allow for multiple searches without the widget being generated multiple times
  $("#widget-container").empty();
  $("#widget-container").append(widget);
  $("#widget-script").append(widgetScript);
};

button.onclick = function () {
  createWidget();
};

// Modal JS
const venueDetailsModal = () => {
  $(".modal").modal();
};

const commentsModal = () => {
  $(".comments-modal").modal();
};

$(document).ready(function () {
  $(".datepicker").datepicker();
});

// this shows the modal on button click
$(document).ready(venueDetailsModal, commentsModal);
