const readline = require("readline");
const r1 = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
   return new Promise ((resolve, reject) => {
      r1.question(questionText, resolve);
  });
}
console.log ('Lets play a game \n You will think of a number between 1 and 100. \nI will guess your numbre in 7 tries or less./n My abilitis are very, very, very good i.e. excellent')

start();
 
async function start() {
   let secretNumber = await ask('Do you have your secret number?\nDon\'t worry, I won\'t peek...\n type in Y if Yes or N if you do not') 

   console.log ('[Yes, I have a number"')
   let max=100
   let min= 1
   let guess = Math.floor((max-min)/2) // An efficent guess

    //Computers first guess, Ask if right or wrong
     let YesOrNo = await ask(`is your number, ${guess},? enter Y if yes or N if No\n`);
    //If yes game is over

  if (yesOrNo.toUpperCase().trim() == "Y") {
    console.log(`I knew your number was ${guess}`)
 
// New max and min
} else {
  let higherOrlower = await ask(`is your number higher or lower than ${guess} enter H if higher or L for lower.\n)`)  }
  while (higherOrLower.toUpperCase().trim() =='H') {
      // if person's number higher, new min should be last guess +1, max should be same, new guess computed
  min = guess +1;
  }  
  
  while (higherOrLower.toUpperCase().trim =="L")
  // If peron\'s number is lower, then we need a new nax, min does not chanse
  {max = guess - 1;
    let yesOrNo = await ask(`is your number ${guess}? Enter Y if yes or N if no\n`);
  }
process.exit()
}