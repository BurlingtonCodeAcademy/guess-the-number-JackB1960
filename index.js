//The neccessary const lines
const { SlowBuffer } = require("buffer");
const { Console } = require("console");
const { exit } = require("process");
const readline = require("readline");
const r1 = readline.createInterface(process.stdin, process.stdout);

//A promise to ask will reurn a resolve, reject
function ask(questionText) {
  return new Promise((resolve, reject) => {
    r1.question(questionText, resolve);
  });
}

//This game is where the player sets the max

//This this will be the numbers that I guess. always half way between the max and min, The max or min will change after every guess
function randomNum(min, max) {
  return Math.floor((max + min) / 2);
}

function cheatCheck(min, max, hiLow, response, myNumber, secretNumber) {
  if (myNumber < min && hiLow === "L") {
    console.log("CHEATER");
  } else if (myNumber > max && hiLow == "H") {
    console.log("CHEATER");
  } else if (myNumber !== secretNumber && response === 'Y'){
    console.log('CHEATER')
  }
}

start();

//a function to be able to use the await function
async function start() {
  //We're explaining the game to the potential player
  console.log(
    "Let's play a game where you make up a number and I try to guess it."
  );
  let max = await ask("Type in the max\n");
  let min = await ask("Now type in the min\n");
  max = parseInt(max);
  min = parseInt(min);

  //we wait for their answer and his number
  let answer = await ask(
    "do you have your secret number? please type it in\nDon't worry, I won't peek\n"
  );
  let secretNumber = parseInt(answer);

  //my first guess
  let myNumber = randomNum(min, max);

  //Players first response
  let response = await ask(
    `Is you number ${myNumber}?,\nIf yes, type in Y, if no type in N\n`
  );
  //If I guess it on the first try it's over
  if (response === "Y") {
    console.log("That was fast");
    process.exit();
  } else {
    while (response !== "Y") {
      let hiLow = await ask("is your number higher or lower? Type in H or L\n");
      //If higher then min changes to my guess and max stays the same, If lower, max changes to my guess and min stays the same
      if (hiLow === "H") {
        cheatCheck(min, max, hiLow, response, myNumber, secretNumber)
        min = myNumber + 1;
        myNumber = randomNum(min, max);
      } else if (hiLow === "L") {
        cheatCheck(min, max, hiLow, response, myNumber, secretNumber)
        max = myNumber - 1;
        myNumber = randomNum(min, max);
      } else {
        //If they type in anything but what is allowed then this console.log shows up
        console.log("input not recognized");
      }
      response = await ask(
        `Is your number ${myNumber}? Type in Y for Yes or N for No\n`
      );
    }
  }
  //we guessed their number
  console.log(`Your number was ${myNumber}`);
  process.exit();
}
