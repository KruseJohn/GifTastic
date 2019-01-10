// ************  Api Key = VQVE4TWxa31vYL0rVQmC5oiSRQgC4taw  **************


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

        item = {}
        // This prevents an empty text box from being submitted as a button or into the array...
        if (!topic) {
            item.topic = "";
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Please type a name into the search field!',
                imageUrl: 'assets/images/darknight.gif',
                imageWidth: 300,
                imageHeight: 200,
                customClass: 'animated flash',
            });
            return false;
        }

        // This prevents a duplicate hero button from being created, leaving it out of the array...
        for (i = 0; i < topics.length; i++) {
            if (topics[i] === topic) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: topic + ' already exists...  Please add a different Superhero!',
                    imageUrl: 'assets/images/duplicate.gif',
                    imageWidth: 400,
                    imageHeight: 200,
                    customClass: 'animated flash',
                });
                $("#gif-input").val("");
                return false;
            }
        }

        // Adding the new gif (topic) from the textbox to our topic array
        topics.push(topic);
        console.log(topics);

        // Empty the user text box field after submit
        $("#gif-input").val("");

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

        // This empty function prevents the "favorites" window from popping up after the first click
        window.swal = function () {};

        // Show and hide on "favorites" page
        $("#return").show();
        $("#dead").show();
        $("#spinner").show();
        $("#favGifs").show();
        $("#gifs-appear-here").hide();
        $("#gifs-appear-here1").hide();
        $("#gifs-appear-here2").hide();
        $("#gifs-appear-here3").hide();
        $("#gifs-appear-here4").hide();
        $("#add").hide();
        $("#gif-buttons").hide();
        $("#search").hide();
        $("#friends").hide();
        $(".jumbotron").hide();


        //  When user clicks "return to main page" button, show and hide on main page...
        $("#return").on("click", function () {

            $("#return").hide();
            $("#dead").hide();
            $("#spinner").hide();
            $("#favGifs").hide();
            $("#gifs-appear-here").show();
            $("#gifs-appear-here1").show();
            $("#gifs-appear-here2").show();
            $("#gifs-appear-here3").show();
            $("#gifs-appear-here4").show();
            $("#add").hide();
            $("#gif-buttons").show();
            $("#search").show();
            $("#friends").show();
            $(".jumbotron").show();

        }); // end of "return" button function

    }); // end of favorite button function

    // Hide the permanent items found on "favorites" page

    //  $("#add").hide();
    $("#return").hide();
    $("#dead").hide();
    $("#spinner").hide();
    $("#add").hide();



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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=VQVE4TWxa31vYL0rVQmC5oiSRQgC4taw&limit=51&rating=pg";
        console.log(queryURL);
        // Performing our AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // After the data comes back from the API
            .done(function (response) {

                // Storing an array of results in the results variable
                var results = response.data;
                console.log(results);

                // Empty the gifDiv before loading any new set of heros
                $("#gifs-appear-here").empty(gifDiv);
                $("#gifs-appear-here1").empty(gifDiv);
                $("#gifs-appear-here2").empty(gifDiv);
                $("#gifs-appear-here3").empty(gifDiv);
                $("#gifs-appear-here4").empty(gifDiv);

                // Looping over every result item
                for (var i = 1; i < results.length; i++) {

                    var idTag = hero + i;
                    idTagFixed = idTag.split(' ').join('');
                    console.log(idTag);
                    // Creating a div for the gif                  
                    var gifDiv = $("<div>", {
                        class: 'holder',
                        id: idTagFixed
                    });

                    // Add variable rating and store it
                    var rating = results[i].rating;

                    // Create a line tag with the result item's index number and rating                 
                    var p = $('<p>').text("Gif #" + i + " ---    Rating: " + rating).css("color", "wheat");

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
                    //  gifDiv.append(p);
                    gifDiv.append(p, favBtn);
                    gifDiv.prepend(gifHero);


                    // Conditionals to distribute gifs into 5 different divs (for adding gifs to page with button)...
                    if (i < 11) {

                        $("#gifs-appear-here").append(gifDiv);

                    } else if (i > 10 && i < 21) {

                        $("#gifs-appear-here1").append(gifDiv);

                    } else if (i > 20 && i < 31) {

                        $("#gifs-appear-here2").append(gifDiv);

                    } else if (i > 30 && i < 41) {

                        $("#gifs-appear-here3").append(gifDiv);

                    } else {

                        $("#gifs-appear-here4").append(gifDiv);
                    }

                    $("#add").show();
                    $("#gifs-appear-here").show();
                    $("#gifs-appear-here1").hide();
                    $("#gifs-appear-here2").hide();
                    $("#gifs-appear-here3").hide();
                    $("#gifs-appear-here4").hide();

                    // Function to add gifs to page... 
                    (function () {

                        var click = 0;

                        $("#add").click(function () {

                            click += 1;
                            console.log(click);

                            if (click == 1) {

                                $("#gifs-appear-here").show();
                                $("#gifs-appear-here1").show();
                                $("#gifs-appear-here2").hide();
                                $("#gifs-appear-here3").hide();
                                $("#gifs-appear-here4").hide();

                            } else if (click == 2) {

                                $("#gifs-appear-here").show();
                                $("#gifs-appear-here1").show();
                                $("#gifs-appear-here2").show();
                                $("#gifs-appear-here3").hide();
                                $("#gifs-appear-here4").hide();

                            } else if (click == 3) {

                                $("#gifs-appear-here").show();
                                $("#gifs-appear-here1").show();
                                $("#gifs-appear-here2").show();
                                $("#gifs-appear-here3").show();
                                $("#gifs-appear-here4").hide();

                            } else if (click == 4) {

                                $("#gifs-appear-here").show();
                                $("#gifs-appear-here1").show();
                                $("#gifs-appear-here2").show();
                                $("#gifs-appear-here3").show();
                                $("#gifs-appear-here4").show();

                            } else {

                                // Alert for user has met the limit for number of gifs on one page...
                                swal({
                                    title: 'Sorry!',
                                    text: 'No more than 50 Gifs can be added...',
                                    imageUrl: 'assets/images/sorry.gif',
                                    imageWidth: 300,
                                    imageHeight: 150,
                                    animation: false,
                                    customClass: 'animated flash',
                                });
                            }
                        });
                    })();

                    //  on.click function when gifHero is pressed
                    gifHero.on("click", animateGif);

                } // end of for loop...

            }); // end of done response...

    }); // end of document on-click...

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
                class: "holder",
                id: "fav" + parentCard
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

    }); // end of document.body function

    // When the user scrolls down 600px from the top of the document, show "back to top" button
    var btn = $('#upBtn');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 600) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });

}); // end of document.ready function...