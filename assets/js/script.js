// activates carousel
$(document).ready(function () {
  $(".slider").slider({
    height: 900,
    indicators: false,
    interval: 3000,
  });

  const getFormData = (event) => {
    console.log(event);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    getFormData(event);
  };

  $("#form").submit(onSubmit);

  // activates dropdown on form
  $("select").formSelect();
});
