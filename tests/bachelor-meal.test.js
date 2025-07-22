import { execSync } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";

// Replicating __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Correct path to `bachelor-meal.js`
const CLI_PATH = path.resolve(__dirname, "../bachelor-meal.js");

// Helper function to simulate running the CLI command
function runCLI(command = "") {
  try {
    return execSync(`node ${CLI_PATH} ${command}`, { encoding: "utf-8" }); // Capture and return the output
  } catch (error) {
    return error.stdout || error.message; // In case of error, return the error message
  }
}

describe("CLI Command Tests", () => {
  it("should open rice cooking manual PDF", () => {
    const output = runCLI("rice");
    const relativeFilePath = path.join("recipes", "rice-cooking-manual.pdf");
    // Use regular expression to match the relative part of the path in the output,
    // and ignore the platform-specific base path (like D:\Projects)
    expect(output).toMatch(
      new RegExp(
        `Looking for the recipe file: .+${relativeFilePath.replace(
          /\\/g,
          "\\\\"
        )}`
      )
    );
    expect(output).toContain(
      "✓ Successfully opened the rice-cooking-manual.pdf PDF!"
    );
  });

  it("should open egg frying manual PDF", () => {
    const output = runCLI("egg");
    const relativeFilePath = path.join("recipes", "egg-frying-manual.pdf");
    // Use regular expression to match the relative part of the path in the output
    expect(output).toMatch(
      new RegExp(
        `Looking for the recipe file: .+${relativeFilePath.replace(
          /\\/g,
          "\\\\"
        )}`
      )
    );
    expect(output).toContain(
      "✓ Successfully opened the egg-frying-manual.pdf PDF!"
    );
  });

  it("should open one-person single-day lentil cooking recipe PDF", () => {
    const output = runCLI("lentil");
    const relativeFilePath = path.join(
      "recipes",
      "one-person-single-day-lentil-cooking-recipe.pdf"
    );
    // Use regular expression to match the relative part of the path in the output
    expect(output).toMatch(
      new RegExp(
        `Looking for the recipe file: .+${relativeFilePath.replace(
          /\\/g,
          "\\\\"
        )}`
      )
    );
    expect(output).toContain(
      "✓ Successfully opened the one-person-single-day-lentil-cooking-recipe.pdf PDF!"
    );
  });

  it("should show error for missing PDF", () => {
    const output = runCLI("missing");
    expect(output).toContain("unknown command 'missing'");
  });
});
