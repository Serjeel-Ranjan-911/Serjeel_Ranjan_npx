#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import yosay from "yosay";
import { createSpinner } from "nanospinner";

let playerName;
let score = 0;

// artificial delay
const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

//function to listen to keypress
const keypress = async () => {
	process.stdin.setRawMode(true);
	return new Promise((resolve) =>
		process.stdin.once("data", () => {
			process.stdin.setRawMode(false);
			resolve();
		})
	);
};

// welcome a new user
async function welcome() {
	const rainbowTitle = chalkAnimation.rainbow(
		"Welcome to Serjeel Ranjan's CLI \n"
	);

	await sleep();
	rainbowTitle.stop();

	console.log(`
    ${chalk.bgBlue("WHAT DO I DO HERE?")} 
    Let us know each other a bit more.
    And for that I will be asking you ${chalk.bgYellow("10 Questions")} 
    Let's see how you do.

  `);

	console.log(yosay(`Don't worry they will be ${chalk.blue("easy")}`));

	console.log(chalk.bgGreen(`\npress any key to continue...`));
	await keypress();
}

async function handleAnswer(optionScore) {
	const spinner = createSpinner("Processing...").start();
	await sleep();
	spinner.success();

	score += optionScore;
}

async function askName() {
	console.clear();
	console.log(yosay(`Don't be ${chalk.blue("shy")}`));

	const answers = await inquirer.prompt({
		name: "player_name",
		type: "input",
		message: `${chalk.bgRed("What name people call you with?")}\n`,
		default() {
			return "Anonymous";
		},
	});

	playerName = answers.player_name;
}

function EndTheQuiz() {
	console.clear();
	figlet(`Woohoo! , ${playerName} !`, (err, data) => {
		console.log(gradient.pastel.multiline(data) + "\n");

    console.log(chalk.bgBlueBright(`Your score is ${score}`));
		process.exit(0);
	});
}

async function question1() {
	console.clear();

	const options = {
		"Yes": 10,
		"No": 6,
	};

	const answers = await inquirer.prompt({
		name: "question_1",
		type: "list",
		message: "Do you believe in ghosts?\n",
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_1]);
}

console.clear();
await welcome();
await askName();
await question1();
EndTheQuiz();
