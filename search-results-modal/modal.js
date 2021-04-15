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
