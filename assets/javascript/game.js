// declare global variables
var wins = 0;
var losses = 0;
var randomScore = 0;
var userScore = 0;
var crystals = [0, 0, 0, 0];   // the intial values for all 4 crystals

$(document).ready(function() {
    $("#yourScore").text("999");
    

    reset();

    $(".btn .crystal").on("click", function() {
        var crystal = $(this).val() - 1;    // call val() to get the reference of which crystal was clicked
        userScore += crystals[crystal];     // add the hidden value of that crystal to the total
        $("#userScore").text(userScore);
        if (userScore === randomScore) {
            alert("You won!!!!");
            wins++;
            $(".wins").text("Wins: " + wins);
            reset();
        } else if (userScore > randomScore) {
            alert("You went over...you lose!");
            losses++;
            $(".losses").text("Losses: " + losses);
            reset();
        }
    });

});

// We will use this function to generate both our random numbers for the random score between 19 - 120
// And we will use this function to generate the value of each crystal between 1 - 12
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1 - min)) + min; //The maximum and the minimum are inclusive
}

function reset() {
    randomScore = 0;
    userScore = 0;
    crystals = [0, 0, 0, 0];

    randomScore = getRandomInt(19, 120);
    $("#randomScore").text(randomScore);
    $("#userScore").text(userScore);
    for (i = 0; i < crystals.length; i++) {
        crystals[i] = getRandomInt(1, 12);   // get the random value for each of the crysals.  If we saw that value already throw away and get another one (unique)
        for (j = 0; j < i; j++) {
            // make sure we didn't see this value and set it to anther crystal already (guarantee uniqueness)
            if (crystals[i] === crystals[j]) {
                crystals[i] = getRandomInt(1, 12);  // go get another one since it dup'd
                // now we have a newly generated random number we need to check for dups from the beginning again
                j = -1;
            }
        }
    }
}