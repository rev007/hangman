$(document).ready(function () {

  // ARRAYS
  //----------------------
  // array of words
  let wordArr = ["pariseault", "runner", "burtons", "renewable", "daisy", "pro", "ram", "sim", "airplay", "retina", "voiceover",
      "encrypted", "continuity", "download", "alloy", "steps", "ecosystem", "isaac", "upgrade", "hero", "authentication", "keynote",
      "development", "culture", "earth", "inspire", "compete", "portability", "health", "podcasts", "empathy", "passions", "personlized",
      "curated", "unboxing", "applecard", "affordability", "avenues", "feedback", "probe", "connection", "facetime", "recognition",
      "experience", "services", "mirroring", "streaming", "icloud", "privacy", "credo", "accountability", "wellness", "replacement",
      "sharing", "approach", "listen", "present", "extend", "chip", "infograph", "dialogue", "appletv", "challenges",
      "activity", "webex", "empower", "motivation", "progress", "metrics", "selfies"];
  const wordArrCopy = ["pariseault", "runner", "burtons", "renewable", "daisy", "pro", "ram", "sim", "airplay", "retina", "voiceover",
      "encrypted", "continuity", "download", "alloy", "steps", "ecosystem", "isaac", "upgrade", "hero", "authentication", "keynote",
      "development", "culture", "earth", "inspire", "compete", "portability", "health", "podcasts", "empathy", "passions", "personlized",
      "curated", "unboxing", "applecard", "affordability", "avenues", "feedback", "probe", "connection", "facetime", "recognition",
      "experience", "services", "mirroring", "streaming", "icloud", "privacy", "credo", "accountability", "wellness", "replacement",
      "sharing", "approach", "listen", "present", "extend", "chip", "infograph", "dialogue", "appletv", "challenges",
      "activity", "webex", "empower", "motivation", "progress", "metrics", "selfies"];
  let usedWords = []; // already used words for debugging
  // Array to hold the letters of the randomWord
  var randomWordLetters = [];
  // Array to hold the asterisks pushed in place of each letter
  var answerArr = [];
  // Wrong letters array (blank so letters can be stored there as guessed)
  var wrongLetter = [];

  // VARIABLES
  //---------------------------
  var numGuess = 7; // H-A-N-G-M-A-N
  var wins = 0;
  var losses = 0;
  var randomWord = "";
  let indexOfNewWord = -1;
  let gameHasStarted = false;

  // Variables for displaying
  var answerLetters = document.getElementById("letters");
  var usedLetters = document.getElementById("wrongLetters");
  var guessCount = document.getElementById("guessCount");
  var winCounter = document.getElementById("wins");
  var lossCounter = document.getElementById("losses");
  // var message = document.getElementById("lettermessage");
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
    numGuess = 7; // H-A-N-G-M-A-N

    console.log(wordArr); // for debugging
    console.log("wordArr length is " + wordArr.length); // for debugging

    // TEMP SOLUTION TO END THE GAME... check to see if out of words to guess
    if (wordArr.length == 0) {
        console.log("There are no words left to guess!");
        answerLetters.innerHTML = "game over";
        gameHasStarted = false;
        throw new Error("Game over!");
        // do something to end the game correctly like asking if they want to play again
        // yes? then set wordArr to copyWordArr and start over
    }

    // computer selects random word from array
    // randomWord = wordArr[Math.floor(Math.random() * wordArr.length)]; // original code but don't know how good it is
    indexOfNewWord = getRandomIntInclusive(0, wordArr.length - 1);
    console.log("random number for index of word = " + indexOfNewWord); // for debugging
    randomWord = wordArr[indexOfNewWord];
    // test randomWord
    console.log(randomWord);
    // test if randomWord has already been guessed
    console.log("Has this randomWord already been solved?... " + checkIfWinner(randomWord, usedWords)); // for debugging
    console.log("used words = " + usedWords); // for debugging
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
    // message.innerHTML = " ";
  }

  // GET RANDOM INTEGER BETWEEN TWO VALUES (INCLUSIVE OF BOTH VALUES)
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // CHECK IF WORD WAS ALREADY GUESSED CORRECTLY (FOR DEBUGGING)
  function checkIfWinner(word, listOfWinners) {
    let isWordUsed = "Nope.";
    for(const winner of listOfWinners) {
      if (word == winner)
          isWordUsed = "Yes!!!";
    }
    return isWordUsed;
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
    $("#letters").show();
    gameHasStarted = true;
    // TODO
    // why does this need an inline margin at the bottom? Nancy Drew time
    // $("#letters").css('margin-bottom', 62 + "px");
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
      usedWords.push(randomWord); // for debugging
      wordArr.splice(indexOfNewWord, 1); // remove winning word from list of words to choose from
      // display win message (alert until I figure out another way)
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
        // message.innerHTML = "Pick a letter!";
        //  alert('Pick a letter');

      }

      // call the afterGuess function
      //setTimeout(afterGuess, 1000);
      if (gameHasStarted)
        afterGuess();
  }

});