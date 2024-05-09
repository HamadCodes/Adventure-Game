import inquirer from "inquirer";
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPots = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; //Percentage
let score = 0;
let isRunning = true;
console.log("\n\tWelcome to the Dungeon\n");
GAME: while (isRunning) {
    console.log("\n\n\n\n\n\n---------------------------------------------------------------------");
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t# ${enemy} has appeared! #`);
    while (enemyHealth > 0) {
        console.log(`\tYour HP: ${health}`);
        console.log(`\t${enemy}'s HP: ${enemyHealth}`);
        let { answer } = await inquirer.prompt({ message: "\n\tWhat would you like to do?",
            type: "list",
            name: "answer",
            choices: ["\tAttack", "\tDrink Health Potion", "\tRun!"] });
        if (answer == "\tAttack") {
            let damageDealt = Math.floor(Math.random() * attackDamage);
            let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log("\n\n\n\n\n\n---------------------------------------------------------------------");
            console.log(`\t> You Striked the ${enemy} for ${damageDealt} damage`);
            console.log(`\t> You recieved ${damageTaken} damage from ${enemy} in retaliation`);
            score++;
            if (health < 1) {
                console.log(`You have taken too much damage, you are too weak to go on!`);
                break;
            }
        }
        else if (answer == "\tDrink Health Potion") {
            if (numHealthPots > 0) {
                health += healthPotionHealAmount;
                numHealthPots--;
                console.log(`\t> You drank a the health potion, healing yourself for ${healthPotionHealAmount}.
                            \n\t>You now have ${health} HP\n\tYou have ${numHealthPots} Health Potions left.\n`);
            }
            else {
                console.log("\t>You have no health potion left! Defeat enemies for a chance to get one!\n");
            }
        }
        else if (answer == "\tRun!") {
            console.log(`You ran away from the ${enemy}`);
            continue GAME;
        }
        else {
            console.log("invalid input");
        }
    }
    if (health < 1) {
        console.log(`You linp out of the dungeon, weak from battle. Your score is ${score}`);
        break;
    }
    console.log("---------------------------------------------------------------------");
    console.log(` # ${enemy} was defeated! Plus+ 1 Point #`);
    console.log(` # You have ${health} HP left. #`);
    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
        numHealthPots++;
        console.log(` # The ${enemy} dropped a Health Potion! # `);
        console.log(` # You now have ${numHealthPots} Health Potion(s). # `);
    }
    console.log("---------------------------------------------------------------------");
    let { secondAnswer } = await inquirer.prompt({ message: "What would you like to do now?",
        name: "secondAnswer",
        type: "list",
        choices: ["Continue Fighting", "Exit Dungeon"]
    });
    if (secondAnswer == "Continue Fighting") {
        console.log(`You continue on your adventure!`);
    }
    else if (secondAnswer == "Exit Dungeon") {
        console.log(`You Exit the Dungeon, Successfull from your Adventures! Your Score is ${score}`);
        break;
    }
}
console.log("########################");
console.log("## Thanks For PLaying ##");
console.log("########################");
