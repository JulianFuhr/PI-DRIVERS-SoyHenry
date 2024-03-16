import { searchDriverByName } from "../../redux/actions/actionCreators";

const validateEmptyFields = (
  forename,
  surname,
  nationality,
  image,
  dob,
  description,
  teams
) => {
  return (
    !forename ||
    !surname ||
    !nationality ||
    !image ||
    !dob ||
    !description ||
    !teams
  );
};

const validateDateFormat = (dob) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(dob)) {
    return false;
  }

  const [day, month, year] = dob.split("/").map(Number);
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1 ||
    year > 2024
  ) {
    return false;
  }

  return true;
};

const validateNameFormat = (forename, surname) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(forename) && nameRegex.test(surname);
};

const validateImageFormat = (image) => {
  const imageExtension = image.split(".").pop().toLowerCase();
  return imageExtension === "jpg" || imageExtension === "jpeg";
};

const validateTeams = (teams, allTeams) => {
  if (!teams) {
    return false;
  }
  if (!allTeams || allTeams.length === 0) {
    return true;
  }
  const teamsArray = teams.split(",").map((team) => team.trim().toLowerCase());

  const lowerCaseAllTeams = allTeams.map((team) => team.toLowerCase());

  return teamsArray.every((team) => lowerCaseAllTeams.includes(team));
};

const isDriverExists = async (forename, surname) => {
  try {
    const driverDataExists = await searchDriverByName(
      `${forename} ${surname}`
    )();

    return !!driverDataExists;
  } catch (error) {
    return false;
  }
};

const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const capitalizeFirstWord = (str) => {
  const words = str.split(" ");

  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }

  return words.join(" ");
};

const formatDOB = (input) => {
  const cleanedInput = input.replace(/[^\d]/g, "");

  const truncatedInput = cleanedInput.substring(0, 8);

  const formattedInput = truncatedInput
    .split("")
    .map((char, index) => {
      if (index === 2 || index === 4) return "/" + char;
      return char;
    })
    .join("");

  return formattedInput;
};

export {
  validateEmptyFields,
  validateDateFormat,
  validateNameFormat,
  validateImageFormat,
  validateTeams,
  isDriverExists,
  capitalizeFirstLetter,
  formatDOB,
  capitalizeFirstWord,
};