//The neccessary const lines
const { kMaxLength } = require("buffer");
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

//This this will be the number that the computor comes up with guess.
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//This game is reversed , now the human tries to guess the computers number.
start();

//a function to be able to use the await function
async function start() {
  console.log(
    "Let's reverse the roles, you, human will try and guess the computers number"
  );
  //setting the range and genrating the computers number
  let min = 1;
  let max = 100;
  let compNum = randomNum(min, max);

  //The human gives his first guess
  let answer = await ask("please type in your first guess\n");
  let myNum = parseInt(answer);
  // If statement for the win, while loop for he game play
  if (myNum === compNum) {
    console.log("that was quick");
    process.exit();
  } else {
    while (myNum !== compNum) {
      //If number is out of range
      if (myNum < min || myNum > max) {
        console.log(`${myNum} is not within the range`);
      } else if (myNum < compNum) {
        //If number is lower
        console.log("wrong, my number is higher");
      } else if (myNum > compNum) {
        //If number is higher
        console.log("wrong, my number is lower");
      } else {
        //catchall
        console.log("Does not compute");
      }
      //resetting the guess
      response = await ask("\n>_");
      myNum = parseInt(response);
    }
  }
  //Game Over
  console.log("yeepy kay yeah, we have a winner");
  process.exit();
}
