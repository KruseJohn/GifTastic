$(document).ready(function () {
    // Array for topics...
    var topics = ["Spider-Man", "Iron Man", "Batman", "Wolverine", "Black Panther", "The Hulk", "Superman", "Wonder Woman", "Thor", "Captain America",
        "Black Widow", "Aquaman", "Deadpool", "Catwoman", "Hellboy"
    ];

    //  create buttons for the above array
    function renderButtons() {
        $("#gif-buttons").empty();

        for (var i = 0; i < topics.length; i++) {

            //  create all of the gif buttons
            var a = $("<button>");
            a.addClass("superhero");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#gif-buttons").append(a);

        } // end of for loop...

    } // end of renderButtons function...

    //  call the function  
    renderButtons();

    // This function handles events when the "add a superhero submit button" is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#gif-input").val().trim();

        // Adding the new gif (topic) from the textbox to our topic array
        topics.push(topic);
        console.log(topics);

        // This prevents an empty text box from being submitted
        if ($("#gif-input").val() === "") {
            return false;
        }
        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
    });

    // This function is for the favorite button on the webpage...
    $("#friends").click(function () {

        // Alert for navigation to "favorites" page...
        swal({
            title: 'Favorites Page',
            text: 'Click the favorites button on any Superhero Gif to remove it from this page.',
            imageUrl: 'assets/images/justice.jpg',
            imageWidth: 400,
            imageHeight: 200,
            //  animation: false,
            customClass: 'animated flash',
        });

        // Show and hide on "favorites" page
        $("#return").show();
        $("#dead").show();
        $("#spinner").show();
        $("#favGifs").show();
        $("#gifs-appear-here").hide();
        $("#gif-buttons").hide();
        $("#search").hide();
        $("#friends").hide();
        $(".jumbotron").hide();

        // This empty function prevents the "favorites" window from popping up after the first click
            window.swal = function() {};

        //  When user clicks "return to main page" button, show and hide on main page...
        $("#return").on("click", function () {

            $("#return").hide();
            $("#dead").hide();
            $("#spinner").hide();
            $("#favGifs").hide();
            $("#gifs-appear-here").show();
            $("#gif-buttons").show();
            $("#search").show();
            $("#friends").show();
            $(".jumbotron").show();
        });

    }); // end of favorite button function

    // Hide the permanent items found on "favorites" page
    //  $("#add").hide();
    //  $("#counter").hide();
    $("#return").hide();
    $("#dead").hide();
    $("#spinner").hide();

    // Event listener for all button elements
    $(document).on("click", ".superhero", function () {

        // Hide our batman greeter and his friends when a superhero button is selected
        $("#batman").hide();

        //  Move the #friends gif below the new gifs on the page 
        $("#friends").appendTo("#friends2");

        // In this case, the "this" keyword refers to the button that was clicked and
        // variable "hero" will log data from each clicked button...
        var hero = $(this).html();

        console.log(hero);

        // Constructing a URL to search Giphy for each hero after selected by user
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=VQVE4TWxa31vYL0rVQmC5oiSRQgC4taw&limit=5&rating=pg";
        console.log(queryURL);
        // Performing our AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // After the data comes back from the API
            .then(function (response) {

                // Storing an array of results in the results variable
                var results = response.data;
                console.log(results);

                // Empty the gifDiv before loading any new set of heros
                $("#gifs-appear-here").empty(gifDiv);

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    var idTag = hero + i;
                    idTagFixed = idTag.split(' ').join('');

                    // Creating a div for the gif                  
                    var gifDiv = $("<div>", {
                        class: 'holder',
                        id: idTagFixed
                    });
                    //  gifDiv.addClass("holder");

                    // Add variable rating and store it
                    var rating = results[i].rating;

                    // Create a line tag with the result item's rating, and display into html
                    var p = $('<p>').text("Rating: " + rating).css("color", "wheat");

                    // Creating variables for the gif
                    var heroImage = results[i].images.fixed_height.url;
                    var stillImage = results[i].images.fixed_height_still.url;

                    //  Creating a new variable to include data from heroImage and stillImage
                    var gifHero = $("<img>").attr("src", stillImage).attr("data-animate", heroImage).attr("data-still", stillImage).css("width", "100%").css("height", "auto");
                    gifHero.attr("data-state", "still");

                    // create a div and button for a favorite section

                    var favBtn = $("<i class='far fa-heart fa-lg'></i>");
                    favBtn.attr({
                        'favorite-status': 'No',
                        'data-parent': idTagFixed
                    }).css("float", "right").css("color", "red");

                    //  Display the gif in the html
                    gifDiv.append(p, favBtn);
                    gifDiv.prepend(gifHero);
                    $("#gifs-appear-here").append(gifDiv);

                    //  on.click function when gifHero is pressed
                    gifHero.on("click", animateGif);

                } // end of for loop...

            }); // end of done response..

        // Create function to stop and animate gifs
        function animateGif() {

            var state = $(this).attr("data-state");
            console.log(this);

            if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
                $(this).css("hover", "pointer");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }

        } // end of on-click function...

    }); // end of document on-click...

    // On click function for selection of gif as "favorite"...
    $(document.body).on("click", ".fa-heart", function () {
        var favStatus = $(this).attr("favorite-status");
        var parentCard = $(this).attr("data-parent");
        var parentCardID = "#" + parentCard;
        console.log(parentCardID);

        // Add to Favorites section
        if (favStatus === "No") {
            $(this).addClass("fas").removeClass("far");
            $(this).attr({
                'favorite-status': 'Yes'
            });
            var newFavCard = $("<div>", {
                id: "fav" + parentCard,
                class: "holder"
            });
            $(newFavCard).append($(parentCardID).html());
            $("#favGifs").append(newFavCard);
            $("#favGifs").hide();
            console.log(newFavCard);


        } else {
            // Remove from Favorites
            $("[data-parent=" + parentCard + "]").attr({
                'favorite-status': 'No'
            }).addClass("far").removeClass("fas");
            var removeFav = $("#fav" + parentCard);
            $(removeFav).remove();
        }

    });  // end of document.body function


}); // end of document.ready function...