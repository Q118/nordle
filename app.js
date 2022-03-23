const prompts = require("prompts");
const chalk = require("chalk");
const getRando = require("./helpers/letter");
const sendCall = require("./helpers/api");

let puzzle = "";

const cl = (x) => { console.log(x) };

const wordlePrompt = {
    type: "text",
    name: "word",
    message: "Enter a 5 word...",
    validate: value => value.length != 5 ? 'Word must be 5 letters' : true
};

const check = async (guess) => {
    let results = [];
    // loop over each letter in the word
    for (let i in guess) {
        let attempt = {
            letter: guess[i],
            color: "bgGrey"
        };
        // check if the letter at the specified index in the guess word exactly matches the letter at the specified index in the puzzle
        if (attempt.letter.toUpperCase() === puzzle[i].toUpperCase()) {
            process.stdout.write(chalk.white.bgGreen.bold(` ${guess[i]} \t`));
            continue;
        }
        // check if the letter at the specified index in the guess word is at least contained in the puzzle at some other position
        if (puzzle.toUpperCase().includes(attempt.letter.toUpperCase())) {
            process.stdout.write(chalk.white.bgYellow.bold(` ${guess[i]} \t`));
            continue;
        }
        // otherwise the letter doesn't exist at all in the puzzle
        process.stdout.write(chalk.white.bgGrey.bold(` ${guess[i]} \t`));
    }
    return results;
}

const play = async (tries) => {
    // the user gets 5 tries to solve the puzzle not including the first guess
    if (tries < 6) {
        // ask the player for a guess word
        const response = await prompts(wordlePrompt);
        // under the hood, below is parsing the users args from cli
        const guess = response.word.toUpperCase();
        // cl(`${puzzle} is puzzle inside of play`)
        // cl(`${guess} is guess inside of play`)
        if (guess == puzzle.toUpperCase()) {// if the word matches, they win!
            cl("WINNER!");
        } else {
            check(guess);
            // this forces std out to print out the results for the last guess
            process.stdout.write("\n");
            // repeat the game and increment the number of tries
            play(++tries);
        }
    } else {
        cl(`INCORRECT: The word was ${puzzle}`);
    }
}

const afterMain = async () => {
    await play(0); // start the game
}

async function main() {
    // get a random letter first
    let letter = await getRando();
    // then get the random word with letter
    sendCall(letter).then((word) => {
        puzzle = word;
        // cl(puzzle, "in then");
        //! uncomment above to see the answer 
        afterMain(); // start the game after the puzzle is set
    }).catch((err) => {
        console.log(err);
    });
};

main();
