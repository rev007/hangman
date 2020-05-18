$(document).ready(function () {

  // ARRAYS
  //----------------------
  // array of words 
  var wordArr = ["groovy", "aquarius", "stoned", "protest", "peaceful", "incense", "counterculture", "hallucination", "psychedelic", "tripping", "woodstock",
    "liberation", "karma", "rocknroll", "sixties", "flower"
  ];
  // Array to hold the letters of the randomWord
  var randomWordLetters = [];
  // Array to hold the asterisks pushed in place of each letter
  var answerArr = [];
  // Wrong letters array (blank so letters can be stored there as guessed)
  var wrongLetter = [];

  // VARIABLES
  //---------------------------
  var numGuess = 10;
  var wins = 0;
  var losses = 0;
  var randomWord = "";

  // Variables for displaying
  var answerLetters = document.getElementById("letters");
  var usedLetters = document.getElementById("wrongLetters");
  var guessCount = document.getElementById("guessCount");
  var winCounter = document.getElementById("wins");
  var lossCounter = document.getElementById("losses");
  var message = document.getElementById("lettermessage");
  var finalword = document.getElementById(".finalWord");
  $(".winner-message").hide();
  $(".loser-message").hide();

  // THE GAME
  //-----------------------
  // START/RESTART - chooses a new word and sets counters/arrays back to starting point
  function gameSet() {
    // hide the messages
    $(".winner-message").hide();
    $(".loser-message").hide();
    // set counters at startpoint
    numGuess = 10;
    // computer selects random word from array
    randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    // test randomWord
    console.log(randomWord);
    // turn letters in randomWord into string
    randomWordLetters = randomWord.split("");
    // set array for letters
    answerArr = [];
    // turn letters in word into asterisks
    for (var i = 0; i < randomWordLetters.length; i++) {
      answerArr.push("*");
    }
    // test answerArr with asterisks
    console.log(answerArr);
    // set empty array for wrong guesses
    wrongLetter = [];
    // display 
    answerLetters.innerHTML = answerArr.join(" ");
    usedLetters.innerHTML = wrongLetter.join(" ");
    guessCount.innerHTML = numGuess;
    message.innerHTML = " ";
  }

  // CHECK GUESSED LETTERS
  function checkLetter(keyGuess) {
    var letter = false;
    for (var i = 0; i < randomWordLetters.length; i++) { // check the guessed letter against letters in the word
      if (randomWord[i] === keyGuess) { // if guessed letter is in word 
        console.log(keyGuess);
        answerArr[i] = keyGuess;
        letter = true; // add letter to answer
      }
    }
    // test
    console.log(answerArr);

    if (!letter) { // if guessed letter is not in word 
      wrongLetter.push(keyGuess); // add letter to wrongLetter array 
      numGuess--; // subtract 1 from guesses
    }
  }

  function winner() {
    $(".winner-message").show();
  }

  function loser() {
    $(".loser-message").show();
  }

  $(".hide-btn").on("click", function () {
    gameSet();
  });

  $(".start-btn").on("click", function () {
    $(".start-game").hide();
    gameSet();
  });

  // AFTER EACH LETTER IS GUESSED
  function afterGuess() {
    // update HTML 
    answerLetters.innerHTML = answerArr.join(" ");
    usedLetters.innerHTML = wrongLetter.join(" ");
    guessCount.innerHTML = numGuess;
    // check if game is lost
    if (numGuess === 0) {
      // Add (1) to losses
      losses++;
      lossCounter.innerHTML = losses;
      // display losing message 
      loser();
      // message.innerHTML = "Get it together! The word was " + randomWord + "!";
      // alert("Get it together! The word was " + randomWord + "!");
      // gameSet();
    }
    // check if game is won
    else if (randomWordLetters.toString() === answerArr.toString()) {
      // Add (1) to wins
      wins++;
      winCounter.innerHTML = wins;
      // disply win message (alert until I figure out another way)
      winner();
      //message.innerHTML = "Far out! The word was " + randomWord + "!";
      // alert("Far out! The word was " + randomWord + "!");
      //restart the game
      // gameSet();
    }
  }

  // PLAYING GAME
  //----------------------
  // call the start of game 
  // gameSet();

  // USER INPUT
  document.onkeyup = function (e) {
    let letterKey = e.key; // put user input into variable
    if (letterKey.match(/^[A-Za-z]+$/) && letterKey.length === 1) // check if key pressed is a letter
      checkLetter(letterKey); // run checkLetter function to check if letter is in word and push it to proper array
    else { // if it's not a letter display alert
      message.innerHTML = "Pick a letter!";
      //  alert('Pick a letter');

    }

    // call the afterGuess function
    //setTimeout(afterGuess, 1000);
    afterGuess();
  }

});