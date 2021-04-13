const venueDetailsModal = () => {
  $(".modal").modal();
};

$(document).ready(function () {
  $(".datepicker").datepicker();
});

// this shows the modal on button click
$(document).ready(venueDetailsModal);
