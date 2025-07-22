#!/usr/bin/env node

import chalk from "chalk"; // Import chalk for color
import { Command } from "commander";
import fs from "fs";
import open from "open"; // ES module import
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const program = new Command();

// List of available PDFs
const recipeFiles = {
  rice: "rice-cooking-manual.pdf",
  egg: "egg-frying-manual.pdf",
  lentil: "one-person-single-day-lentil-cooking-recipe.pdf",
};

// Get current file location (even in global install)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Recipes folder relative to installed CLI
const recipesDirectory = resolve(__dirname, "recipes"); // Use resolve to handle paths more robustly

// Function to open the recipe PDF
function openRecipeFile(recipeName) {
  const filePath = join(recipesDirectory, recipeFiles[recipeName]);

  console.log(chalk.blue(`Looking for the recipe file: ${filePath}`)); // Inform user of the search path

  if (fs.existsSync(filePath)) {
    open(filePath);
    console.log(
      chalk.green(`✓ Successfully opened the ${recipeFiles[recipeName]} PDF!`)
    ); // Success message
  } else {
    console.log(chalk.red(`✖ Error: ${recipeFiles[recipeName]} not found.`)); // Error message
    console.log(
      chalk.yellow(
        `Please make sure the PDF exists in the "recipes" directory.`
      )
    ); // User guidance
  }
}

// Register CLI commands
Object.keys(recipeFiles).forEach((recipe) => {
  program
    .command(recipe)
    .description(
      `Open the ${
        recipe.charAt(0).toUpperCase() + recipe.slice(1)
      } Cooking Manual PDF`
    )
    .action(() => openRecipeFile(recipe));
});

// Parse the input command
program.parse(process.argv);

// If no command is provided, show a help message
if (!process.argv.slice(2).length) {
  console.log(
    chalk.yellow(
      'No command specified. Please provide a valid recipe command like "rice", "egg", or "lentil".'
    )
  );
  program.help(); // Show help message if no argument is provided
}
