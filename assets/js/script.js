// activates carousel
$(document).ready(function () {
  $(".slider").slider({
    height: 900,
    indicators: false,
    interval: 3000,
  });

  const getFormData = (event) => {
    // get city, country and venue types
    console.log(event);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    getFormData(event);
  };

  // target form and add submit event listener
  $("#form").submit(onSubmit);

  // activates dropdown on form
  $("select").formSelect();
});
