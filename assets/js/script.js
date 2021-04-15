// activates carousel
$(document).ready(function () {
  $(".slider").slider({
    height: 900,
    indicators: false,
    interval: 3000,
  });

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

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = getFormData();
    console.log(formData);
  };

  // target form and add submit event listener
  $("#form").submit(onSubmit);

  // activates dropdown on form
  $("select").formSelect();
});
