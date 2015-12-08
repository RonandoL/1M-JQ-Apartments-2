$(document).ready(function() {
// AJAX: Receive data
  // 1. add Ajax, w/dataType & success as settings.  $.ajax(url[, settings])
    $.ajax({
      url: "https://api.myjson.com/bins/2sadq?pretty=1",
        dataType: "json",
        success: function(response) {

// GRAB & DISPLAY DATA:
  // 3a. create new html element, append to DOM, get array out of object iterate through array
            $.each(response.apartments, function(i, apartment) {
  // 4d. apply filtering class to apartment city: handle caps and spaces
                var apartmentClass = apartment.city.toLowerCase().replace(" ", "-");
  // 3b. make variable to append to DOM
                var listing = "<a href='#' id=" + apartment.id + " class='list-group-item " + apartmentClass + " listings'><h4 class='list-group-item-heading'>" + apartment.description + " // <span class='green'> Bdrms: " + apartment.bedrooms + "</span> // <span class='blue'>" + apartment.price + "</span></h4><p class='list-group-item-text'> <span class='rust'>" + apartment.city + ", " + apartment.neighborhood + "</span></p></a>";
  // 3c. display data: append variable to DOM
                $(".apartments").append(listing);
            });
      },
  // 2. add error handling to ajax
        error: function(error) {
          console.log(error);
        }
    });

// FILTER CITIES
  // 4a. have filter links filter out cities, when clicked
    $(".filter").click(function() {
  // 6. active class: blue header
      // 6a. remove active class from all of the filters when one is clicked
        $(".filter").removeClass("active");
      //  6b. add active class to the one that's clicked
        $(this).addClass("active");
  // 4e. show all listings before hiding the ones we don't want.
        $(".listings").show()
  // 4b. save ID city of the selector using, .attr(), as variable to use repeatedly.
        var city = $(this).attr("id");
  // 5. fix the All cities button: use IF/Else
        if (city !== "all") {
  // 4c. compare list items new class "listings" to the <a> ID, filter out listings that don't have the city
        $(".listings").not("." + city).css("display", "none");  // this turns the city filter into a class
        }

    });

// SHOW MAP
  // 7. targeting dynamic element in DOM
    $(document).on("click", ".listings", function() {
  // 3a. save apt id as a variable
        var id = $(this).attr("id");
  // 8. use ajax to target specific apartment that was clicked, get its address, to do something
        $.ajax({
          url: "https://api.myjson.com/bins/2sadq?pretty=1",
            dataType: "json",
            success: function(response) {
                var selectedApartment = $.grep(response.apartments, function(apartment) {
                    return apartment.id == id;
                });
  // 9. grab address from listing
                var address = selectedApartment[0].address;
  // 11. show modal, append image of apartment to modal
                $(".modal").modal("show");
        // ** but this doesn't work! Why not?
                $(".modal-pic").append(selectedApartment[0].id + ".jpg");
  // 10. open google maps with address
                window.open("http://maps.google.com/?q=" + address);

        },
    // 2. add error handling to ajax
            error: function(error) {
              console.log(error);
          }
      });
    });

});
