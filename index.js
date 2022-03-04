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

	await sleep(3000);
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

		console.log(chalk.blue(`Our thoughts match `) + chalk.red(`${score}%`));

		if (score >= 85) {
			console.log(yosay(`${chalk.blue("Are you my clone?")} `));
		} else if (score >= 75) {
			console.log(yosay(`${chalk.blue("We have so much in common?")} `));
		} else if (score >= 65) {
			console.log(yosay(`${chalk.blue("We can get along pretty easily")} `));
		} else {
			console.log(yosay(`${chalk.blue("Nice to meet you!")}`));
		}

		console.log("Now that we have met, you can start conversation with me here ⬇\n");
		console.log(chalk.yellowBright("LinkedIn - ") + "https://www.linkedin.com/in/serjeel-ranjan-0331b31ab/")
		console.log(chalk.yellowBright("Twitter - ") + "https://twitter.com/r_serjeel/"+"\n");

		console.log(chalk.greenBright("Visit my website - ") + "https://serjeel-ranjan.netlify.app/")
		process.exit(0);
	});
}

async function question1() {
	console.clear();

	console.log(yosay(`boo! 👻 ${chalk.blue("Spooky ")} question`));

	const options = {
		"I have met one": 10,
		"Yes I am a believer": 9,
		"I believe in paranormal activities": 8,
		"No I am a scientific person": 6,
	};

	const answers = await inquirer.prompt({
		name: "question_1",
		type: "list",
		message: `${chalk.bgRed("Do you believe in ghosts?")}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_1]);
}

async function question2() {
	console.clear();

	console.log(
		yosay(`My season! and My ${chalk.blue("Coffee")}, 🤗 Best combination `)
	);

	const options = {
		Spring: 7,
		Summer: 10,
		Winter: 5,
		Fall: 6,
	};

	const answers = await inquirer.prompt({
		name: "question_2",
		type: "list",
		message: `${chalk.bgRed("What's your favorite season?\n")}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_2]);
}

async function question3() {
	console.clear();

	console.log(yosay(`Take some break from 💆‍♂ ${chalk.blue("Work")} ‍`));

	const options = {
		"Listening to music": 10,
		"Going out": 9,
		"Fooood!!!": 8,
		Yoga: 7,
	};

	const answers = await inquirer.prompt({
		name: "question_3",
		type: "list",
		message: `${chalk.bgRed("What is likely to be your stress buster?")}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_3]);
}

async function question4() {
	console.clear();

	console.log(yosay(`Wanna be ${chalk.blue("linguist")}? ‍`));

	const options = {
		Japanese: 8,
		French: 7,
		German: 6,
		Russian: 7,
	};

	const answers = await inquirer.prompt({
		name: "question_4",
		type: "list",
		message: `${chalk.bgRed("What foreign language you want to learn?")}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_4]);
}

async function question5() {
	console.clear();

	console.log(yosay(`Maybe / May not be‍`));

	const options = {
		"I already have one": 9,
		"I want one": 8,
		"I want but I can't": 6,
		"Nope it's bad": 7,
	};

	const answers = await inquirer.prompt({
		name: "question_5",
		type: "list",
		message: `${chalk.bgRed("Do you want a tattoo?")}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_5]);
}

async function question6() {
	console.clear();

	console.log(yosay(`${chalk.blue("Mind")} game for you`));

	const answers = await inquirer.prompt({
		name: "question_6",
		type: "input",
		message: `${chalk.bgRed(
			"To which word you and add two letters to make it shorter?"
		)}\n`,
		default() {
			return "";
		},
	});

	return handleAnswer(answers.question_6.toUpperCase() === "SHORT" ? 10 : 6);
}

async function question7() {
	console.clear();

	console.log(yosay(`Lovely 💗 ${chalk.blue("Childhood")}`));

	const options = {
		Astronaut: 9,
		Teacher: 8,
		Sportsman: 6,
		Doctor: 7,
	};

	const answers = await inquirer.prompt({
		name: "question_7",
		type: "list",
		message: `${chalk.bgRed(
			"What likely you wanted to become in childhood?"
		)}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_7]);
}

async function question8() {
	console.clear();

	console.log(yosay(`Nothing like 🏠${chalk.blue("home")}`));

	const options = {
		"New York": 9,
		Tokyo: 8,
		"Los Angeles": 8,
		Amsterdam: 7,
		Madrid: 7,
	};

	const answers = await inquirer.prompt({
		name: "question_8",
		type: "list",
		message: `${chalk.bgRed("What city you want to live in?")}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_8]);
}

async function question9() {
	console.clear();

	console.log(yosay(`Another ${chalk.blue("mind")} game for you`));

	const answers = await inquirer.prompt({
		name: "question_9",
		type: "input",
		message: `${chalk.bgRed(
			"What goes up and down, but always remains in the same place?"
		)}\n`,
		default() {
			return "";
		},
	});

	return handleAnswer(answers.question_9.toUpperCase() === "STAIRS" ? 10 : 6);
}

async function question10() {
	console.clear();

	console.log(yosay(`Interesting`));

	const options = {
		Yes: 9,
		No: 9,
	};

	const answers = await inquirer.prompt({
		name: "question_10",
		type: "list",
		message: `${chalk.bgRed("Ever been in relationship?\n")}\n`,
		choices: Object.keys(options),
	});

	return handleAnswer(options[answers.question_10]);
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
EndTheQuiz();
