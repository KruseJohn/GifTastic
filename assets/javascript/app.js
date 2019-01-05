$(document).ready(function () {
    // Array for topics...
    var topics = ["Spider-Man", "Iron Man", "Batman", "Wolverine", "Black Panther", "The Hulk", "Superman", "Wonder Woman", "Thor", "Captain America",
        "Black Widow", "Aquaman", "Deadpool", "Catwoman", "Hellboy"];

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
        if ($("#gif-input").val() === "")  {
            return false;
        }
        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
    });

    // This function is for a secret button on the webpage...
    $("#friends").click(function () {
        
        // Alert user upon finding the secret button...
        swal({
            title: 'Congratulations!!!',
            text: 'You have found the secret button.  A new "Marvel Studio" button has been created and the gifs will automatically appear!!!',
            imageUrl: 'https://media.giphy.com/media/l4FGni1RBAR2OWsGk/giphy.gif',
            imageWidth: 500,
            imageHeight: 250,
            //  animation: false,
            customClass: 'animated flash',
        });

        var secret = "Marvel Studios";
        topics.push(secret);
        renderButtons();
        $(".superhero").trigger("click");
        
    }); // end of secret button function

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

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=VQVE4TWxa31vYL0rVQmC5oiSRQgC4taw&limit=10&rating=pg";
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

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Creating a div for the gif
                    var gifDiv = $("<div class='d-inline'>");
                    gifDiv.addClass("holder");
    
                    // Add variable rating and store it
                    var rating = results[i].rating;

                    // Create a line tag with the result item's rating, and display into html
                    var p = $('<p>').text("Rating: " + rating);

                    // Creating variables for the gif
                    var heroImage = results[i].images.fixed_height.url;
                    var stillImage = results[i].images.fixed_height_still.url;

                    //  Creating a new variable to include data from heroImage and stillImage
                    var gifHero = $("<img>").attr("src", stillImage).attr("data-animate", heroImage).attr("data-still", stillImage).css("width", "100%").css("height", "auto");
                    gifHero.attr("data-state", "still");

                    //  Display the gif in the html
                    gifDiv.append(p);
                    gifDiv.prepend(gifHero);

                    $("#gifs-appear-here").append(gifDiv);

                    //  on.click function when gifHero is pressed
                    gifHero.on("click", animateGif);

                } // end of for loop...

            }); // end of done response...

        // Create function to stop and animate gifs
        function animateGif() {

            var state = $(this).attr("data-state");
            console.log(this);

            if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");

            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }

        } // end of on-click function...



    }); // end of document on-click...




}); // end of document.ready function...