const fs = require("fs"); // Importing fs to allow us to use it.
const readline = require("readline-sync"); // Import readline-sync for synchronous input

const outputFile = "./checking_password_log.txt";

// Call a function to read in the data from a file. (Comment line in below)
//const poorPasswords = readInFile(somethingGoesHere);

// Start of helper functions

function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const year = String(currentDate.getFullYear());
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function readInFile(filename) {
  return "nothing at the moment, change this line";
}

// End of helper functions

const passwordCriteria = {
  length: /.{8,}/, // Minimum 8 characters
  uppercase: /[A-Z]/, // Must have uppercase letters
  lowercase: /[a-z]/, // Must have lowercase letters
  digit: /[0-9]/, // Must have digits
  specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\|=]/, // Must have special characters
};

function getPasswordStrength(password) {
  const conditionsPassed = [
    passwordCriteria.length.test(password),
    passwordCriteria.uppercase.test(password),
    passwordCriteria.lowercase.test(password),
    passwordCriteria.digit.test(password),
    passwordCriteria.specialChar.test(password),
  ].filter((x) => x === true).length;

  if (conditionsPassed === 5) {
    return "Strong";
  } else if (conditionsPassed >= 3) {
    return "Medium";
  } else {
    return "Weak";
  }
}

function getPasswordFromUser() {
  const password = readline.question("Please enter your password: ");
  const currentDateTime = getCurrentDateTimeFormatted();
  fs.appendFileSync(outputFile, `${currentDateTime}\n`, "utf-8");

  const strength = getPasswordStrength(password);
  console.log(`Password strength: ${strength}`);

  if (strength === "Strong") {
    console.log("Your password is strong.");
  } else {
    console.log(
      "Password does not meet the criteria. Please enter a different password."
    );
    getPasswordFromUser();
  }
}

// End of functions

// Enter code to read in the 25 most common passwords from the text file here.
getPasswordFromUser();
