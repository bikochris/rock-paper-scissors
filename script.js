function getComputerChoice(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function computerSelection() {
  const myArray = ['rock', 'paper', 'scissors'];
  const randomElement = getComputerChoice(myArray);
  console.log('Computer choice:', randomElement);
  return randomElement;
}

function getPlayerChoice(round) {
  const choice = ['rock', 'paper', 'scissors'];
  return new Promise((resolve) => {
    const userInput = window.prompt(`Round ${round}: Enter your choice (Rock, Paper, or Scissors): `);
    const lowerUserInput = userInput.toLowerCase();
    if (choice.includes(lowerUserInput)) {
      console.log('Player choice:', lowerUserInput);
      resolve(lowerUserInput);
    } else {
      console.log('Invalid choice. Please choose from Rock, Paper, or Scissors.');
      resolve(null);
    }
  });
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

async function game() {
  let playerScore = 0;
  let computerScore = 0;

  for (let round = 1; round <= 5; round++) {
    console.log(`--- Round ${round} ---`);

    const playerChoice = await getPlayerChoice(round);
    if (playerChoice === null) {
      round--;
      continue;
    }

    const computerChoice = computerSelection();

    const result = playRound(playerChoice, computerChoice);
    if (result === 'player') {
      playerScore++;
      console.log(`You win! ${playerChoice} beats ${computerChoice}`);
    } else if (result === 'computer') {
      computerScore++;
      console.log(`You lose! ${computerChoice} beats ${playerChoice}`);
    } else {
      console.log("It's a tie this round!");
    }

    console.log('------------------------------');
  }

  console.log('--- Game Over ---');
  console.log(`Player Score: ${playerScore}`);
  console.log(`Computer Score: ${computerScore}`);

  if (playerScore > computerScore) {
    console.log('You win the game!');
  } else if (playerScore < computerScore) {
    console.log('Computer wins the game!');
  } else {
    console.log('The game ends in a tie!');
  }
}

game();
